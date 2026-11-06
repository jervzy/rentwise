# Rent Wise website

Website project for Rent Wise Lettings & Management, a guaranteed-rent and property-management company serving landlords in Reading and Berkshire.

## Stack

- Next.js 16.2 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint with Next.js Core Web Vitals and TypeScript rules
- npm

## Commands

```bash
npm run dev
npm run format
npm run check
npm run build
```

Read `AGENTS.md` and `docs/design-direction.md` before beginning major frontend work.

## Mapbox setup

The service-area panel uses the Mapbox Static Images API when a public token is available. Copy `.env.example` to `.env.local`, create a public token in Mapbox, and set:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_public_token
```

Restrict the token to the production website URL and the local development URLs that need the map. When the token is absent, the page renders a styled local fallback instead of a broken image.

The default map uses `mapbox/light-v11`. To use a custom Mapbox Studio style later:

1. Create and publish the style in Mapbox Studio.
2. Copy its style URL in the form `mapbox://styles/username/style-id`.
3. Add it to `.env.local` as `NEXT_PUBLIC_MAPBOX_STYLE_URL`.
4. Restart the development server.

Malformed or unavailable custom styles fall back safely: malformed style values use `mapbox/light-v11`, while failed image requests use the local service-area fallback.
