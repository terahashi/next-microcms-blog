////記事一覧ページ(トップページ)
//まずは①javaScriptで作成。
//その後②TypeScriptに書き換えてみる。
//理由としては『TypeScriptのトレーニング。』

import Image from 'next/image';
import Link from 'next/link';
import { getPagination } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『記事データを取得するAPI関数』をまとめたファイル。

//ページネーション(コンポーネント)
import { PageContainer, Wrapper, Inner } from '@/components/common/LayoutPrimitives';
import Pagination from '@/components/Pagination';

////ISR(定期で更新)
//一定時間毎にページを再生成できる。(次のアクセス時にページを再生成)
export const revalidate = 60; //60秒経過でページを再生成する

////Home(記事一覧を表示)
export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  //⬇︎ページネーション用: 現在の「クエリパラメータ」を取得してNumber()で数値に変換する。(例page="2"だったら2に変換する。)
  const sp = await searchParams; //URLのクエリパラメータ。
  const currentPage = Number(sp.page) || 1;
  const limit = 7; //1ページに表示する記事数を設定する。
  const data = await getPagination(currentPage, limit);
  const posts = data.contents;
  //⬇︎ページネーションで使用するために、totalPages(総記事数)を取得する。
  const totalPages = Math.ceil(data.totalCount / limit); //Math.ceil()は「小数点以下を切り上げ。」

  return (
    <PageContainer>
      <Wrapper>
        <Inner>
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

              {/*  ページネーション */}
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath='/' />
            </main>
          </div>
        </Inner>
      </Wrapper>
    </PageContainer>
  );
}
