# The Jazz Coasters Web (Phase 1 MVP)

Production-ready Next.js App Router rebuild for replacing Wix while preserving exact route parity:

- `/`
- `/bio`
- `/music`
- `/shows`
- `/gallery`
- `/contact`

## Highlights

- **SEO-safe route parity** with per-page metadata, canonical URLs, `robots.txt`, and static `sitemap.xml`.
- **Mobile-first responsive design** with shared header/footer, desktop + mobile navigation, and responsive embeds.
- **Black + gold visual theme** with Cinzel + Inter via Google Fonts.
- **Integration stubs** for future APIs without changing frontend contracts.

## Local Development

```bash
pnpm install
pnpm dev
```

`pnpm dev` uses Turbopack (`next dev --turbo`) for fast local iteration.

## Build

```bash
pnpm build
pnpm start
```

Build stays standard (`next build`) for Vercel compatibility.

## Phase 2 Plan

### Instagram / Gallery

- Configure Meta app and Instagram Graph API credentials.
- Implement `/api/instagram` fetch logic and map API response to `InstagramMediaItem`.
- Add optional caching/revalidation to reduce API calls and improve page speed.

### Contact API

- Keep `POST /api/contact` contract stable so frontend stays unchanged.
- Add Cloudflare Turnstile verification.
- Add SendGrid email delivery + optional automation hooks (CRM, Zapier, etc.).
