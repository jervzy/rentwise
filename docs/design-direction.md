# Rent Wise design direction

Status: approved foundation for homepage implementation planning. This document does not approve unsupported business claims or final legal wording.

## 1. Brand positioning

Rent Wise is a calm, operationally competent property-management partner for landlords in Reading and Berkshire. The primary proposition is guaranteed rent and day-to-day management under an agreed arrangement, subject to the agreement terms and property suitability.

The customer-facing brand is `Rent Wise`. Use `Rent Wise Lettings & Management` in formal contexts, including metadata, legal information, compliance content, and the footer.

Positioning line:

> Guaranteed rent and professional property management for Reading landlords.

The interface should resemble a modern asset-management service more than a high-street estate agent. Trust must come from clarity, process, sensible qualification, and local knowledge. It must not come from invented longevity, volume, or social proof.

## 2. Target landlord profile

The primary visitor owns a suitable residential property in or around Reading and wants predictable income, less operational work, and a clear account of responsibility.

Likely concerns:

- Whether the monthly payment is fixed and what conditions apply.
- Who manages occupants, routine communication, inspections, and maintenance coordination.
- Which properties are suitable.
- What remains the landlord's responsibility.
- How the agreement starts, runs, and ends.
- Whether the company understands Reading and Berkshire rental conditions.
- Whether the proposal form is a commitment or an initial assessment.

The user may be experienced, cautious, time-poor, and comparing Rent Wise with traditional letting or self-management. The page must reward scanning while making qualifications easy to find.

## 3. Brand personality

- Dependable, not loud.
- Calm, not passive.
- Modern, not trendy.
- Secure, not defensive.
- Transparent, not over-explanatory.
- Operationally competent, not bureaucratic.
- Locally knowledgeable, not parochial.
- Professional, not corporate.
- Confident, not exaggerated.

Design dials from the Taste Skill:

- `DESIGN_VARIANCE: 4` for structured asymmetry without visual risk.
- `MOTION_INTENSITY: 2` for static content plus essential hover, focus, disclosure, and form feedback.
- `VISUAL_DENSITY: 4` for scan-friendly landlord information without dashboard density.

## 4. Colour tokens

| Token | Value | Use |
| --- | --- | --- |
| Page background | `#F3F4F1` | Global canvas |
| Main surface | `#FCFCFA` | Forms and contained surfaces |
| Primary text | `#151918` | Headings and essential body copy |
| Secondary text | `#56605C` | Supporting body copy |
| Muted text | `#74807B` | Large or nonessential text only |
| Border | `#D8DDDA` | Hairlines and input boundaries |
| Primary green | `#28483B` | Primary actions and brand emphasis |
| Primary green hover | `#1F392F` | Primary hover and active state |
| Muted green | `#748A7C` | Supporting decoration, not small text |
| Pale green surface | `#E6ECE8` | Selected and explanatory surfaces |
| Dark surface | `#18211D` | Footer or one contained high-emphasis surface |
| White text | `#F8FAF8` | Text on dark green or dark surface |
| Error | `#A33A32` | Errors with icon or text, never colour alone |
| Success | `#376C50` | Confirmed states with text, never colour alone |

Measured contrast checks:

- Primary text on page background: `16.06:1`.
- Secondary text on page background: `5.90:1`.
- White text on primary green: `9.62:1`.
- Error on main surface: `6.37:1`.
- Success on main surface: `5.97:1`.
- Muted text on page background: `3.72:1`, so it must not carry normal-size essential information.

The page uses one forest-green accent family. Do not introduce blue, gold, purple, or unrelated status colours.

## 5. Typography system

Both fonts load through `next/font` with `display: swap`.

- Manrope: headings, buttons, navigation labels, prominent numbers, and the temporary text wordmark.
- Inter: body copy, labels, helper text, form values, legal copy, and supporting interface text.

Recommended scale:

| Role | Mobile | Desktop | Guidance |
| --- | --- | --- | --- |
| Display | 44px / 1.04 | 64px / 1.02 | Maximum two lines in the hero |
| H2 | 34px / 1.1 | 48px / 1.08 | Short, direct section statements |
| H3 | 22px / 1.25 | 26px / 1.2 | Process and feature titles |
| Lead | 18px / 1.55 | 20px / 1.55 | Maximum 58 characters per line |
| Body | 16px / 1.65 | 17px / 1.65 | Maximum 65 characters per line |
| Supporting | 14px / 1.55 | 14px / 1.55 | Never conceal qualifications |

Use negative tracking only for large Manrope headings. Avoid excessive uppercase. Eyebrows are optional and limited to no more than one per three homepage sections.

