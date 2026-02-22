import { NextResponse } from 'next/server';
import { contactSchema } from '@/src/lib/contact-schema';
import { SITE_URL } from '@/src/lib/constants';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const MIN_FORM_FILL_MS = 3000;
const EMAIL_COOLDOWN_MS = 30 * 1000;
const MAX_URLS_IN_MESSAGE = 4;
const CANONICAL_HOST = new URL(SITE_URL).host;

const submissionsByIp = new Map<string, number[]>();
const lastSubmissionByEmail = new Map<string, number>();

function createRequestId(): string {
  return crypto.randomUUID();
}

function maskEmail(value: string): string {
  const [local = '', domain = ''] = value.split('@');
  if (!domain) {
    return 'invalid';
  }
  const localHead = local.slice(0, 2);
  return `${localHead}***@${domain}`;
}

function truncate(value: string, max = 200): string {
  if (value.length <= max) {
    return value;
  }
  return `${value.slice(0, max)}...`;
}

function sanitizePayloadForLog(body: Record<string, unknown>): Record<string, unknown> {
  const asString = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

  const email = asString(body.email);
  const phone = asString(body.phone);
  const message = asString(body.message);

  return {
    firstName: truncate(asString(body.firstName), 80),
    lastName: truncate(asString(body.lastName), 80),
    email: email ? maskEmail(email) : '',
    phone: phone ? truncate(phone, 20) : '',
    eventDate: asString(body.eventDate),
    venueName: truncate(asString(body.venueName), 120),
    city: truncate(asString(body.city), 80),
    state: asString(body.state),
    eventType: truncate(asString(body.eventType), 60),
    guestCount: truncate(asString(body.guestCount), 40),
    messagePreview: truncate(message, 280),
    messageLength: message.length
  };
}

function logContactEvent(event: string, details: Record<string, unknown> = {}): void {
  console.info(
    JSON.stringify({
      scope: 'contact_form',
      event,
      ...details
    })
  );
}

function makeErrorResponse(
  requestId: string,
  status: number,
  error: string
): NextResponse<{ ok: false; error: string; requestId: string }> {
  return NextResponse.json({ ok: false, error, requestId }, { status });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function withDisplayName(from: string): string {
  if (from.includes('<') && from.includes('>')) {
    return from;
  }
  return `The Jazz Coasters <${from}>`;
}

async function sendResendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string;
    reply_to?: string;
    subject: string;
    text: string;
    html: string;
  }
): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return response.ok;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  return realIp?.trim() || 'unknown';
}

function isRateLimited(ip: string, now: number): boolean {
  const recent = submissionsByIp.get(ip)?.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS) ?? [];
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    submissionsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  submissionsByIp.set(ip, recent);
  return false;
}

function getRequestHost(request: Request): string | null {
  const forwardedHost = request.headers.get('x-forwarded-host')?.trim();
  if (forwardedHost) {
    return forwardedHost.split(',')[0]?.trim() ?? null;
  }

  return request.headers.get('host')?.trim() ?? null;
}

function hasTrustedSource(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const sources = [origin, referer].filter(Boolean) as string[];
  const requestHost = getRequestHost(request);

  const trustedHosts = new Set<string>([CANONICAL_HOST]);
  if (requestHost) {
    trustedHosts.add(requestHost);
  }

  if (process.env.NODE_ENV !== 'production') {
    trustedHosts.add('localhost:3000');
    trustedHosts.add('127.0.0.1:3000');
  }

  if (!sources.length) {
    return true;
  }

  return sources.some((value) => {
    try {
      return trustedHosts.has(new URL(value).host);
    } catch {
      return false;
    }
  });
}

function countUrls(text: string): number {
  const matches = text.match(/https?:\/\/\S+/gi);
  return matches?.length ?? 0;
}

