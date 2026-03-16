import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //⬇︎「開発中の表示」を非表示
  devIndicators: false,

  //⬇︎microCMSの画像を表示を許可。
  images: {
    domains: ['images.microcms-assets.io'],
  },

  //⬇︎styledComponentsを有効化
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
