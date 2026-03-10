import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  //以下を追加
  devIndicators: false, //「開発中の表示」を非表示

  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
