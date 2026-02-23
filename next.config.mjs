/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  output: "standalone",
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
