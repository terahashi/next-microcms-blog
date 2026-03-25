////記事一覧ページ(トップページ)
//まずは①javaScriptで作成。
//その後②TypeScriptに書き換えてみる。
//理由としては『TypeScriptのトレーニング。』

import Image from 'next/image';
import Link from 'next/link';
import { getPagination } from '@/libs/blog'; //microCMSの「blogエンドポイント」から『記事データを取得するAPI関数』をまとめたファイル。
import styled from 'styled-components';
import dayjs from 'dayjs';

//ページネーション(コンポーネント)
import { Wrapper, PageInner } from '@/components/common/LayoutPrimitives';
import Pagination from '@/components/Pagination';
import { breakpoints } from '@/styles/breakpoints';

////ISR(定期で更新)
//一定時間毎にページを再生成できる。(次のアクセス時にページを再生成)
export const revalidate = 60; //60秒経過でページを再生成する

//親
const Articlelist_listContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
`;

//子
const ArticleList_itemContainer = styled.div`
  width: 100%;
  @media screen and (min-width: ${breakpoints.tablet}) {
    width: 47%;
  }
`;
const ArticleListItem_Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`;
const ArticleListItem_Emoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
const ArticleListItem_content = styled.div`
  width: calc(100% - 92px);
`;

////Home(記事一覧を表示)
export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  //⬇︎ページネーション用: 現在の「クエリパラメータ」を取得してNumber()で数値に変換する。(例page="2"だったら2に変換する。)
  const sp = await searchParams; //URLのクエリパラメータ。
  const currentPage = Number(sp.page) || 1;
  const limit = 10; //1ページに表示する記事数を設定する。
  const data = await getPagination(currentPage, limit);
  const posts = data.contents;
  //⬇︎ページネーションで使用するために、totalPages(総記事数)を取得する。
  const totalPages = Math.ceil(data.totalCount / limit); //Math.ceil()は「小数点以下を切り上げ。」

  return (
    <Wrapper>
      <PageInner>
        <main>
          <div className='mt-[70px] md:mt-[70px] mb-[100px] md:mb-[100px]'>
            <div className='mb-[40px] md:mb-[40px]'>
              <h1 className='title__ja font-bold text-left'>Techブログ</h1>
            </div>

            {/* ⬇︎取得した記事一覧(posts)を「mapメソッド」で表示する。(ちなみに"配列なので"mapが使用できます) */}
            <Articlelist_listContainer>
              {posts.map((post) => {
                //⬇︎dayjsを使って「publishedAt」をYY.MM.DD形式に変換
                const formattedDate = dayjs(post.publishedAt).format('YYYY/MM/DD');

                return (
                  <ArticleList_itemContainer key={post.id}>
                    <Link href={`/blog/${post.id}`}>
                      <ArticleListItem_Container>
                        {/* 絵文字を表示する */}
                        <ArticleListItem_Emoji>{post.emoji}</ArticleListItem_Emoji>

                        <ArticleListItem_content>
                          {/* 日付を表示 */}
                          <p className='text-[0.85rem] text-gray-400 mb-2'>{formattedDate}</p>
                          {/* 記事タイトルを表示する */}
                          <h2 className='text-[1.15rem] font-bold text-left'>{post.title}</h2>
                        </ArticleListItem_content>
                      </ArticleListItem_Container>
                    </Link>
                  </ArticleList_itemContainer>
                );
              })}
            </Articlelist_listContainer>

            {/*  ページネーション */}
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath='/' />
          </div>
        </main>
      </PageInner>
    </Wrapper>
  );
}