## 6. Spacing system

Use a 4px base unit with a practical scale of `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 144`.

- Desktop section spacing: 112px to 144px.
- Tablet section spacing: 80px to 112px.
- Mobile section spacing: 64px to 80px.
- Content gaps: 16px to 32px.
- Form field groups: 20px to 24px.
- Card padding: 24px mobile, 32px to 40px desktop.

Open space should clarify priority. It should not push the hero CTA below the first viewport.

## 7. Grid system

- Desktop: disciplined 12-column CSS Grid.
- Maximum content width: 1280px, with an optional 1400px outer composition boundary.
- Desktop gutters: 24px to 32px.
- Tablet: 8 columns with 24px gutters.
- Mobile: 4 columns with 16px to 20px page padding.
- Long copy remains between 52ch and 65ch.
- Multi-column sections must define a specific single-column mobile order.

Use CSS Grid for section composition. Avoid percentage width calculations in flex layouts.

## 8. Border and radius rules

- Standard border: 1px solid `#D8DDDA`.
- Strong border: 1px solid `#748A7C`, reserved for selected or focus-adjacent states.
- Controls: 12px radius.
- Surfaces and cards: 14px radius.
- Large feature surface: maximum 16px radius.
- Pills are reserved for true status or compact filter semantics, not general decoration.
- Shadows are optional and highly restrained. Prefer border, contrast, and spacing.

## 9. Button styles

Primary button:

- Primary green background and white text.
- Primary green hover background.
- Manrope, 15px to 16px, weight 650 to 700.
- Minimum 44px height and one-line label.
- 12px radius, not a full pill.
- Visible focus outline outside the button edge.

Secondary button:

- Transparent or main-surface background.
- Primary text with a border.
- Border strengthens on hover without changing layout.

Text action:

- Used for low-priority navigation only.
- Underline appears on hover and focus.
- Never rely on colour alone to imply interactivity.

Use one stable label per intent. The proposal action should use `Request a rent proposal` consistently in navigation, hero, and conversion areas.

## 10. Form styles

- Visible label above every input.
- Optional helper text between label and field or directly below the field.
- Error text below the field and associated with `aria-describedby`.
- 48px minimum input height.
- Main-surface field background, primary text, and a visible border.
- Placeholder text is an example only, never the label.
- Focus uses the primary green outline and does not rely on a faint shadow.
- Required fields are indicated in text.
- Pending, error, and success states are announced through an appropriate live region.
- The rent proposal form must explain that submission starts an assessment and is not an offer or agreement.

## 11. Visual hierarchy

The page should move from proposition, to practical benefit, to comparison, to process, to scope, to local relevance, to agreement clarity, to suitability, to objections, and finally to proposal capture.

Hierarchy rules:

- The hero contains one proposition, one short qualification, and one primary action.
- Important qualifications sit near the relevant claim, never buried in tiny footer text.
- Use large Manrope headings with restrained scale rather than oversized type.
- Use alignment, spacing, and pale-green surfaces before adding cards.
- Use one dominant visual idea per section.
- Avoid repeating the same split layout more than twice in sequence.

## 12. Homepage section order

1. **Navigation**: wordmark, concise anchors, phone or contact path when verified, and `Request a rent proposal`.
2. **Hero**: positioning line, short explanation, qualification, primary CTA, and a non-photographic property-management composition planned in CSS.
3. **Immediate landlord benefits**: asymmetric benefit layout covering predictable payment, day-to-day management, and clear responsibility without fake numbers.
4. **Traditional letting versus Rent Wise**: semantic comparison with careful, non-absolute language.
5. **How the service works**: four-part ordered process based on the selected 21st timeline structure.
6. **What Rent Wise handles**: asymmetric five-cell bento using only confirmed responsibilities.
7. **Reading and Berkshire**: local operating context, service area, and market familiarity without decorative maps or invented local statistics.
8. **Transparent agreement**: responsibilities, payment terms, review points, exclusions, and document availability stated plainly.
9. **Property suitability**: factors considered and a clear statement that not every property will qualify.
10. **FAQ**: accessible single-open accordion based on the selected 21st FAQ structure.
11. **Rent proposal form**: staged but not multi-step unless research proves necessary. Explain what happens after submission.
12. **Footer and compliance placeholders**: formal company name, contact details, privacy, cookies, terms, company information, and regulatory items only when verified.

## 13. Component shortlist

All research used the connected `21st` MCP server. Searches returned metadata for at least three candidates in every required category. Two available daily code-retrieval credits were then used on the strongest process and FAQ candidates.

