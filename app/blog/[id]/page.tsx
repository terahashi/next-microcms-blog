//記事詳細ページ

import Link from 'next/link';
import dayjs from 'dayjs';
import { getBlogPost } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『"1件"の記事データを取得するAPI関数』をまとめたファイル。
import { client } from '@/libs/microcms';
import styled from 'styled-components';

//ページネーション(コンポーネント)
import { Wrapper, PageInner } from '@/components/common/LayoutPrimitives';
import { breakpoints } from '@/styles/breakpoints';

////ArticleHeader(絵文字、日時、タイトル)
const ArticleHeader = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-top: 70px;
    margin-bottom: 50px;
  }
`;

////Container
const ArticleHeader_Container = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-bottom: 20px;
  }
`;

const Article_Emoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 37px;
  width: 77px;
  height: 77px;
  background-color: #2f2b47;
  border-radius: 14px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 42px;
    width: 90px;
    height: 90px;
  }
`;

const ArticleHeader_metaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  font-size: 14.5px;
  text-align: left;
  color: var(--color-gray-400);
`;

const Article_title = styled.h1`
  max-width: 780px;
  margin: 20px auto 0;
  font-weight: bold;
  text-align: left;
  font-size: 1.4rem;
`;

////カテゴリ
const Article_Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 780px;
  margin: 30px auto 0;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin: 30px auto 0;
  }
`;

////カテゴリのタグ(角丸デザイン)
const CategoryTag = styled.span`
  cursor: pointer;
  display: inline-block;
  padding: 6px 12px;
  font-size: 0.85rem;
  color: #ffffff;
  background-color: #2f2b47;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #3b3560;
  }
`;

////Article_Body_Container(本文)
const Article_Body_Container = styled.div`
  max-width: 780px;
  margin: 0 auto 70px;
  /* background: #1e1b34;
  border: 1px solid #3b3151;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); */
  /* padding: 20px 20px; */
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin: 0 auto 70px;
    /* padding: 40px 40px; */
  }
`;

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
  const formattedDate = dayjs(post.publishedAt).format('YYYY/MM/DD');

  return (
    <Wrapper>
      <PageInner>
        <main>
          {/* ArticleHeader(絵文字、日時、タイトル、カテゴリーを表示) */}
          <ArticleHeader>
            <ArticleHeader_Container>
              <Article_Emoji>
                {/* 絵文字を表示 */}
                {post.emoji}
              </Article_Emoji>

              {/* 日付を表示 */}
              <ArticleHeader_metaContainer>{formattedDate}に投稿</ArticleHeader_metaContainer>

              <Article_title className='title__ja'>
                {/* タイトルを表示 */}
                {post.title}
              </Article_title>

              {/* カテゴリーを表示 */}
              <Article_Category>
                Tags:
                {post.category.map((cate) => (
                  //<Link>でカテゴリ一覧ページへ遷移する。
                  //"cate.id"はmicroCMS「categories API」のカテゴリIDのこと。
                  <Link key={cate.id} href={`/category/${cate.id}`}>
                    <CategoryTag>{cate.name}</CategoryTag>
                  </Link>
                ))}
              </Article_Category>
            </ArticleHeader_Container>
          </ArticleHeader>

          {/* Article_Body_Containe(記事本文を表示) */}
          {/* className='article-body'は「global.cssに記載している」 */}
          <Article_Body_Container>
            <div className='article-body' dangerouslySetInnerHTML={{ __html: post.body }} />
          </Article_Body_Container>
        </main>
      </PageInner>
    </Wrapper>
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

////SEO設定(記事ごと)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getBlogPost(id);
  const description = post.description ?? '記事詳細ページ';

  return {
    //⬇︎ページタイトルなどを定義
    title: post.title,
    description,
    alternates: {
      //Canonical URLは「このコンテンツの正式なURLはこれです」と検索エンジンに伝えるための仕組み。
      canonical: `https://next-microcms-blog-fawn.vercel.app/blog/${id}`,
    },

    //⬇︎全SNSの基本設定「openGraph」
    openGraph: {
      title: post.title,
      description,
      images: post.thumbnail?.url
        ? [
            {
              url: post.thumbnail.url,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },

    //X(旧Twitter)専用の追加設定
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail?.url ? [post.thumbnail.url] : [], //サムネがあれば画像を入れる。[post.thumbnail.url] : なければundefinedにする。[]
    },
  };
}
