////記事一覧ページ(トップページ)
//まずは①javaScriptで作成。
//その後②TypeScriptに書き換えてみる。
//理由としては『TypeScriptのトレーニング。』

import Image from 'next/image';
import Link from 'next/link';
import { getBlogPosts } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『記事データを取得するAPI関数』をまとめたファイル。

////ISR(定期で更新)
//一定時間毎にページを再生成できる。(次のアクセス時にページを再生成)
export const revalidate = 60; //60秒経過でページを再生成する

////Home(記事一覧を表示)
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
