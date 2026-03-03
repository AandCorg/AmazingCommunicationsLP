import type { NextConfig } from "next";

const repoName = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: repoName,
  assetPrefix: repoName,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
