const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },
  experimental: {
    turbo: false, // Turbopack 비활성화
  },
  basePath: isProd ? '/SWYP_FRONT' : '',
  assetPrefix: '',
  output: 'standalone'
}

export default nextConfig;
