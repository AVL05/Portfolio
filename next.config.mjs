const isDev = process.env.NODE_ENV !== "production";
const shouldUpgradeInsecureRequests = process.env.VERCEL === "1";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://api.web3forms.com",
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
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
      { source: "/es/proyectos", destination: "/proyectos", permanent: true },
      { source: "/es/proyectos/raw-vives", destination: "/proyectos/raw-vives", permanent: true },
      { source: "/es/proyectos/lumaflow-studio", destination: "/proyectos/lumaflow-studio", permanent: true },
      { source: "/es/proyectos/distrito-gourmet", destination: "/proyectos/distrito-gourmet", permanent: true },
      { source: "/es/sobre-mi", destination: "/sobre-mi", permanent: true },
      { source: "/es/fotografia", destination: "/fotografia", permanent: true },
      { source: "/es/contacto", destination: "/contacto", permanent: true },
      { source: "/es/legal", destination: "/legal", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        // Home diorama uses the same local embedded-texture loader.
        headers: securityHeaders.filter(({ key }) => key === "Content-Security-Policy")
          .map(({ key, value }) => ({
            key,
            value: value.replace("connect-src 'self'", "connect-src 'self' blob:")
              .replace("script-src 'self'", "script-src 'self' 'wasm-unsafe-eval'"),
          })),
      },
      {
        source: "/avatar-preview",
        // GLTFLoader decodes embedded textures through ImageBitmapLoader/fetch.
        headers: securityHeaders.filter(({ key }) => key === "Content-Security-Policy")
          .map(({ key, value }) => ({
            key,
            value: value.replace("connect-src 'self'", "connect-src 'self' blob:"),
          })),
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["react-icons", "lucide-react", "@react-three/drei", "three-stdlib"],
    // Required for app/global-not-found.tsx: with multiple root layouts
    // there is no single layout to compose unmatched-URL 404s from.
    globalNotFound: true,
  },
};

export default nextConfig;
