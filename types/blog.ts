//typesフォルダ/blog.ts
//「型ファイル」を分離したファイル

////「TypeScript」ブログ記事の型エイリアスを定義する。
//export type Blogで「名前付きエクスポート」
export type Blog = {
  id: string; //記事ID
  title: string; //記事タイトル
  thumbnail: {
    url: string; //サムネイル画像URL
  };
  publishedAt: string; //投稿日時
};