export async function POST(request: Request) {
  const requestId = createRequestId();
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') {
    logContactEvent('invalid_body', { requestId });
    return makeErrorResponse(requestId, 400, 'Invalid request body');
  }
  const payloadForLog = sanitizePayloadForLog(body);

  if (!hasTrustedSource(request)) {
    logContactEvent('invalid_source', {
      requestId,
      host: getRequestHost(request) ?? 'unknown',
      payload: payloadForLog,
      fullPayload: body
    });
    return makeErrorResponse(requestId, 403, 'Invalid request source.');
  }

  const honeypotA = typeof body.hpFieldA === 'string' ? body.hpFieldA.trim() : '';
  const honeypotB = typeof body.hpFieldB === 'string' ? body.hpFieldB.trim() : '';
  const honeypotTripped = Boolean(honeypotA || honeypotB);

  const now = Date.now();
  const formStartedAt =
    typeof body.formStartedAt === 'number'
      ? body.formStartedAt
      : Number.isFinite(Number(body.formStartedAt))
        ? Number(body.formStartedAt)
        : 0;
  const submittedTooFast = !formStartedAt || now - formStartedAt < MIN_FORM_FILL_MS;

  if (honeypotTripped && submittedTooFast) {
    // Silently accept obvious bot submissions to reduce retry spam.
    logContactEvent('spam_honeypot_and_fast_submit', {
      requestId,
      host: getRequestHost(request) ?? 'unknown',
      payload: payloadForLog,
      fullPayload: body
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (submittedTooFast) {
    logContactEvent('blocked_too_fast_submit', {
      requestId,
      host: getRequestHost(request) ?? 'unknown',
      payload: payloadForLog,
      fullPayload: body
    });
    return makeErrorResponse(requestId, 400, 'Please take a little more time to complete the form.');
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip, now)) {
    logContactEvent('blocked_rate_limited_ip', {
      requestId,
      ip,
      payload: payloadForLog
    });
    return makeErrorResponse(requestId, 429, 'Too many requests. Please try again in a few minutes.');
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    logContactEvent('invalid_schema', {
      requestId,
      issue: issue?.message,
      payload: payloadForLog,
      fullPayload: body
    });
    return makeErrorResponse(requestId, 400, issue?.message ?? 'Invalid request body');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const fromRaw = process.env.CONTACT_FROM_EMAIL;
  const supportEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to || !fromRaw) {
    logContactEvent('email_not_configured', { requestId });
    return makeErrorResponse(requestId, 500, 'Email delivery is not configured yet.');
  }
  const from = withDisplayName(fromRaw);

  const {
    firstName,
    lastName,
    email,
    phone,
    eventDate,
    venueName,
    city,
    state,
    eventType,
    guestCount,
    message
  } = parsed.data;

  const messageUrlCount = countUrls(message ?? '');
  if (messageUrlCount > MAX_URLS_IN_MESSAGE) {
    logContactEvent('blocked_too_many_links', {
      requestId,
      linkCount: messageUrlCount,
      email: maskEmail(email),
      payload: payloadForLog,
      fullPayload: body
    });
    return makeErrorResponse(requestId, 400, 'Please remove extra links from your message and try again.');
  }

  const normalizedEmail = email.toLowerCase();
  const previousSubmission = lastSubmissionByEmail.get(normalizedEmail);
  if (previousSubmission && now - previousSubmission < EMAIL_COOLDOWN_MS) {
    logContactEvent('blocked_rate_limited_email', {
      requestId,
      email: maskEmail(normalizedEmail),
      payload: payloadForLog
    });
    return makeErrorResponse(requestId, 429, 'Please wait a minute before sending another request.');
  }
  lastSubmissionByEmail.set(normalizedEmail, now);

  const subject = `New Quote Request: ${firstName} ${lastName}`;
  const messageHtml = escapeHtml(message || '-').replace(/\n/g, '<br/>');
  const text = [
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    `Event Date: ${eventDate}`,
    `Event Type: ${eventType}`,
    `Venue Name: ${venueName || '-'}`,
    `City: ${city || '-'}`,
    `State: ${state || '-'}`,
    `Estimated Guests: ${guestCount || '-'}`,
    '',
    'Event Details:',
    message || '-'
  ].join('\n');

  const html = `
    <h2>New Quote Request</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || '-'}</p>
    <p><strong>Event Date:</strong> ${eventDate}</p>
    <p><strong>Event Type:</strong> ${eventType}</p>
    <p><strong>Venue Name:</strong> ${venueName || '-'}</p>
    <p><strong>City:</strong> ${city || '-'}</p>
    <p><strong>State:</strong> ${state || '-'}</p>
    <p><strong>Estimated Guests:</strong> ${guestCount || '-'}</p>
    <p><strong>Event Details:</strong><br/>${messageHtml}</p>
  `;

  const customerSubject = `Your Booking Inquiry - The Jazz Coasters`;
  const logoUrl = `${SITE_URL}/images/the-jazz-coasters-logo-gold-straight.jpg`;
  const customerText = [
    `Hi ${firstName},`,
    '',
    'Thanks for reaching out to The Jazz Coasters. We received your request and will follow up soon with availability and next steps.',
    '',
    'Here is a copy of your submission:',
    `Name: ${firstName} ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || '-'}`,
    `Event Date: ${eventDate}`,
    `Event Type: ${eventType}`,
    `Venue Name: ${venueName || '-'}`,
    `City: ${city || '-'}`,
    `State: ${state || '-'}`,
    `Estimated Guests: ${guestCount || '-'}`,
    '',
    'Event Details:',
    message || '-',
    '',
    `If you need to add anything, email us at ${supportEmail || 'thejazzcoasters@gmail.com'}.`,
    `Logo: ${logoUrl}`,
    '',
    '--',
    'Erin Fitzpatric',
    'Band Leader | Trumpet',
    'The Jazz Coasters Swing Band',
    SITE_URL
  ].join('\n');

  const customerHtml = `
    <div style="margin:0;padding:24px;background:#f6f3ea;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#111111;border:1px solid #8f6a1c;border-radius:10px;overflow:hidden;">
        <tr>
          <td style="padding:22px 24px 14px;font-family:Georgia,'Times New Roman',serif;">
            <h2 style="margin:0 0 10px;color:#f2d27a;font-size:28px;line-height:1.2;">Thanks for reaching out</h2>
            <p style="margin:0 0 10px;color:#f4efe3;font-size:16px;line-height:1.6;">Hi ${escapeHtml(firstName)},</p>
            <p style="margin:0 0 12px;color:#f4efe3;font-size:16px;line-height:1.6;">
              We received your booking inquiry and will follow up soon with availability, pricing, and next steps.
            </p>
            <p style="margin:0;color:#d9c8a1;font-size:14px;line-height:1.5;">
              Need to add anything? Email
              <a href="mailto:${escapeHtml(supportEmail || 'thejazzcoasters@gmail.com')}" style="color:#f2d27a;">${escapeHtml(supportEmail || 'thejazzcoasters@gmail.com')}</a>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 8px;background:#16120e;border-top:1px solid #3b2c12;font-family:Arial,sans-serif;">
            <p style="margin:0 0 10px;color:#f2d27a;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Copy of your submission</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Phone:</strong> ${escapeHtml(phone || '-')}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Event Date:</strong> ${escapeHtml(eventDate)}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Event Type:</strong> ${escapeHtml(eventType)}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Venue Name:</strong> ${escapeHtml(venueName || '-')}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>City:</strong> ${escapeHtml(city || '-')}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>State:</strong> ${escapeHtml(state || '-')}</p>
            <p style="margin:0 0 6px;color:#efe7d5;font-size:14px;"><strong>Estimated Guests:</strong> ${escapeHtml(guestCount || '-')}</p>
            <p style="margin:0 0 12px;color:#efe7d5;font-size:14px;"><strong>Event Details:</strong><br/>${messageHtml}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 24px 22px;background:#111111;border-top:1px solid #3b2c12;font-family:Georgia,'Times New Roman',serif;">
            <p style="margin:0 0 12px;">
              <img
                src="${logoUrl}"
                alt="The Jazz Coasters logo"
                width="220"
                style="display:block; width:220px; max-width:100%; height:auto; border:0;"
              />
            </p>
            <p style="margin:0;color:#f4efe3;font-size:16px;line-height:1.5;">Erin Fitzpatric</p>
            <p style="margin:0;color:#d9c8a1;font-size:15px;line-height:1.5;">Band Leader | Trumpet</p>
            <p style="margin:0;color:#d9c8a1;font-size:15px;line-height:1.5;">The Jazz Coasters Swing Band</p>
            <p style="margin:2px 0 0;font-size:15px;line-height:1.5;">
              <a href="${SITE_URL}" style="color:#f2d27a;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  `;

  const [internalOk, customerOk] = await Promise.all([
    sendResendEmail(apiKey, {
      from,
      to,
      reply_to: email,
      subject,
      text,
      html
    }),
    sendResendEmail(apiKey, {
      from,
      to: email,
      reply_to: supportEmail || 'thejazzcoasters@gmail.com',
      subject: customerSubject,
      text: customerText,
      html: customerHtml
    })
  ]);

  if (!internalOk || !customerOk) {
    logContactEvent('email_send_failed', {
      requestId,
      internalOk,
      customerOk,
      email: maskEmail(normalizedEmail)
    });
    return makeErrorResponse(requestId, 502, 'Unable to send request right now. Please try again.');
  }

  logContactEvent('submission_success', { requestId, email: maskEmail(normalizedEmail) });

  return NextResponse.json(
    { ok: true, message: 'Request sent. A confirmation copy has been emailed to you.' },
    { status: 200 }
  );
}
