'use client';

import { useMemo, useState } from 'react';
import type { ShowEvent } from '@/src/types/show';

type ShowsListProps = {
  events: ShowEvent[];
};

export function ShowsList({ events }: ShowsListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedEvent = useMemo(() => events.find((event) => event.id === selectedId) ?? null, [events, selectedId]);

  return (
    <>
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={event.id} className="gatsby-frame rounded-lg bg-black/70 p-4">
            <p className="font-[var(--font-marcellus)] text-xl text-gold-200">{event.title}</p>
            <p className="mt-1 text-stone-100">
              {event.dateLabel} at {event.timeLabel}
            </p>
            {event.location ? (
              event.mapsLink ? (
                <a
                  href={event.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  {event.location}
                </a>
              ) : (
                <p className="mt-1 text-stone-200">{event.location}</p>
              )
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {event.notes || event.link ? (
                <button
                  type="button"
                  className="rounded border border-gold-300/80 bg-gold-400/10 px-3 py-2 text-sm font-medium uppercase tracking-[0.08em] text-gold-200 hover:bg-gold-300 hover:text-black"
                  onClick={() => setSelectedId(event.id)}
                >
                  View Details
                </button>
              ) : null}
              {event.addToCalendarLink ? (
                <a
                  href={event.addToCalendarLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-gold-300/80 bg-transparent px-3 py-2 text-sm font-medium uppercase tracking-[0.08em] text-gold-200 hover:bg-gold-300 hover:text-black"
                >
                  Add to Calendar
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {selectedEvent ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true">
          <div className="gatsby-panel gatsby-frame w-full max-w-2xl rounded-xl p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl">{selectedEvent.title}</h2>
              <button
                type="button"
                className="rounded border border-gold-300/70 px-2 py-1 text-sm text-gold-200 hover:bg-gold-300 hover:text-black"
                onClick={() => setSelectedId(null)}
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-stone-100">
              {selectedEvent.dateLabel} at {selectedEvent.timeLabel}
            </p>
            {selectedEvent.location ? (
              selectedEvent.mapsLink ? (
                <a
                  href={selectedEvent.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  {selectedEvent.location}
                </a>
              ) : (
                <p className="mt-1 text-stone-200">{selectedEvent.location}</p>
              )
            ) : null}
            {selectedEvent.notes ? <p className="mt-4 whitespace-pre-line text-stone-200">{selectedEvent.notes}</p> : null}
            <div className="mt-4 flex flex-wrap gap-3">
              {selectedEvent.link ? (
                <a
                  href={selectedEvent.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  Open event link
                </a>
              ) : null}
              {selectedEvent.addToCalendarLink ? (
                <a
                  href={selectedEvent.addToCalendarLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-gold-200 underline decoration-gold-400/70 underline-offset-4 hover:text-white"
                >
                  Add to Calendar
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
