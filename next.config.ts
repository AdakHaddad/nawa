import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "instagram.fjog4-1.fna.fbcdn.net",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/images/**", // Restrict to specific path pattern
      },
    ],
  },
};
export default nextConfig;
