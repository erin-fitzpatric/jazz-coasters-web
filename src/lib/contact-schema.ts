import { z } from 'zod';

function isFutureDate(value: string): boolean {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parsed.getTime() >= today.getTime();
}

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(80, 'First name is too long'),
  lastName: z.string().trim().min(1, 'Last name is required').max(80, 'Last name is too long'),
  email: z.string().trim().email('Valid email is required').max(254, 'Email is too long'),
  phone: z.string().trim().max(40, 'Phone number is too long').optional(),
  eventDate: z
    .string()
    .trim()
    .min(1, 'Event date is required')
    .refine(isFutureDate, 'Event date must be today or in the future'),
  venueName: z.string().trim().max(200, 'Venue name is too long').optional(),
  city: z.string().trim().max(120, 'City is too long').optional(),
  state: z.string().trim().max(2, 'Use 2-letter state code').optional(),
  eventType: z.string().trim().min(1, 'Event type is required').max(60, 'Event type is too long'),
  guestCount: z.string().trim().optional(),
  message: z.string().trim().max(2000, 'Message is too long').optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
