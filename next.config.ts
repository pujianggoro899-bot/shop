import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export untuk Netlify
  images: {
    unoptimized: true, // Diperlukan untuk static export
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
