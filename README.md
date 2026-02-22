# The Jazz Coasters Website

Production Next.js website for a Cincinnati swing/jazz band, built as a custom replacement for Wix.

Live site: `https://www.thejazzcoasters.com`

## Project Goals

- Replace Wix with a custom, maintainable Next.js codebase.
- Support marketing content (bio, videos, shows, gallery, booking form).
- Improve maintainability and deployment velocity with a modern React stack.

## Tech Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS + custom global CSS
- **Validation:** Zod
- **Email Delivery:** Resend API
- **Runtime Hosting:** Vercel
- **Package Manager:** pnpm

## Architecture Overview

### App Routes

- `/` Home
- `/bio`
- `/music`
- `/shows`
- `/gallery`
- `/contact`
- `/privacy`
- `/robots.txt` (generated from `app/robots.ts`)
- `/sitemap.xml` (generated from `app/sitemap.ts`)

### API Routes

- `POST /api/contact`
  - Validates payload with Zod
  - Applies anti-spam guards (honeypot, timing gate, host checks, rate limits)
  - Sends internal notification + customer confirmation via Resend
  - Emits structured server logs with request IDs
- `GET /api/instagram`
  - Fetches Instagram media via Graph API
  - Handles token refresh and fallback behavior

## Features

- Dynamic shows ingestion from Google Calendar (ICS)
- Instagram gallery feed integration with fallback data
- Contact inquiry flow with confirmation emails via Resend
- Secure form intake with validation, abuse protection, and server-side logging
- SEO-ready metadata, sitemap, robots rules, and social share cards

## Environment Variables

Create `.env.local` for local development:

```bash
RESEND_API_KEY=...
CONTACT_TO_EMAIL=...
CONTACT_FROM_EMAIL=...
INSTAGRAM_ACCESS_TOKEN=...
```

## Local Development

```bash
pnpm install
pnpm dev
```

## Lint and Build

```bash
pnpm lint
pnpm build
pnpm start
```

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) runs:

1. `pnpm install`
2. `pnpm lint`
3. `pnpm build`

## Portfolio Notes

This project demonstrates:

- Production API design with typed validation and external service integrations
- Performance-minded frontend architecture in Next.js App Router
- Practical deployment and CI workflows for a real client-style website
- End-to-end ownership across frontend UX, backend routes, deployment, and observability
