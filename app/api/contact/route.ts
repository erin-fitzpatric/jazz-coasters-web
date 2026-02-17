import { NextResponse } from 'next/server';
import { contactSchema } from '@/src/lib/contact-schema';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ ok: false, error: issue?.message ?? 'Invalid request body' }, { status: 400 });
  }

  // TODO (Phase 2): add Turnstile verification and SendGrid delivery.
  return NextResponse.json({ ok: true }, { status: 200 });
}
