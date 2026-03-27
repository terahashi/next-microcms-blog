//robots.ts(サイトを巡回(クロール)する)
//「クロールして良いページか？」「クロールしてはいけないページか＞」を検索エンジンへ伝える。
import { MetadataRoute } from 'next';

// robots.txt を生成する関数
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', //全検索エンジン対象。
      allow: '/', //全ページクロール許可。
    },
    //⬇︎「sitemap」の場所を教える。
    sitemap: 'https://next-microcms-blog-fawn.vercel.app/sitemap.xml',
  };
}
