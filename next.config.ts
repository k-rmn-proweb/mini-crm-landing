import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Applies to every response, including the generated OG image.
        source: "/:path*",
        headers: [
          // No Content-Security-Policy here: next-themes writes an inline
          // script before paint to avoid a flash of the wrong theme, and a
          // policy strict enough to be worth having would need a nonce, which
          // in turn forces every page to render dynamically.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
