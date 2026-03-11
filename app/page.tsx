////記事一覧ページ(トップページ)
//まずは①javaScriptで作成。
//その後②TypeScriptに書き換えてみる。
//理由としては『TypeScriptのトレーニング。』

import Image from 'next/image';
import { client } from '../libs/microcms';
import Link from 'next/link';

////「TypeScript」ブログ記事の型エイリアスを定義する。
type Blog = {
  id: string; //記事ID
  title: string; //記事タイトル
  thumbnail: {
    url: string; //サムネイル画像URL
  };
  publishedAt: string; //投稿日時
};

////「記事一覧」を取得。
//SSG(静的生成)を使ってデータを取得します。
//なぜSSG(静的生成)を使う？➡︎『microCMS APIをビルド時に取得し、Next.jsでHTMLを生成するから』です。
async function getBlogPosts(): Promise<Blog[]> {
  //⬆︎:Promise<Blog[]>は「戻り値の型」を明示している。
  //意味:「このgetBlogpots関数は Promiseが戻り値で、中身は<Blog[]>」になる。
  //Blog[]の意味:「Blog型オブジェクトの配列」という意味。つまり記事データの配列が配列が返ってくる。
  //async関数は必ずPromiseを返すので、Promise<型>をと書くべし。
  const data = await client.get({
    endpoint: 'blog', //'blog'はエンドポイント名。
    queries: {
      fields: 'id,title,thumbnail,publishedAt', //投稿した記事の「id、タイトル、サムネイル画像、公開日」を取得する。『これを一覧で表示する。』
      limit: 6, //最新の６件の記事を取得する。
    },
  });

  return data.contents; //取得した記事一覧を返却する。contentsは「APIから取得した"contentsプロパティ(記事配列)"」
}

////トップページ(記事一覧を表示)
export default async function Home() {
  //⬇︎await getBlogPosts()で「microCMSから取得した『記事一覧』」をpostsに格納する。
  const posts = await getBlogPosts();

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans '>
      <main>
        <div>
          <h1>ブログ記事一覧</h1>
        </div>

        {/* ⬇︎取得した記事一覧(posts)を「mapメソッド」で表示する。(ちなみに"配列なので"mapが使用できます) */}
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>
                  {/* 記事タイトルを表示する */}
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
