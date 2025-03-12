import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/contract/dsp/list",
        permanent: true,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
