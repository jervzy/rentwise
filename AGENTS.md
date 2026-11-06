# Rent Wise project rules

## Next.js source of truth

This project uses Next.js 16.2 with App Router. APIs, conventions, and file structure may differ from older Next.js versions. Read the relevant guide in `node_modules/next/dist/docs/` before implementing unfamiliar framework behavior, and follow deprecation notices.

## Brand and claims

- Always use `Rent Wise` as the main visible customer-facing brand.
- Use `Rent Wise Lettings & Management` in legal, metadata, footer, and other formal contexts.
- Position the service for landlords in Reading and Berkshire.
- Never invent reviews, awards, years of experience, portfolio size, customer results, memberships, accreditations, or statistics.
- Do not add regulatory, trade-body, client, partner, or award logos until each is verified.
- Do not claim that all repairs are covered unless the signed agreement confirms it.
- Do not describe rent as unconditional. Use accurate qualification wording such as `subject to agreed terms and property suitability` where required.
- Do not imply that every property or landlord will qualify.
- Keep legal and compliance content as clearly labelled placeholders until supplied or verified.

## Design workflow

- Read and apply `.agents/skills/design-taste-frontend/SKILL.md` before major frontend design work.
- Consult `.agents/skills/high-end-visual-design/SKILL.md` only where it supports this brief. The Rent Wise brief overrides its decorative, high-motion, gradient, pill, and glass treatments.
- Read `docs/design-direction.md` before creating or changing homepage sections.
- Use 21st components selectively. Research multiple options first, select no more than three for the homepage, and never commit a 21st API key.
- Restyle selected components into the Rent Wise design system. Do not ship their default copy, colors, icons, motion, spacing, radii, or generic SaaS composition.
- Avoid generic AI-generated patterns, including centered gradient heroes, equal three-card rows, excessive pills, glassmorphism, fake dashboards, fake data, stock social proof, and decorative animation.
- Keep components reusable, focused, understandable, and easy to remove or replace.

## Visual system

- Use Manrope for headings, buttons, the wordmark, and prominent labels.
- Use Inter for body copy, forms, and supporting interface text. It is an explicit brand requirement.
- Use the semantic color variables in `src/app/globals.css`. Do not introduce blue-heavy estate-agent styling or unrelated accent colors.
- Use a disciplined 12-column desktop grid, generous section spacing, strong alignment, thin borders, restrained shadows, and a consistent 12px to 16px radius system.
- Use cards only when containment communicates a real relationship. Prefer whitespace, alignment, and sparse dividers.
- Do not use gradients, glowing blobs, glassmorphism, loud parallax, scroll hijacking, marquees, or decorative background motion.
- Do not add photography during the foundation phase.

## Accessibility and interaction

- Use semantic HTML and preserve a logical heading hierarchy.
- Maintain WCAG AA color contrast. The muted `#74807B` token is not suitable for normal-size essential text on the page background.
- Preserve keyboard access, visible focus states, and a minimum 44px interactive target size.
- Use labels above form fields. Never use placeholders as labels.
- Provide clear helper, error, pending, and success states for forms.
- Respect `prefers-reduced-motion`. Motion must communicate feedback, hierarchy, or state and should otherwise be omitted.
- Keep desktop navigation on one line and provide an explicit mobile navigation behavior.
- Use `min-h-dvh` or `min-h-[100dvh]`, never `h-screen`, for viewport-height layouts.

## Engineering

- Prefer React Server Components. Add `use client` only to the smallest interactive leaf component.
- Check `package.json` before importing a package. Do not assume a dependency is installed.
- Keep Tailwind CSS v4 configuration CSS-first through `src/app/globals.css` and `@tailwindcss/postcss`.
- Use the `@/*` import alias for source files.
- Run `npm run check` and `npm run build` before handing off frontend changes.
- Do not change routes, form field names, legal copy, or analytics identifiers silently once they exist.
- Do not commit secrets, `.env` files, MCP credentials, or API keys.
