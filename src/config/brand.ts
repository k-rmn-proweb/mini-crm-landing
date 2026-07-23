/**
 * Hex mirrors of the oklch tokens in `app/globals.css`.
 *
 * A documented exception to "colours live in one stylesheet": Satori (the OG
 * image renderer) and the `theme-color` meta tag are both outside the CSS
 * cascade and cannot read custom properties. Values are the sRGB conversions
 * of the tokens — keep them in sync if the palette changes.
 */
export const brandColors = {
  brand: "#5044ec",
  brandDark: "#6d74f5",

  canvasLight: "#ffffff",
  canvasDark: "#0c0d13",
  surfaceDark: "#161821",
  edgeDark: "#262833",

  inkDark: "#f4f5f9",
  inkMutedDark: "#a1a4b1",
  inkFaintDark: "#898b99",
} as const;
