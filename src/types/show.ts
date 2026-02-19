export type ShowEvent = {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  location?: string;
  notes?: string;
  link?: string;
  mapsLink?: string;
  addToCalendarLink?: string;
  sortMs: number;
};
