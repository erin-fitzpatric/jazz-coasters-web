import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().optional(),
  message: z.string().trim().optional()
});

export type ContactInput = z.infer<typeof contactSchema>;
