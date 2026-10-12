import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/frombb",
  allowedDevOrigins: ["192.168.1.17", "192.168.1.*", "localhost", "127.0.0.1"],
};

export default nextConfig;
