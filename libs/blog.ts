//microCMSの「blogエンドポイント」から『記事データを取得するAPI関数』をまとめたファイル。

import { client } from './microcms'; //microCMSを使うためのライブラリです。
import { Blog } from '../types/blog'; //名前付きインポート。TypeScriptで型定義した「型エイリアスをインポートする。」チーム開発で「名前付きインポート」は安全である。

////「記事一覧」を取得。
//SSG(静的生成)を使ってデータを取得します。
//なぜSSG(静的生成)を使う？➡︎『microCMS APIをビルド時に取得し、Next.jsでHTMLを生成するから』です。
export async function getBlogPosts(): Promise<Blog[]> {
  //⬆︎:Promise<Blog[]>は「戻り値の型」を明示している。
  //意味:「このgetBlogpots関数は Promiseが戻り値で、中身は<Blog[]>」になる。
  //Blog[]の意味:「Blog型オブジェクトの配列」という意味。つまり記事データの配列が配列が返ってくる。
  //async関数は必ずPromiseを返すので、Promise<型>をと書くべし。
  const data = await client.get<{ contents: Blog[] }>({
    //⬆︎<{ contents: Blog[] }>はジェネリクス(型を後から渡す仕組み)です。取得したdataのcontentsの型が『完全にBlog[]と定義されます。』
    endpoint: 'blog', //'blog'はエンドポイント名。
    queries: {
      fields: 'id,title,thumbnail,publishedAt', //投稿した記事の「id、タイトル、サムネイル画像、公開日」を取得する。『これを一覧で表示する。』
      limit: 6, //最新の６件の記事を取得する。
    },
  });

  console.log(data); //取得した「記事一覧」を一応console.logで確認。

  return data.contents; //取得した記事一覧を返却する。contentsは「APIから取得した"contentsプロパティ(記事配列)"」
}

////「記事詳細」を取得。
//microCMSから"特定の記事1件"を取得
export async function getBlogPost(id: string): Promise<Blog> {
  //⬆︎:Promise<Blog>は「戻り値の型」を明示している。
  //<Blog>はBlog型のオブジェクト1個("Blog型の配列"ではない。)
  const data = await client.get<Blog>({
    ///⬇︎api/v1/blog/{id}という「URLになる。」
    endpoint: 'blog',
    contentId: id,
  });

  console.log(data); //取得した「1件の記事詳細」を一応console.logで確認。『Server Component』なのでlogは「ブラウザではなくターミナル」に表示される。

  return data;
}
