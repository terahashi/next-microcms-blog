//記事詳細ページ

import dayjs from 'dayjs';
import { getBlogPost } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『"1件"の記事データを取得するAPI関数』をまとめたファイル。

//// 記事詳細ページの生成
// blog/abc123にアクセスすると「BlogPostPage()」が実行されます。
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  //⬆︎{ params }は分割代入。引数として{ params }を受け取る。
  //・Next.jsが渡す「propsの中のparams」を『分割代入で取り出している。』

  //⬆︎{ params }は動的なURLパラメータです。[id]の部分です。
  //・つまり/blog/abc123というURLにアクセスすると、params = { id: "abc123" } になる。

  //⬆︎{ params: Promise<{ id: string }> }は型指定。
  //・paramsは「Promise<{ id: string }>型」であるということ。
  //・つまりparamsは、awaitすると「{ id: string }のオブジェクトになる」ということ。

  //⬇︎記事IDを取得する。
  //「params」は『Promise型なのでawaitすると{ id: string }が取得できる。』➡️{ params: Promise<{ id: string }> }の部分。
  const { id } = await params;

  //⬇︎記事IDに該当する記事を取得する。
  //getBlogPost関数自体が、async関数だからawaitで使用している。
  const post = await getBlogPost(id);

  //⬇︎dayjsを使って「publishedAt」をYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YY/MM/DD');

  return (
    <main>
      {/* タイトルを表示 */}
      <h1>{post.title}</h1>
      {/* 日付を表示 */}
      <div>{formattedDate}</div>
      {/* カテゴリーを表示 */}
      <div>
        カテゴリー：
        {post.category.map((cate) => (
          <span key={cate.name} className='mr-2'>
            {cate.name}
          </span>
        ))}
      </div>
      {/* 記事本文を表示 */}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </main>
  );
}
