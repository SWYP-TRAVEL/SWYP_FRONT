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
  basePath: "",
  assetPrefix: isStorybookExport ? "/SWYP_FRONT/" : "",
  images: {
    unoptimized: isStorybookExport,
  },
  output: "standalone",
};

export default nextConfig;
