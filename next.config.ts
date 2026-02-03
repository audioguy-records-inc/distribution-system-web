import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/contract/dsp/list",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/contract/dsp/list",
        permanent: true,
      },
    ];
  },

  compiler: {
    styledComponents: true,
  },

  images: {
    domains: [
      "storage-test-distribution.sovo360.com",
      "storage-distribution.sovo360.com",
    ],
  },
};

export default withNextIntl(nextConfig);
