import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: ".next",
  // Keeps the build memory footprint localized
  experimental: {
    memoryBasedWorkersCount: true,
  },
};

export default nextConfig;
