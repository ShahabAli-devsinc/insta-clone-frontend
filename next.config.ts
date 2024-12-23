import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
      {
        protocol: "https",
        hostname: "images.rawpixel.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/dashboard/home",
      },
      {
        source: "/profile",
        destination: "/dashboard/profile",
      },
      {
        source: "/post",
        destination: "/dashboard/post",
      },
      {
        source: "/explore",
        destination: "/dashboard/explore",
      },
    ];
  },
};

export default nextConfig;
