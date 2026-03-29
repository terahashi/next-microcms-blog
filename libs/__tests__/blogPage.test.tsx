////このファイルは「[id]/page.tsx」の『記事詳細ページ』のテストです。
//「結合テスト」です。
import { render, screen } from '@testing-library/react';

////1: microCMSをモックでダミー化。(環境変数エラー回避)
//『microcms.tsが一切実行されないようにするため』にモック化してダミーのクライアントを返すようにする。
jest.mock('@/libs/microcms', () => ({
  client: {
    get: jest.fn(), //getメソッドをモック化する。
    getAllContentIds: jest.fn(), //getAllContentIdsメソッドもモック化する。
  },
}));

////2:「@/libs/blog」モック化する。
//つまり「getBlogPost」のこと。
jest.mock('@/libs/blog');

//「⬇︎のimport」は「⬆︎のmockの後」に書く必要があります。➡️ ⭐️import時点で「ファイルが実行される」のを防ぐためです。
import BlogPostPage from '@/app/blog/[id]/page';
import { getBlogPost } from '@/libs/blog';

////3:テストケースを作成する。
describe('記事ページ(API + UI)テスト', () => {
  it('記事データが取得され、画面に表示されるか？', async () => {
    ////①モック(mockData)を作成する。
    const mockData = {
      id: '123',
      title: 'テスト記事',
      body: '<p>テスト本文</p>',
      description: 'テスト説明',
      thumbnail: { url: 'https://example.com/image.jpg' },
      publishedAt: '2026-01-01',
      category: [{ id: 'cat1', name: 'React' }],
      emoji: '🍎',
    };

    ////②getBlogPost(API)をモック化する。mockResolvedValueメソッドを使用して「①mockData = ダミーの記事データ」を返すようにする。
    //mockResolvedValueメソッドで「モック化したgetBlogPost関数が呼び出された時に『①mockDataを解決値として返す。』」
    (getBlogPost as jest.Mock).mockResolvedValue(mockData);

    ////③BlogPostPageを実行。
    const Page = await BlogPostPage({
      params: Promise.resolve({ id: '123' }),
    });

    ////④renderで描画する。
    render(Page);

    ////⑤確認する。
    //「screen.getByText」で　'テスト記事'　'🍎'　'React'　というテキストが『画面に表示されているかを確認する。』
    expect(screen.getByText('テスト記事')).toBeInTheDocument();
    expect(screen.getByText('🍎')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
