'use client';

import { useState } from 'react';
import { z } from 'zod';
import { contactSchema } from '@/src/lib/contact-schema';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

type FormState = typeof initialState;

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<string>('');

  const setField = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0]
      });
      return;
    }

    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });

      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setStatus(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('Thanks! Your request has been received.');
      setValues(initialState);
    } catch {
      setStatus('Unable to submit right now. Please email thejazzcoasters@gmail.com.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gold-400/30 bg-black/30 p-5">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gold-200">Name *</label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={(event) => setField('name', event.target.value)}
          className="w-full rounded border border-stone-600 bg-black px-3 py-2"
        />
        {errors.name ? <p className="mt-1 text-sm text-red-400">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gold-200">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => setField('email', event.target.value)}
          className="w-full rounded border border-stone-600 bg-black px-3 py-2"
        />
        {errors.email ? <p className="mt-1 text-sm text-red-400">{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gold-200">Phone</label>
        <input
          id="phone"
          name="phone"
          value={values.phone}
          onChange={(event) => setField('phone', event.target.value)}
          className="w-full rounded border border-stone-600 bg-black px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gold-200">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => setField('message', event.target.value)}
          className="w-full rounded border border-stone-600 bg-black px-3 py-2"
        />
      </div>
      <button type="submit" className="rounded bg-gold-300 px-5 py-2 font-semibold text-black hover:bg-gold-200">
        Submit
      </button>
      {status ? <p className="text-sm text-stone-200">{status}</p> : null}
    </form>
  );
}
