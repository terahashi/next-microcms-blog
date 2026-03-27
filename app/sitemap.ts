//サイト内の全ページURL一覧(sitemap.xml)を作成する。

import { MetadataRoute } from 'next'; //sitemapの正しい形式を保証してくれる
import { client } from '@/libs/microcms'; //microCMSからデータ取得する

//⬇︎sitemapのメイン関数を作成する。
//asyncは「API通信をするため」
//Promise<MetadataRoute.Sitemap> ➡️ sitemap形式で返す
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //全記事ID取得
  //全記事 blog/['abc123', 'def456', 'xyz789'] のように取得する。
  const contentIds = await client.getAllContentIds({
    endpoint: 'blog',
  });

  //記事ページを「ID から URLに変換に変換」する。
  const blogUrls = contentIds.map((id) => ({
    url: `https://next-microcms-blog-fawn.vercel.app/blog/${id}`,
    lastModified: new Date(), //lastModifiedは「最終更新日」のこと。『new Date()で「今の日時」を取得する。』
  }));

  return [
    //⬇︎トップページ
    {
      url: 'https://next-microcms-blog-fawn.vercel.app/',
      lastModified: new Date(), //lastModifiedは「最終更新日」のこと。『new Date()で「今の日時」を取得する。』
    },
    //⬇︎Aboutページ
    {
      url: 'https://next-microcms-blog-fawn.vercel.app/about',
      lastModified: new Date(), //lastModifiedは「最終更新日」のこと。『new Date()で「今の日時」を取得する。』
    },
    //⬇︎記事ページ
    ...blogUrls,
  ];
}
