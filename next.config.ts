const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  experimental: {
    turbo: false, // Turbopack 비활성화
  },
  basePath: isProd ? '/SWYP_FRONT' : '',
  assetPrefix: isProd ? '/SWYP_FRONT/' : '',
}

export default nextConfig;
