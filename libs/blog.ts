//microCMSの「blogエンドポイント」から『記事データを取得するAPI関数』をまとめたファイル。

import { client } from './microcms'; //microCMSを使うためのライブラリです。
import { Blog } from '../types/blog'; //名前付きインポート。「Blog型エイリアスをインポートする。」チーム開発で「名前付きインポート」は安全である。
import { Category } from '../types/blog'; //「Category型エイリアスをインポートする。」
import { BlogListResponse } from '../types/blog'; // 「Pagenation型エイリアスをインポートする。」

// ////「記事一覧」を取得。
// //SSG(静的生成)を使ってデータを取得します。
// //なぜSSG(静的生成)を使う？➡︎『microCMS APIをビルド時に取得し、Next.jsでHTMLを生成するから』です。
// export async function getBlogPosts(): Promise<Blog[]> {
//   //⬆︎:Promise<Blog[]>は「戻り値の型」を明示している。
//   //意味:「このgetBlogpots関数は Promiseが戻り値で、中身は<Blog[]>」になる。
//   //Blog[]の意味:「Blog型オブジェクトの配列」という意味。つまり記事データの配列が配列が返ってくる。
//   //async関数は必ずPromiseを返すので、Promise<型>をと書くべし。
//   const data = await client.get<{ contents: Blog[] }>({
//     //⬆︎<{ contents: Blog[] }>はジェネリクス(型を後から渡す仕組み)です。取得したdataのcontentsの型が『完全にBlog[]と定義されます。』
//     endpoint: 'blog', //'blog'はエンドポイント名。(MicroCMSのエンドポイントに書いている)
//     queries: {
//       fields: 'id,title,thumbnail,publishedAt', //fieldsは「"取得するデータの項目だけ"を指定するオプション。」投稿した記事の「id、タイトル、サムネイル画像、公開日」を取得する。
//       limit: 6, //最新の６件の記事を取得する。
//     },
//   });

//   console.log('記事一覧です:', data); //取得した「記事一覧」を一応console.logで確認。

//   return data.contents; //取得した記事一覧を返却する。contentsは「APIから取得した"contentsプロパティ(記事配列)"」
// }

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

  console.log('1件の記事詳細です:', data); //取得した「1件の記事詳細」を一応console.logで確認。『Server Component』なのでlogは「ブラウザではなくターミナル」に表示される。

  return data;
}

////「カテゴリボタン用のカテゴリ一覧」を取得
//使い所： 記事詳細ページ / 特定カテゴリの記事一覧を取得して表示する」ページ
//カテゴリをタグのように並べて表示するため。
//例：[Next.js] [React] [JavaScript]
export async function getCategory(categoryId: string): Promise<Category> {
  const data = await client.get<Category>({
    endpoint: 'categories', //どのAPIを使うか？ ➡️ microCMSの「categories API」を指定する。
    contentId: categoryId, //どのIDのデータを取得するか？
    //⬆︎microCMSのcategories APIに「取得したいカテゴリID(例: nd8f-tyyo4 = react)」を指定する。
    //つまり「"contentId"に categoryId(例:nd8f-tyyo4 = react) を指定して」そのIDのデータを取得する。
    //処理の流れ: getCategory("nd8f-tyyo4")
    //         ⬇︎
    //microCMS categories API
    //microcms/api/v1/categories/nd8f-tyyo4
    //         ⬇︎
    //カテゴリデータ1件取得
  });

  console.log('カテゴリボタン用のカテゴリ一覧です:', data); //「取得したカテゴリボタン用のカテゴリ一覧」をconsole.logで確認。

  return data; //取得した「カテゴリ一覧」を返却する。
}

