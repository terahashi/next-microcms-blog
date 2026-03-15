//typesフォルダ/blog.ts
//「型ファイル」を分離したファイル

////「TypeScript」ブログ記事の型エイリアスを定義する。
//export type Blogで「名前付きエクスポート」
//「Blog型」の定義
export type Blog = {
  id: string; //記事ID
  title: string; //記事タイトル
  body: string; //記事の本文
  thumbnail?: {
    url: string; //サムネイル画像URL
  };
  publishedAt: string; //投稿日時

  //⬇︎カテゴリー
  category: {
    id: string;
    name: string;
  }[];
};

//(カテゴリ一覧で使う)「Category型」の定義
export type Category = {
  id: string;
  name: string;
};
