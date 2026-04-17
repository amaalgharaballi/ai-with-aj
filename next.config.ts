import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      // Serve the Sveltia CMS static admin at /admin (maps to public/admin/index.html)
      { source: "/admin", destination: "/admin/index.html" },
    ];
  },
};

export default nextConfig;
