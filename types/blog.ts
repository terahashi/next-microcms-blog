//typesフォルダ/blog.ts
//「型ファイル」を分離したファイル
//「TypeScript」ブログ記事の型エイリアスを定義する。
//export type Blogで「名前付きエクスポート」

////「Blog型」の定義
export type Blog = {
  id: string; //記事ID
  title: string; //記事タイトル
  body: string; //記事の本文
  thumbnail?: {
    url: string; //サムネイル画像URL
  };
  publishedAt: string; //投稿日時
  category: Category[]; //カテゴリー。下で書いた「Categoryを再利用（参照）」
  emoji: string; //絵文字
};
//Blog型（1記事）の中身
// {
//   id: "1",
//   title: "記事タイトル",
//   body: "本文..."
// }

//Blog[]型（配列）の中身
// [
//   { id: "1", title: "...", body: "..." },
//   { id: "2", title: "...", body: "..." }
// ]

////(カテゴリ一覧で使う)「Category型」の定義
export type Category = {
  id: string;
  name: string;
};

////「ページネーション用」の型定義
export type BlogListResponse = {
  contents: Blog[]; //Blogを再利用（参照）
  totalCount: number;
  limit: number;
  offset: number;
};

//BlogListResponse（APIレスポンス）の中身
// {
//   contents: [
//     { id: "1", title: "...", body: "..." },
//     { id: "2", title: "...", body: "..." }
//   ],
//   totalCount: 100,
//   limit: 10,
//   offset: 0
// }
