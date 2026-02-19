import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().optional(),
  eventDate: z.string().trim().min(1, 'Event date is required'),
  venueName: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  eventType: z.string().trim().min(1, 'Event type is required'),
  guestCount: z.string().trim().optional(),
  message: z.string().trim().optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
