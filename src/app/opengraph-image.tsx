import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { siteHost } from "@/config/site-url";
import { metaContent } from "@/content/meta";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = metaContent.og.alt;

/**
 * Generated at build time into a static PNG. Satori supports a narrow subset
 * of CSS — flexbox only, no CSS variables, no oklch — so the colours come from
 * the hex mirrors in config/brand.ts and every element declares its display.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: brandColors.canvasDark,
        color: brandColors.inkDark,
        fontFamily: "sans-serif",
      }}
    >
      {/*
        Brand bloom. Satori has no blur filter, so a hard circle would cut
        across the headline — a radial gradient fades out instead.
      */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // Explicit box: Satori's layout gives an absolute element no size
          // from `inset` alone, and a zero-sized element paints no gradient.
          width: size.width,
          height: size.height,
          display: "flex",
          background:
            "radial-gradient(circle at 86% 6%, rgba(109, 116, 245, 0.55) 0%, rgba(109, 116, 245, 0.16) 30%, rgba(12, 13, 19, 0) 58%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: 16,
            background: brandColors.brandDark,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
            <div
              style={{
                width: 12,
                height: 34,
                borderRadius: 4,
                background: "#fff",
              }}
            />
            <div
              style={{
                width: 12,
                height: 22,
                borderRadius: 4,
                background: "#fff",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 4,
                background: "#fff",
                opacity: 0.45,
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600 }}>
          {siteConfig.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: brandColors.brandDark,
          }}
        >
          {metaContent.og.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            maxWidth: 900,
          }}
        >
          {metaContent.og.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: `1px solid ${brandColors.edgeDark}`,
          fontSize: 26,
          color: brandColors.inkMutedDark,
        }}
      >
        <div style={{ display: "flex" }}>{metaContent.og.footer}</div>
        <div style={{ display: "flex", color: brandColors.inkFaintDark }}>
          {siteHost}
        </div>
      </div>
    </div>,
    size,
  );
}
