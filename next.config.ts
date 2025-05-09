const isProd = process.env.NODE_ENV === "production";
const isStorybookExport = process.env.STORYBOOK === "true";

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: true, // 308 Permanent Redirect
      },
    ];
  },
  experimental: {
    turbo: false, // Turbopack 비활성화
  },
  basePath: "",
  assetPrefix: isStorybookExport ? "/SWYP_FRONT/" : "",
  images: {
    unoptimized: isStorybookExport,
  },
  output: "standalone",
};

export default nextConfig;
