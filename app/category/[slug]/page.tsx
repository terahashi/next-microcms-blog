//「特定カテゴリの記事一覧を取得して表示する」ページです。
// カテゴリのボタンがクリックされると「特定カテゴリの記事一覧を取得して表示する」ページにリンクする仕様です。

import Image from 'next/image';
import Link from 'next/link';
import { getCategory, getCategoryPageNation } from '@/libs/blog';

////「特定カテゴリの記事一覧を取得して表示する」
export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> }) {
  //⬆︎① { params } はNext.js(App Router)から自動的に渡される引数。
  //・{ params }に渡ってくるものは何か？ ➡️ ⭐️URLの動的部分[slug]の値が、自動で{ params }に渡される。 ➡️ (URL例)app/category/[slug]/page.tsx
  //・つまり{ params }の中身は、[slug]の値が渡ってくるということ。

  //⬆︎②{ searchParams }は、URLのクエリパラメータ(page?: stringなので"文字列")を取得する。 ➡️ (URL例)app/category/[slug]/page.tsx?page="2"

  //⬇︎③paramsは、Next.jsの最近の仕様では「Promise(非同期)になった。」 ➡️ 上記の { params: Promise<{ slug: string }> }) の部分。
  //・だから「下記でparamsを使用する場合は『awaitが必要である。』」
  //・URLの値(/category/reactなど)だった場合 ➡️ Paramsを引数で受け取り ➡️ await params;で使用する。 ➡️ { slug }で分割代入すると、slug = "react" になる。
  const { slug } = await params;
  console.log('■特定カテゴリの記事一覧の「slugを確認」([slug]/page.tsx):', slug);

  //④現在の「クエリパラメータ」を取得してNumber()で数値に変換する。(例page="2"だったら2に変換する。)
  const sp = await searchParams; //URLのクエリパラメータ。
  console.log('■sp(ここでは文字列の数字):', sp);

  const currentPage = Number(sp.page) || 1;
  console.log('■sp(ページネーション[1]ボタンクリックすると確認できる):', sp.page);

  const limit = 1; //1ページに表示する記事数を「設定」

  //⬇︎⑤「特定カテゴリ + ページネーション対応の記事一覧」をmicroCMSから取得して『postsに格納する。』
  //getCategoryPageNation()は、libs/blog.tsで定義されて実行している。
  const data = await getCategoryPageNation(slug, currentPage, limit);
  const posts = data.contents;
  console.log('■postsで確認([slug]/page.tsx):', posts);

  //⬇︎⑥microCMSから取得した"記事一覧"から『"クリックされたカテゴリID(slug)"と"一致するカテゴリ名"を取得する。』
  const category = await getCategory(slug);
  const categoryName = category.name;

  //⬇︎⑦ページネーションで使用するために、totalPages(総記事数)を取得する。
  const totalPages = Math.ceil(data.totalCount / limit); //Math.ceil()は「小数点以下を切り上げ。」

  return (
    <div>
      <h1>{categoryName}の記事一覧</h1>

      {/* 記事が0件の場合はtrueになり、このカテゴリの記事はまだありません。と表示する。 */}
      {posts.length === 0 && <p>このカテゴリの記事はまだありません。</p>}

      {/* 取得した記事一覧 */}
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/blog/${post.id}`}>
            <h2>{post.title}</h2>
            {post.thumbnail && <Image src={post.thumbnail.url} alt={post.title} width={300} height={200} />}
          </Link>
        </div>
      ))}

      {/* ページネーション */}
      <div className='flex gap-2 mt-6 items-center'>
        {/* 前へボタン */}
        {currentPage > 1 && (
          <Link href={`/category/${slug}?page=${currentPage - 1}`} className='px-3 py-1 border'>
            ←
          </Link>
        )}

        {/* ⭐️⬇︎ページ番号（最大5件表示 + ページ数の省略 ...） */}
        {(() => {
          //startは「表示するページ番号の開始位置」
          //・Math.max()は「どちらかの値が大きければ大きい値を返す。」
          //例: currentPage = 5の場合 ➡️ Math.max(1, 5-2)なので、startが3となる
          //表示範囲は「3 4 [5] 6 7」となり ➡️ 『3が「表示するページ番号の開始位置」』となる
          const start = Math.max(1, currentPage - 2);

          //endは「表示するページ番号の終了位置」
          //・Math.min()は「どちらかの値が小さければ小さい値を返す。」
          //例1: currentPage = 7、totalPages = 20の場合 ➡️ Math.min(totalpage20, 7+2)なので、endが9となる
          //表示範囲は「5 6 [7] 8 9」となり ➡️ 『9が「表示するページ番号の終了位置」』となる。
          //例2: currentPage = 19、totalPages = 20の場合 ➡️ Math.min(totalpage20, 19+2)なので、endが20となる
          //表示範囲は「17 18 [19] 20」となり ➡️ 『20が「表示するページ番号の終了位置」』となる。
          const end = Math.min(totalPages, currentPage + 2);

          //・Array.from(①, ②)は「start〜endまでの連番配列を作っている」
          //①は配列の元(長さだけ決める) ➡️ { length: end - start + 1 }の部分。
          //②はmap関数で「中身を作る処理」です。➡️ (_, i) => start + iの部分。
          //(_, i) ➡️ _は配列の要素(今回は使わない) ➡️ iはインデックス(0,1,2,3,4)
          //start = 3だった場合、end = 7の場合 ➡️ (length: 7 - 3 + 1)で、length = 5になり『ループ回数となる。』
          //iは「ループ回数の番号(つまり5回)」➡️ iは「0, 1, 2, 3, 4」 ➡️ 計算すると、start + i = 『3, 4, 5, 6, 7』になる。
          //➡️ 結果 pages = [3, 4, 5, 6, 7]になる。
          const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

          return (
            <div>
              {/* 最初のページ */}
              {/* startは「表示するページ番号の開始位置」 */}
              {/* ⬇︎「start > 1 の場合」➡️ 『<Link>で1を表示する。』 */}
              {start > 1 && (
                //例: start(表示するページ番号の開始位置)が2の場合 ➡️ 『<Link>で1を表示する。』
                <>
                  <Link href={`/category/${slug}?page=1`} className='px-3 py-1 border'>
                    1
                  </Link>
                  {/* 「start > 2 の場合」は『省略希望...を表示する。』 */}
                  {/* 例: start(表示するページ番号の開始位置)が3の場合 ➡️ 『省略記号...を表示する。』*/}
                  {/* currentPages=5の場合 ➡️ 1 ... 3 4 [5] 6 7 ... 20  */}
                  {start > 2 && <span className='px-2'>...</span>}
                </>
              )}

              {/* ページ番号ボタンを作成する。 */}
              {/* 上記で作成した「連番配列pages」➡️ 結果 pages = [3, 4, 5, 6, 7]を ➡️ mapでループ処理している。 */}
              {/* 結果的に「pには3, 4, 5, 6, 7」が入り、表示される。 */}
              {/* それを href={`/category/${slug}?page=${p}`} でURLリンクする。 */}
              {/* ${p === currentPage ? で「現在のページにいる場合は『番号ボタンに色を付ける。』」 */}
              {pages.map((p) => (
                <Link key={p} href={`/category/${slug}?page=${p}`} className={`px-3 py-1 border ${p === currentPage ? 'bg-blue-500 text-white' : ''}`}>
                  {p}
                </Link>
              ))}

              {/* 最後のページ */}
              {/* endは「表示するページ番号の終了位置」 */}
              {/* ⬇︎「end < totalPages &&」の場合 ➡️ 例: end=18 < totalPages=20の場合「trueとなり表示する。」 */}
              {end < totalPages && (
                <>
                  {/*⬇︎「end < totalPages - 1 」の場合、『省略希望...を表示する。』 */}
                  {/* つまりend=18、totalPages=20の場合は ➡️ end18 < 20-1=19 となり『省略希望...を表示する。』*/}
                  {/* 表示としては、currentPage=16 なので 1 ... 14 15 [16] 17 18 ... 20 */}
                  {end < totalPages - 1 && <span className='px-2'>...</span>}

                  {/* 最後のページを表示する。 */}
                  <Link href={`/category/${slug}?page=${totalPages}`} className='px-3 py-1 border'>
                    {totalPages}
                  </Link>
                </>
              )}
            </div>
          );
        })()}

        {/* 次へボタン */}
        {currentPage < totalPages && (
          <Link href={`/category/${slug}?page=${currentPage + 1}`} className='px-3 py-1 border'>
            →
          </Link>
        )}
      </div>
    </div>
  );
}
