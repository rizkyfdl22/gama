import type { NextConfig } from "next";

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
    experimental: {
    turbo: false, // penting untuk library ini
  },
};

export default nextConfig;