import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

//コンポーネント
import StyledComponentsRegistry from '@/libs/styled-components-registry';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Nav } from '@/components/common/Nav'; //追従するナビゲーション

const notoSans = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={`${notoSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StyledComponentsRegistry>
          <Header />
          <Nav />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

////SEO設定(共通ルール)
export const metadata: Metadata = {
  //⬇︎ページタイトルなどを定義
  title: {
    default: 'DevLog',
    template: '%s | DevLog', //%s = 各ページのタイトル
  },
  description: '学習内容を発信する技術ブログ',
  metadataBase: new URL('https://next-microcms-blog-fawn.vercel.app/'), //相対パスを絶対URLに変換する基準

  //⬇︎全SNSの基本設定「openGraph」
  openGraph: {
    title: 'DevLog',
    description: '学習内容を発信する技術ブログ',
    url: 'https://next-microcms-blog-fawn.vercel.app/',
    siteName: 'DevLog',
    images: [
      {
        url: '/images/ogp.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },

  //X(旧Twitter)専用の追加設定
  twitter: {
    card: 'summary_large_image',
    title: 'DevLog',
    description: '学習内容を発信する技術ブログ',
    images: ['/images/ogp.jpg'],
  },
};
