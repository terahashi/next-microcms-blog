//記事詳細ページ

import Link from 'next/link';
import dayjs from 'dayjs';
import { getBlogPost } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『"1件"の記事データを取得するAPI関数』をまとめたファイル。
import { client } from '@/libs/microcms';

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
          //<Link>でカテゴリ一覧ページへ遷移する。
          //"cate.id"はmicroCMS「categories API」のカテゴリIDのこと。
          <Link key={cate.id} href={`/category/${cate.id}`} className='mr-2'>
            {cate.name}
          </Link>
        ))}
      </div>
      {/* 記事本文を表示 */}
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </main>
  );
}

////静的パスを生成する。generateStaticParamsを使う場合(SSG)になる。
//generateStaticParamsは「Next.jsにどのURLページを事前生成するか教える関数。」
//generateStaticParams は「特別な関数」であり『Next.jsがファイルを見つけて自動実行する特殊関数』です。
//「静的パス」とは？「動的ルートを持つページ」を『ビルド時に生成して、あらかじめHTMLを生成する。』
//その結果"ユーザーがアクセスした時にすぐに表示してくれる。"
export async function generateStaticParams() {
  //⬇︎microCMSの「blogエンドポイント」から『全記事のIDを取得する。』
  //getAllcontentIdsメソッドは"microCMS専用のメソッド"であり「指定エンドポイントの全コンテンツIDを取得するメソッド」です。
  //"contentIds"は全記事IDの配列。
  const contentIds = await client.getAllContentIds({ endpoint: 'blog' });

  //ターミナルに全記事のID配列が表示される。
  console.log(contentIds); //['13vosvkwy9', '8a9rdsj6l'] として表示されます。

  //⬇︎「next.jsが理解できる形式に変換」する。
  //mapメソッドで配列(全記事)を1つずつ処理。
  return contentIds.map((contentId) => {
    //ターミナルには各記事IDを表示して確認。
    console.log('記事IDです:', contentId); //「記事ID: 13vosvkwy9」として表示されます。

    return {
      // Next.jsが理解できる { id: contentId } に変換して返却している。」
      id: contentId, //各記事を返却する。
    };
  });
}
