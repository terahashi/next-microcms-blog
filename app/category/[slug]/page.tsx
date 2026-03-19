//「特定カテゴリの記事一覧を取得して表示する」ページです。
// カテゴリのボタンがクリックされると「特定カテゴリの記事一覧を取得して表示する」ページにリンクする仕様です。

import Image from 'next/image';
import Link from 'next/link';
import { getCategory, getCategoryPagination } from '@/libs/blog';

//コンポーネント
import Pagination from '@/components/Pagination';

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

  const limit = 1; //1ページに表示する記事数を設定する。

  //⬇︎⑤「特定カテゴリ + ページネーション対応の記事一覧」をmicroCMSから取得して『postsに格納する。』
  //getCategoryPagination()は、libs/blog.tsで定義されて実行している。
  const data = await getCategoryPagination(slug, currentPage, limit);
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

      {/*  ページネーション */}
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath={`/category/${slug}`} />
    </div>
  );
}
