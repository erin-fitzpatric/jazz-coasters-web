import type { Metadata } from 'next';
import { ShowsList } from '@/src/components/shows-list';
import type { ShowEvent } from '@/src/types/show';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'View upcoming Jazz Coasters performances in agenda calendar format.',
  alternates: { canonical: '/shows' }
};

const CALENDAR_ICS_URL =
  'https://calendar.google.com/calendar/ical/thejazzcoasters%40gmail.com/public/basic.ics';
const CALENDAR_WEB_URL =
  'https://calendar.google.com/calendar/embed?ctz=America%2FNew_York&mode=AGENDA&showPrint=0&title=Jazz%20Coasters%20Schedule&src=dGhlamF6emNvYXN0ZXJzQGdtYWlsLmNvbQ';

function decodeIcsText(value: string): string {
  return value
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

function formatTime(hour24: number, minute: number): string {
  const hour = hour24 % 12 || 12;
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour}:${minute.toString().padStart(2, '0')} ${suffix}`;
}

function parseDateParts(dateValue: string): { y: number; m: number; d: number; hh: number; mm: number } {
  const y = Number(dateValue.slice(0, 4));
  const m = Number(dateValue.slice(4, 6));
  const d = Number(dateValue.slice(6, 8));
  const hh = dateValue.length >= 13 ? Number(dateValue.slice(9, 11)) : 0;
  const mm = dateValue.length >= 15 ? Number(dateValue.slice(11, 13)) : 0;
  return { y, m, d, hh, mm };
}

function normalizeStart(startLine: string): { dateLabel: string; timeLabel: string; sortMs: number } {
  const [left, rawValue = ''] = startLine.split(':', 2);
  const value = rawValue.trim();
  const isAllDay = left.includes('VALUE=DATE');
  const isUtc = value.endsWith('Z');

  if (isAllDay) {
    const { y, m, d } = parseDateParts(value);
    const date = new Date(Date.UTC(y, m - 1, d));
    return {
      dateLabel: new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York'
      }).format(date),
      timeLabel: 'All day',
      sortMs: Date.UTC(y, m - 1, d)
    };
  }

  if (isUtc) {
    const clean = value.replace('Z', '');
    const { y, m, d, hh, mm } = parseDateParts(clean);
    const utcDate = new Date(Date.UTC(y, m - 1, d, hh, mm));
    return {
      dateLabel: new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/New_York'
      }).format(utcDate),
      timeLabel: new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'America/New_York'
      }).format(utcDate),
      sortMs: utcDate.getTime()
    };
  }

  const { y, m, d, hh, mm } = parseDateParts(value);
  const sortMs = Date.UTC(y, m - 1, d, hh, mm);
  const date = new Date(Date.UTC(y, m - 1, d));
  return {
    dateLabel: new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'America/New_York'
    }).format(date),
    timeLabel: formatTime(hh, mm),
    sortMs
  };
}

function extractLink(...values: Array<string | undefined>): string | undefined {
  const source = values.filter(Boolean).join(' ');
  const match = source.match(/https?:\/\/[^\s\\]+/i);
  return match?.[0];
}

function padDateTime(value: string): string {
  if (value.length === 8) {
    return `${value}T000000`;
  }
  if (value.length === 13) {
    return `${value}00`;
  }
  return value;
}

function addMinutesToIcsDate(value: string, minutes: number): string {
  const base = padDateTime(value);
  const y = Number(base.slice(0, 4));
  const m = Number(base.slice(4, 6));
  const d = Number(base.slice(6, 8));
  const hh = Number(base.slice(9, 11));
  const mm = Number(base.slice(11, 13));
  const ss = Number(base.slice(13, 15));
  const date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss));
  date.setUTCMinutes(date.getUTCMinutes() + minutes);
  const yy = date.getUTCFullYear().toString().padStart(4, '0');
  const mo = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const da = date.getUTCDate().toString().padStart(2, '0');
  const h = date.getUTCHours().toString().padStart(2, '0');
  const mi = date.getUTCMinutes().toString().padStart(2, '0');
  const s = date.getUTCSeconds().toString().padStart(2, '0');
  return `${yy}${mo}${da}T${h}${mi}${s}`;
}

function buildGoogleCalendarDates(startLine: string, endLine?: string): string | undefined {
  const [startLeft, rawStart = ''] = startLine.split(':', 2);
  const start = rawStart.trim();
  if (!start) {
    return undefined;
  }

  const isAllDay = startLeft.includes('VALUE=DATE');
  const isUtc = start.endsWith('Z');
  const endRaw = endLine?.split(':', 2)?.[1]?.trim();

  if (isAllDay) {
    const endDate = endRaw || addMinutesToIcsDate(start, 24 * 60);
    return `${start}/${endDate}`;
  }

  if (isUtc) {
    const startUtc = padDateTime(start.replace(/Z$/, ''));
    const endUtc = endRaw
      ? padDateTime(endRaw.replace(/Z$/, ''))
      : addMinutesToIcsDate(startUtc, 120);
    return `${startUtc}Z/${endUtc}Z`;
  }

  const startLocal = padDateTime(start);
  const endLocal = endRaw ? padDateTime(endRaw) : addMinutesToIcsDate(startLocal, 120);
  return `${startLocal}/${endLocal}`;
}

function buildGoogleCalendarLink(
  title: string,
  notes: string | undefined,
  location: string | undefined,
  startLine: string,
  endLine?: string
): string | undefined {
  const dates = buildGoogleCalendarDates(startLine, endLine);
  if (!dates) {
    return undefined;
  }

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates
  });

  if (notes) {
    params.set('details', notes);
  }

  if (location) {
    params.set('location', location);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function cleanNotes(value: string, link?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  let notes = value;
  if (link) {
    notes = notes.replace(link, '').trim();
  }

  notes = notes.replace(/\s{2,}/g, ' ').trim();
  return notes || undefined;
}

function parseEvents(ics: string): ShowEvent[] {
  const unfolded = ics.replace(/\r\n[ \t]/g, '');
  const blocks = unfolded.split('BEGIN:VEVENT').slice(1);
  const events: ShowEvent[] = [];

  for (const block of blocks) {
    const lines = block.split(/\r?\n/).map((line) => line.trim());
    const uid = lines.find((line) => line.startsWith('UID:'))?.slice(4) ?? crypto.randomUUID();
    const summary = decodeIcsText(lines.find((line) => line.startsWith('SUMMARY:'))?.slice(8) ?? 'Show');
    const location = decodeIcsText(lines.find((line) => line.startsWith('LOCATION:'))?.slice(9) ?? '');
    const description = decodeIcsText(lines.find((line) => line.startsWith('DESCRIPTION:'))?.slice(12) ?? '');
    const url = decodeIcsText(lines.find((line) => line.startsWith('URL:'))?.slice(4) ?? '');
    const startLine = lines.find((line) => line.startsWith('DTSTART'));
    const endLine = lines.find((line) => line.startsWith('DTEND'));

    if (!startLine) {
      continue;
    }

    const { dateLabel, timeLabel, sortMs } = normalizeStart(startLine);
    const link = extractLink(url, description, location);
    const notes = cleanNotes(description, link);
    events.push({
      id: uid,
      title: summary,
      dateLabel,
      timeLabel,
      location: location || undefined,
      notes,
      link,
      mapsLink: location ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}` : undefined,
      addToCalendarLink: buildGoogleCalendarLink(summary, notes, location || undefined, startLine, endLine),
      sortMs
    });
  }

  return events
    .filter((event) => event.sortMs >= Date.now())
    .sort((a, b) => a.sortMs - b.sortMs)
    .slice(0, 20);
}

async function getUpcomingShows(): Promise<ShowEvent[]> {
  try {
    const response = await fetch(CALENDAR_ICS_URL, { next: { revalidate: 900 } });
    if (!response.ok) {
      return [];
    }

    const ics = await response.text();
    return parseEvents(ics);
  } catch {
    return [];
  }
}

export default async function ShowsPage() {
  const events = await getUpcomingShows();

  return (
    <main className="space-y-6 !max-w-none">
      <div className="mx-auto w-full max-w-[88rem]">
        <section className="gatsby-panel space-y-4 rounded-xl p-4 sm:p-6">
          <h1 className="sr-only">Shows</h1>
          {events.length ? (
            <ShowsList events={events} />
          ) : (
            <p className="text-stone-200">
              Upcoming events are loading from Google Calendar. If you do not see entries, open the full calendar
              below.
            </p>
          )}
          <a
            href={CALENDAR_WEB_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded border border-gold-300/90 bg-gold-300 px-5 py-3 font-semibold uppercase tracking-[0.1em] text-black hover:bg-gold-200"
          >
            Open Full Calendar
          </a>
        </section>
      </div>
    </main>
  );
}

