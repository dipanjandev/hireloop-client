import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // এখানে আপনার হোস্ট করা ডোমেন দিন
      },
    ],
  },
}

export default nextConfig
