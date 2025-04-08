import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: isProd ? '/SWYP_FRONT' : '',
  assetPrefix: isProd ? '/SWYP_FRONT/' : '',
};

export default nextConfig;
