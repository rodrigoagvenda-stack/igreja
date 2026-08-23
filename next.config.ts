import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "55mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "dkvznmmiiiljyrkopiqx.supabase.co" },
    ],
  },
};

export default nextConfig;
