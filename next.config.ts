import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  devIndicators: false,

  allowedDevOrigins: ['141.99.126.94', 'localhost'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
