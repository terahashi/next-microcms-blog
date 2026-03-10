//まずは「①javaScriptで作成。②その後TypeScriptに書き換えてみる。」理由としては『TypeScriptのトレーニング。』
import Image from 'next/image';
import { client } from '../libs/client';

////「記事一覧」を取得
//SSG(静的生成)を使ってデータを取得します。
//なぜSSG(静的生成)を使う？➡︎『microCMS APIをビルド時に取得し、Next.jsでHTMLを生成するから』です。

////トップページ
export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans '>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div>sss</div>
      </main>
    </div>
  );
}
