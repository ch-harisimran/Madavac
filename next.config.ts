import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "madavac.com" }],
        destination: "https://www.madavac.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