### Responsive navigation

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| Rich Navigation Menu by shadcnui-blocks | 18191 | Reject. Multi-column dropdowns, icons, and descriptions are excessive for the planned information architecture. |
| Navigation Menu by sshahaider | 7854 | Shortlist as a responsive-behaviour reference only. The mega-menu layer would be removed. |
| Promote Header by ruixen.ui | 5937 | Reject. Announcement, search, theme toggle, and hover panels add unrelated product complexity. |

### Process or timeline

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| How It Works Timeline by 7ovr | 19863 | Selected. Semantic ordered-list foundation, no required motion, and straightforward mobile flow. |
| Process Timeline by youcefbnm | 1943 | Reject. Scroll-triggered state is unnecessary and raises reduced-motion and maintenance costs. |
| How It Works by chamaac | 19861 | Reject. Pinned connected cards are more theatrical than the service requires. |

### Feature bento

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| Bento Grid by kokonutd | 622 | Shortlist for grid proportions only. Remove hover effects and shadows. |
| Bento Grid 01 by avanishverma4 | 9594 | Shortlist for responsive behaviour only. Remove animation. |
| Feature Section with Bento Grid by tommyjepsen | 1327 | Preferred visual reference, but rebuild as project-owned CSS Grid instead of selecting a library block. |
| Cybernetic Bento Grid by dhileepkumargm | 6014 | Reject. Glow and cyber styling directly conflict with the brand. |

### Accessible FAQ accordion

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| FAQ 1 by shadcnblockscom | 681 | Selected with structural fixes. Radix provides the accessible interaction foundation. |
| FAQ Chat Accordion by anshuman008 | 1517 | Reject. Extra icons and Motion add no value to landlord questions. |
| FAQ Accordion by nextjsshop | 6598 | Shortlist. Metadata suggests a clean pattern, but code was not retrieved within the daily quota. |
| Scroll FAQ Accordion by ruixen.ui | 8190 | Reject. Disabled manual clicks and scroll-driven opening are accessibility and usability regressions. |

### Conversion CTA

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| CTA 4 by shadcnblockscom | 2205 | Shortlist for a left-message, right-evidence composition. Rebuild locally beside the proposal form. |
| CTA 13 by shadcnblockscom | 2206 | Reject. Generic heading plus two-button composition adds a competing action. |
| CTA 01 by felipemenezes098 | 18475 | Reject. Centered generic composition weakens the operational tone. |
| CTA Section 2 by shadcnstore | 19354 | Reject. Email capture and avatar social proof do not match the conversion task and would encourage fabricated proof. |

### Mobile navigation

| Candidate | 21st ID | Decision |
| --- | ---: | --- |
| Drawer by coss.com | 11444 | Shortlist as an interaction primitive only. Swipe and snap behaviour are unnecessary. |
| Modern Mobile Menu by easemize | 2580 | Reject. Dock and bottom-navigation language suit an app, not a landlord marketing site. |
| Navbar 5 by shadcnblockscom | 2307 | Shortlist for top-down disclosure behaviour, with dropdowns removed. |
| Curved Menu by ishamsu | 2200 | Reject. Decorative geometry and animation conflict with restraint. |

## 14. Selected 21st components

### How It Works Timeline, ID 19863

Use the ordered-list and connecting-line structure only.

Required adaptations:

- Replace generic SaaS copy with verified Rent Wise process copy.
- Remove the badge and `class-variance-authority` dependency.
- Replace Remix icons with one approved project icon family or use restrained text markers.
- Use actual step titles rather than generic `Step 1` labels.
- Restyle with Rent Wise tokens, 14px surfaces, and no animation.
- Keep the ordered list meaningful without CSS.

### FAQ 1, ID 681

Use the Radix accordion interaction foundation.

Required adaptations:

- Wrap all items in one accordion root rather than creating one root per item.
- Replace Lucide with the chosen project icon family.
- Use `h2`, not `h1`, within the homepage section.
- Use stable content IDs rather than array indexes as keys.
- Keep triggers at least 44px high with visible focus and adequate contrast.
- Disable decorative transition when reduced motion is requested.
- Use qualification-aware answers supplied or approved by the business.

No 21st component code is installed during this phase. Installation and adaptation happen only when the corresponding homepage section is implemented. The current selection count is two, below the maximum of three.

## 15. Motion principles

- Default to static content.
- Use transitions only for hover, focus, accordion state, mobile navigation state, and form feedback.
- Animate only opacity and transform when animation is genuinely needed.
- Use a restrained cubic-bezier curve and short duration, generally 160ms to 240ms.
- Do not use scroll-triggered timelines, pinned sections, parallax, marquees, magnetic buttons, or looping effects.
- Respect `prefers-reduced-motion` globally and inside interactive components.

