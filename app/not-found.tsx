//404ページ
export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#130e30] text-white px-4'>
      {/* 404 */}
      <h1 className='text-6xl font-bold mb-4'>404</h1>

      {/* メッセージ */}
      <p className='text-lg mb-6 text-gray-400 text-center'>お探しのページは見つかりませんでした。</p>

      {/* トップへ戻る */}
      <a href='/' className='font-bold px-6 py-3 bg-[#6c63ff] rounded-lg hover:opacity-80 transition'>
        トップへ戻る
      </a>
    </div>
  );
}
