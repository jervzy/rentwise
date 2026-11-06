import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";
import sharp from "sharp";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDirectory = path.join(projectRoot, "public", "branding");
const cacheDirectory = path.join(
  projectRoot,
  ".next",
  "cache",
  "rentwise-branding",
);
const fontPath = path.join(cacheDirectory, "Manrope-Variable-wght.ttf");
const fontUrl =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf";

const colors = {
  green: "#28483B",
  black: "#000000",
  warmWhite: "#F8FAF8",
  white: "#FFFFFF",
};

const monogramPath =
  "M6 54V6H28L37 15V24L28 33H6 M23 33L36 54L45 38L54 54L64 33";

await mkdir(outputDirectory, { recursive: true });
await mkdir(cacheDirectory, { recursive: true });

if (!existsSync(fontPath)) {
  const response = await fetch(fontUrl);

  if (!response.ok) {
    throw new Error(
      `Unable to download Manrope for outline export (${response.status}).`,
    );
  }

  await writeFile(fontPath, Buffer.from(await response.arrayBuffer()));
}

const sourceFont = fontkit.openSync(fontPath);
const rentFont = sourceFont.getVariation({ wght: 610 });
const wiseFont = sourceFont.getVariation({ wght: 735 });
const descriptorFont = sourceFont.getVariation({ wght: 650 });

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

function outlineText({ text, font, size, x, baseline, tracking = 0 }) {
  const scale = size / font.unitsPerEm;
  const run = font.layout(text);
  let cursor = 0;
  const paths = run.glyphs.map((glyph, index) => {
    const position = run.positions[index];
    const translateX = x + (cursor + position.xOffset) * scale;
    const translateY = baseline - position.yOffset * scale;
    cursor += position.xAdvance;

    if (index < run.glyphs.length - 1) {
      cursor += tracking / scale;
    }

    return `<path d="${escapeAttribute(glyph.path.toSVG())}" transform="translate(${translateX.toFixed(3)} ${translateY.toFixed(3)}) scale(${scale.toFixed(6)} ${(-scale).toFixed(6)})"/>`;
  });

  return {
    markup: paths.join(""),
    width: cursor * scale,
  };
}

function svgDocument({ title, viewBox, content }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="title" shape-rendering="geometricPrecision"><title id="title">${title}</title>${content}</svg>`;
}

function monogramMarkup(color, transform = "translate(0 7)") {
  return `<path d="${monogramPath}" transform="${transform}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="square" stroke-linejoin="bevel"/>`;
}

function horizontalLogo(color, formal = false) {
  const wordSize = 44;
  const wordX = 88;
  const rent = outlineText({
    text: "Rent",
    font: rentFont,
    size: wordSize,
    x: wordX,
    baseline: 51,
    tracking: -0.8,
  });
  const wiseX = wordX + rent.width + 9;
  const wise = outlineText({
    text: "Wise",
    font: wiseFont,
    size: wordSize,
    x: wiseX,
    baseline: 51,
    tracking: -1,
  });
  const width = Math.ceil(wiseX + wise.width + 8);
  const descriptor = formal
    ? outlineText({
        text: "LETTINGS & MANAGEMENT",
        font: descriptorFont,
        size: 10.5,
        x: wordX,
        baseline: 78,
        tracking: 1.35,
      })
    : null;
  const height = formal ? 94 : 72;

  return svgDocument({
    title: formal ? "Rent Wise Lettings and Management" : "Rent Wise",
    viewBox: `0 0 ${width} ${height}`,
    content: `${monogramMarkup(color, "translate(4 6)")}<g fill="${color}">${rent.markup}${wise.markup}${descriptor?.markup ?? ""}</g>`,
  });
}

function monogramLogo(color) {
  return svgDocument({
    title: "Rent Wise RW monogram",
    viewBox: "0 0 72 72",
    content: monogramMarkup(color),
  });
}

function socialSquare() {
  return svgDocument({
    title: "Rent Wise social profile mark",
    viewBox: "0 0 512 512",
    content: `<rect width="512" height="512" fill="${colors.green}"/>${monogramMarkup(colors.warmWhite, "translate(60 88) scale(5.6)")}`,
  });
}

const svgAssets = {
  "rentwise-logo.svg": horizontalLogo(colors.green),
  "rentwise-logo-dark.svg": horizontalLogo(colors.black),
  "rentwise-logo-light.svg": horizontalLogo(colors.white),
  "rentwise-logo-formal.svg": horizontalLogo(colors.green, true),
  "rentwise-logo-formal-light.svg": horizontalLogo(colors.warmWhite, true),
  "rentwise-monogram.svg": monogramLogo(colors.green),
  "rentwise-monogram-dark.svg": monogramLogo(colors.black),
  "rentwise-monogram-light.svg": monogramLogo(colors.white),
  "rentwise-social-square.svg": socialSquare(),
};

for (const [filename, svg] of Object.entries(svgAssets)) {
  await writeFile(path.join(outputDirectory, filename), svg);
}

const pngExports = [
  ["rentwise-logo.svg", "rentwise-logo.png", { width: 720 }],
  ["rentwise-logo-dark.svg", "rentwise-logo-dark.png", { width: 720 }],
  ["rentwise-logo-light.svg", "rentwise-logo-light.png", { width: 720 }],
  ["rentwise-logo-formal.svg", "rentwise-logo-formal.png", { width: 720 }],
  [
    "rentwise-logo-formal-light.svg",
    "rentwise-logo-formal-light.png",
    { width: 720 },
  ],
  [
    "rentwise-monogram.svg",
    "rentwise-monogram-512.png",
    { width: 512, height: 512 },
  ],
  [
    "rentwise-monogram.svg",
    "rentwise-monogram-180.png",
    { width: 180, height: 180 },
  ],
  [
    "rentwise-monogram.svg",
    "rentwise-monogram-48.png",
    { width: 48, height: 48 },
  ],
  [
    "rentwise-monogram.svg",
    "rentwise-monogram-32.png",
    { width: 32, height: 32 },
  ],
  [
    "rentwise-monogram.svg",
    "rentwise-monogram-16.png",
    { width: 16, height: 16 },
  ],
  [
    "rentwise-social-square.svg",
    "rentwise-social-square.png",
    { width: 1024, height: 1024 },
  ],
];

for (const [sourceName, outputName, dimensions] of pngExports) {
  const source = await readFile(path.join(outputDirectory, sourceName));
  await sharp(source)
    .resize({ ...dimensions, fit: "contain" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDirectory, outputName));
}

console.log(
  `Exported ${Object.keys(svgAssets).length} SVG and ${pngExports.length} PNG brand assets.`,
);