////「ページネーション用の記事一覧(記事一覧表示でも使用可能 + 特定カテゴリの記事一覧」
//元々は『下に記載している⭐️「ページネーション用の記事一覧(記事一覧表示でも使用可能)」と⭐️「特定カテゴリの記事一覧」を取得 です。』
//使い所： [slug]/page.tsxの『特定カテゴリの記事一覧』に表示しているページネーション。
export async function getCategoryPagination(categoryId: string, page: number = 1, limit: number = 10): Promise<BlogListResponse> {
  //⬇︎offsetの意味は「記事の開始位置のこと。」➡️ 記事の何軒目を取得するか？ということ。
  //例えば「記事が1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...」こう存在するとする。
  //・下記の計算で1ページ目（limit = 10）だった場合 ➡️「offset = 0」だった場合は ➡️ 0件スキップして、1から10件取る。
  //・下記の計算で2ページ目（limit = 10）だった場合 ➡️➡️ 10件スキップして、11〜20を取得する。
  //・「引数pageと引数limit」は、『使用するgetPagination(page, limit)から渡されてくる。』
  const offset = (page - 1) * limit;

  const data = await client.get<BlogListResponse>({
    endpoint: 'blog',
    queries: {
      filters: `category[contains]${categoryId}`,
      //⬆︎microCMSに「フィルタ」を渡す。
      //categoryは、blog APIのフィールド名(category)
      //[contains]は「配列の中に指定したIDが含まれている」という意味。
      //${categoryId}は、比較する値（reactなど）
      //・つまり「category配列の中に categoryId = 例:react が含まれている記事」を取得する。
      limit, //記事を取得する。
      offset, //「記事の開始位置のこと。」
    },
  });

  console.log('特定カテゴリ + ページネーション対応の記事一覧:', data);

  return data;
}

////⭐️「ページネーション用の記事一覧(記事一覧表示でも使用可能)」を取得
//使い所： app/page.tsxの記事一覧に表示しているページネーション。
export async function getPagination(page: number = 1, limit: number = 10): Promise<BlogListResponse> {
  //⬇︎offsetの意味は「記事の開始位置のこと。」➡️ 記事の何軒目を取得するか？ということ。
  //例えば「記事が1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...」こう存在するとする。
  //・下記の計算で1ページ目（page = 1, limit = 10）だった場合 ➡️「offset = 0」だった場合は ➡️ 0件スキップして、1から10件取る。
  //・下記の計算で2ページ目（page = 2, limit = 10）だった場合 ➡️ 10件スキップして、11〜20を取得する。
  //・「引数pageと引数limit」は、『使用するgetPagination(page, limit)から渡されてくる。』
  const offset = (page - 1) * limit;

  const data = await client.get<BlogListResponse>({
    endpoint: 'blog',
    queries: {
      limit,
      offset,
    },
  });
  console.log('ページネーション:', data);
  return data;
}

// ////⭐️「特定カテゴリの記事一覧」を取得
// //使い所：カテゴリページ(category/[slug].page.tsx)で使用する。
// //microCMSから「指定したカテゴリIDに属する記事一覧」を取得する。
// export async function getCategoryPosts(categoryId: string): Promise<Blog[]> {
//   //⬆︎URL: category/[slug]から "ReactカテゴリやNext.jsカテゴリ"を受け取る関数です。
//   //①URLを叩いて[slug]を取得　➡️ URL:/category/例:react　➡️ [slug] = "例:reactカテゴリ"になる。
//   //②[slug]/page.tsxのgetCategoryPosts(slug)から、上記のgetCategoryPosts(categoryId: string)に渡ってきます。 ➡️ ここでcategoryId = "例:react"になります。
//   //③microCMSに「フィルタ」を渡す。 ➡️ filters: `category[contains]${categoryId}`, ➡️ つまりcategory[contains]例:react ➡️ microCMSは「categoryに例:reactが含まれている記事だけ」を返す。
//   //④結果として「category/[slug]/page.tsx で記事一覧として表示します。」
//   const data = await client.get<{ contents: Blog[] }>({
//     endpoint: 'blog',
//     queries: {
//       filters: `category[contains]${categoryId}`,
//       //⬆︎③microCMSに「フィルタ」を渡す。
//       //categoryは、blog APIのフィールド名(category)
//       //[contains]は「配列の中に指定したIDが含まれている」という意味。
//       //${categoryId}は、比較する値（reactなど）
//       //・つまり「category配列の中に categoryId = 例:react が含まれている記事」を取得する。
//       fields: 'id,title,thumbnail,publishedAt,category',
//       limit: 100,
//     },
//   });
//   console.log('特定カテゴリの記事一覧です:', data); //「取得した特定カテゴリの記事一覧」をconsole.logで確認。
//   return data.contents;
// }
