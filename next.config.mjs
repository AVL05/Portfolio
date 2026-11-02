const isDev = process.env.NODE_ENV !== "production";
const shouldUpgradeInsecureRequests = process.env.VERCEL === "1";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "frame-src 'none'",
      "script-src-attr 'none'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      shouldUpgradeInsecureRequests ? "upgrade-insecure-requests" : "",
    ].join("; "),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
];

const legacyRedirects = [
  {
    source: "/proyectos/raw-manager",
    destination: "/proyectos/lumaflow-studio",
    permanent: true,
  },
  // Spanish lives at the root: normalize guessed /es/* URLs with
  // explicit single-hop redirects. Only real ES paths are mapped;
  // anything else (e.g. /es/projects) correctly stays a 404.
  // 308 preserves method and signals permanence without chains.
  { source: "/es", destination: "/", permanent: true },
  { source: "/es/proyectos/raw-vives", destination: "/proyectos/raw-vives", permanent: true },
  { source: "/es/proyectos/lumaflow-studio", destination: "/proyectos/lumaflow-studio", permanent: true },
  { source: "/es/proyectos/distrito-gourmet", destination: "/proyectos/distrito-gourmet", permanent: true },
  { source: "/es/legal", destination: "/legal", permanent: true },
  // These retired pages now have equivalent sections in each localized home.
  { source: "/contacto", destination: "/#contact", permanent: true },
  { source: "/en/contact", destination: "/en#contact", permanent: true },
  { source: "/proyectos", destination: "/#projects", permanent: true },
  { source: "/en/projects", destination: "/en#projects", permanent: true },
  { source: "/sobre-mi", destination: "/#experience", permanent: true },
  { source: "/en/about", destination: "/en#experience", permanent: true },
  { source: "/fotografia", destination: "/#photography", permanent: true },
  { source: "/en/photography", destination: "/en#photography", permanent: true },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      // Only the known public alias is consolidated; deployment previews stay intact.
      ...legacyRedirects.map(rule => ({
        ...rule,
        has: [{ type: "host", value: "aleviclop.vercel.app" }],
        destination: `https://www.aleviclop.dev${rule.destination}`,
      })),
      {
        source: "/:path*",
        has: [{ type: "host", value: "aleviclop.vercel.app" }],
        destination: "https://www.aleviclop.dev/:path*",
        permanent: true,
      },
      ...legacyRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react"],
    // Required for app/global-not-found.tsx: with multiple root layouts
    // there is no single layout to compose unmatched-URL 404s from.
    globalNotFound: true,
  },
};

export default nextConfig;