## 16. Accessibility requirements

- WCAG 2.2 AA is the minimum target.
- Semantic landmarks: header, nav, main, sections with headings, and footer.
- One page `h1`; logical heading order afterward.
- Keyboard-operable navigation, accordion, and forms.
- Visible focus states with at least 3:1 contrast against adjacent colours.
- Minimum 44px interactive targets.
- Text contrast of 4.5:1 for normal text and 3:1 for large text.
- Error, success, and selected states must not rely on colour alone.
- Accordion state exposed through the underlying button and `aria-expanded` behavior.
- Mobile menu must manage focus, expose open state, close with Escape, and restore focus.
- Forms must use labels, descriptions, field-level errors, and an announced submission result.
- Avoid content that appears only on hover.
- Avoid tiny qualification text. Legal precision must remain readable.

## 17. Mobile behaviour

- Use a 4-column grid with 16px to 20px side padding.
- Collapse all asymmetric layouts to one clear source order below 768px.
- Keep the navigation wordmark and menu trigger on one row.
- Open mobile navigation as a simple top sheet or dialog, not a dock or curved overlay.
- Keep proposal CTA labels on one line where possible and full width where helpful.
- Convert comparison content into stacked labelled groups without losing row relationships.
- Keep timeline copy beside or below its marker without narrow text columns.
- Use one accordion column and full-width triggers.
- Use appropriate input modes and autocomplete attributes in the proposal form.
- Avoid fixed viewport heights. Use `min-h-dvh` where viewport height matters.

## 18. Design anti-patterns

- Gradients, glowing blobs, glassmorphism, and neon accents.
- Navy-and-gold estate-agent styling.
- House-roof, key, or generic building logos.
- Stock property photography in the current phase.
- Fake dashboards, maps, statistics, reviews, logos, and status indicators.
- Equal three-card feature rows.
- Every section inside a rounded card.
- Excessive pills and excessive rounded containers.
- Decorative serif typography or futuristic type.
- Oversized centered hero copy.
- Repeated split headers with floating right-side paragraphs.
- Scroll hijacking, parallax, animated marquees, and automatic FAQ progression.
- Tiny text used to hide qualifications.
- Generic copy such as `seamless`, `revolutionise`, `elevate`, or `next-generation`.
- Generic AI icons or mixed icon families.

## 19. Unsupported claims that must never be added

- Years in business, number of properties, occupancy rate, payment rate, or portfolio value unless verified.
- Customer reviews, testimonials, ratings, case studies, or client logos unless supplied and approved.
- Awards, memberships, accreditations, regulatory status, or trade-body logos unless verified.
- `Guaranteed regardless of circumstances`, `rent is always guaranteed`, or any equivalent unconditional promise.
- `All repairs are covered` unless the agreement explicitly confirms the exact scope.
- Claims that every landlord or property qualifies.
- Claims that Rent Wise will always pay more than a traditional letting route.
- Claims that there are no fees, voids, inspections, exclusions, obligations, or risks unless formally verified.
- Legal, tax, mortgage, insurance, licensing, or investment advice.
- Unverified service areas outside Reading and Berkshire.

## 20. Future image direction

No photographic images are used during this phase.

When original or commissioned imagery becomes available, prioritise:

- Calm, naturally lit residential exteriors and interiors from the actual service area.
- Operational details such as inspections, keys being logged, condition reporting, maintenance coordination, and document review.
- Reading context used sparingly and accurately, without generic skyline montages.
- Landlord-facing professionalism rather than staged tenant lifestyle scenes.
- Consistent natural colour, restrained contrast, and no blue estate-agent overlays.

Avoid staged handshakes, smiling call-centre teams, model families, fake documents, generic London skylines, and unrelated luxury-property imagery.

## Proposed file structure

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    privacy/page.tsx
    terms/page.tsx
  components/
    brand/
      wordmark.tsx
    layout/
      site-header.tsx
      mobile-navigation.tsx
      site-footer.tsx
    sections/
      hero.tsx
      landlord-benefits.tsx
      letting-comparison.tsx
      service-process.tsx
      management-scope.tsx
      local-reading.tsx
      transparent-agreement.tsx
      property-suitability.tsx
      faq.tsx
      proposal-cta.tsx
    forms/
      rent-proposal-form.tsx
      proposal-fields.tsx
    ui/
      accordion.tsx
      button.tsx
      field.tsx
      section-shell.tsx
  lib/
    content/
      homepage.ts
      faq.ts
    validation/
      rent-proposal.ts
```

Server Components should own content and layout. Client Components should be limited to the mobile menu, accordion, and form interaction islands.
