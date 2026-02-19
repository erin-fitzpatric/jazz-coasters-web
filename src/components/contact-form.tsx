'use client';

import { useState } from 'react';
import { contactSchema } from '@/src/lib/contact-schema';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventDate: '',
  venueName: '',
  city: '',
  state: '',
  eventType: '',
  guestCount: '',
  message: '',
  website: ''
};

type FormState = typeof initialState;

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<string>('');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());

  const setField = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setStatus('');
    setSubmittedEmail('');
    setIsSubmitting(false);
    setFormStartedAt(Date.now());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        eventDate: fieldErrors.eventDate?.[0],
        venueName: fieldErrors.venueName?.[0],
        city: fieldErrors.city?.[0],
        state: fieldErrors.state?.[0],
        eventType: fieldErrors.eventType?.[0],
        guestCount: fieldErrors.guestCount?.[0],
        message: fieldErrors.message?.[0]
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          formStartedAt
        })
      });

      const data = (await response.json()) as { ok: boolean; error?: string; message?: string };
      if (!response.ok || !data.ok) {
        setStatus(data.error ?? 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setStatus(data.message ?? 'Thanks! Your request has been received.');
      setSubmittedEmail(parsed.data.email);
      setValues(initialState);
    } catch {
      setStatus('Unable to submit right now. Please email thejazzcoasters@gmail.com.');
      setIsSubmitting(false);
    }
  };

  if (submittedEmail) {
    return (
      <section className="gatsby-panel space-y-4 rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl">Quote Request Sent</h2>
        <p className="text-stone-200">
          Thanks for reaching out. We received your message and emailed a confirmation copy to{' '}
          <span className="font-semibold text-gold-200">{submittedEmail}</span>.
        </p>
        <p className="text-stone-300">
          We&apos;ll follow up soon with availability and next steps.
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="rounded border border-gold-300/90 bg-gold-300 px-5 py-3 font-semibold uppercase tracking-[0.1em] text-black hover:bg-gold-200"
        >
          Send Another Request
        </button>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="gatsby-panel space-y-5 rounded-xl p-6 sm:p-8">
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={values.website}
          onChange={(event) => setField('website', event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gold-200">First name *</label>
            <input
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={(event) => setField('firstName', event.target.value)}
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
              placeholder="First name"
            />
            {errors.firstName ? <p className="mt-1 text-sm text-red-400">{errors.firstName}</p> : null}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gold-200">Last name *</label>
            <input
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={(event) => setField('lastName', event.target.value)}
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
              placeholder="Last name"
            />
            {errors.lastName ? <p className="mt-1 text-sm text-red-400">{errors.lastName}</p> : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gold-200">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(event) => setField('email', event.target.value)}
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
              placeholder="Email"
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
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
              placeholder="Phone"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="eventDate" className="mb-1 block text-sm font-medium text-gold-200">Event date *</label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              value={values.eventDate}
              onChange={(event) => setField('eventDate', event.target.value)}
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
            />
            {errors.eventDate ? <p className="mt-1 text-sm text-red-400">{errors.eventDate}</p> : null}
          </div>
        </div>

        {values.eventDate ? (
          <>
            <div>
              <label htmlFor="venueName" className="mb-1 block text-sm font-medium text-gold-200">Venue name</label>
              <input
                id="venueName"
                name="venueName"
                value={values.venueName}
                onChange={(event) => setField('venueName', event.target.value)}
                className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
                placeholder="Venue name"
              />
              {errors.venueName ? <p className="mt-1 text-sm text-red-400">{errors.venueName}</p> : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-gold-200">City</label>
                <input
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={(event) => setField('city', event.target.value)}
                  className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
                  placeholder="City"
                />
                {errors.city ? <p className="mt-1 text-sm text-red-400">{errors.city}</p> : null}
              </div>
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium text-gold-200">State</label>
                <select
                  id="state"
                  name="state"
                  value={values.state}
                  onChange={(event) => setField('state', event.target.value)}
                  className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
                >
                  <option value="">Select state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                {errors.state ? <p className="mt-1 text-sm text-red-400">{errors.state}</p> : null}
              </div>
            </div>
          </>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="eventType" className="mb-1 block text-sm font-medium text-gold-200">Event type *</label>
            <select
              id="eventType"
              name="eventType"
              value={values.eventType}
              onChange={(event) => setField('eventType', event.target.value)}
              className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Swing Dance">Swing Dance</option>
              <option value="Private Party">Private Party</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Festival">Festival</option>
              <option value="Other">Other</option>
            </select>
            {errors.eventType ? <p className="mt-1 text-sm text-red-400">{errors.eventType}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="guestCount" className="mb-1 block text-sm font-medium text-gold-200">Estimated guests</label>
          <input
            id="guestCount"
            name="guestCount"
            value={values.guestCount}
            onChange={(event) => setField('guestCount', event.target.value)}
            className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
            placeholder="Approximate number of guests"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-gold-200">Event details</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => setField('message', event.target.value)}
            className="w-full rounded border border-gold-400/25 bg-black/70 px-3 py-2"
            placeholder="Tell us about timing, location, music preferences, and anything else we should know."
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded border border-gold-300/90 bg-gold-300 px-5 py-3 font-semibold uppercase tracking-[0.1em] text-black hover:bg-gold-200"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {status ? <p className="text-sm text-red-300">{status}</p> : null}
    </form>
  );
}
