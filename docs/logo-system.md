# Rent Wise logo system

## Concept

The Structured RW monogram uses a framed, chamfered `R` that moves directly into a compact `W`. The shared diagonal communicates an organised handoff, while the open counter inside the `R` suggests a doorway or managed entrance without using a literal property symbol.

The geometry is deliberately simple enough to remain recognisable at favicon scale. Square line caps, measured diagonals and one consistent stroke give the mark an architectural character without making it look like a building illustration.

The wordmark is built from outlined Manrope letterforms. `Rent` uses a semibold weight and `Wise` uses a stronger bold weight, with restrained negative tracking. Because the lettering is converted to paths, every SVG is self-contained and renders consistently.

## Logo variants

- `rentwise-logo.svg`: primary deep-green horizontal logo for light surfaces and the website header.
- `rentwise-logo-dark.svg`: solid near-black horizontal logo for monochrome light-background use.
- `rentwise-logo-light.svg`: solid-white horizontal logo for dark or photographic surfaces.
- `rentwise-logo-formal.svg`: deep-green formal lockup with the `Lettings & Management` descriptor.
- `rentwise-logo-formal-light.svg`: warm-white formal lockup for the website footer and other dark surfaces.
- `rentwise-monogram.svg`: primary deep-green monogram.
- `rentwise-monogram-dark.svg`: solid near-black monogram.
- `rentwise-monogram-light.svg`: solid-white monogram.
- `rentwise-social-square.svg`: warm-white monogram on a deep-green square.

## Colour usage

| Application | Artwork | Background |
| --- | --- | --- |
| Primary | `#28483B` | `#F3F4F1`, `#FCFCFA` or white |
| Dark monochrome | `#000000` | White or a very light neutral |
| Light monochrome | `#FFFFFF` | Dark green, charcoal or a sufficiently dark image |
| Footer formal lockup | `#F8FAF8` | `#18211D` |
| Social profile | `#F8FAF8` | `#28483B` |

Do not recolour individual parts of the monogram, add gradients, outlines, drop shadows or decorative accent colours.

## Clear space

Use the monogram stroke width as the base unit `x`.

- Keep at least `2x` clear space around the monogram-only versions.
- Keep at least `1.5x` above and below horizontal lockups.
- Keep at least `2x` to the left and right of horizontal lockups.
- Do not place borders, text or interface controls inside the clear-space area.

## Minimum sizes

- Primary horizontal logo: minimum 120px wide in digital use.
- Formal lockup: minimum 180px wide so the descriptor remains readable.
- Monogram: minimum 16px square with the supplied small-size PNG.
- Social square: use at 180px or larger when possible.

For sizes below these limits, use the monogram rather than compressing the horizontal or formal lockup.

## Favicon and app-icon guidance

Use `rentwise-monogram.svg` as the preferred scalable favicon. The supplied 16px, 32px and 48px PNGs are specifically rasterised from the simplified single-stroke monogram. Use `rentwise-monogram-180.png` for Apple touch icons and `rentwise-monogram-512.png` for larger app-icon contexts.

The monogram includes generous square padding so it remains safe when browsers or social platforms apply a circular crop.

## Website usage

- Header: `/branding/rentwise-logo.svg`.
- Footer: `/branding/rentwise-logo-formal-light.svg`.
- Metadata icon: `/branding/rentwise-monogram.svg` with PNG fallbacks.
- Social profiles: `/branding/rentwise-social-square.svg` or its PNG export.

## Re-exporting assets

Run:

```bash
npm run branding:export
```

The script downloads the official Manrope variable font into the ignored Next.js cache, converts the selected wordmark weights to vector outlines, writes the SVG masters and regenerates every required PNG size.
