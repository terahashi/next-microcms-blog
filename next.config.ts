import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  //以下を追加
  devIndicators: false,

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
