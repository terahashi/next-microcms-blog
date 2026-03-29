//単体テスト

////1:microCMSを「モック化」する。
//microcmsのAPIを『ダミー(モック)』として作成して『実際のAPIを呼び出さないでテストできる。』
jest.mock('@/libs/microcms', () => ({
  client: {
    get: jest.fn(),
  },
}));

//「⬇︎のimport」は「⬆︎のmockの後」に書く必要があります。➡️ ⭐️import時点で「ファイルが実行される」のを防ぐためです。
import { getBlogPost } from '@/libs/blog';
import { client } from '@/libs/microcms';

////2:テストケースを作成する。
describe('getBlogPost(API)をテストする', () => {
  test('APIから記事データを取得できるか？', async () => {
    ////①ダミーの記事データを作成する。
    const mockBlogData = {
      id: '123',
      title: 'テスト記事',
      body: 'テストの本文です',
      description: 'テストのdescriptionです',
      thumbnail: { url: 'https://example.com/image.jpg' },
      publishedAt: '2026-01-01',
      category: [],
      emoji: '🍎',
    };

    ////②APIをダミーにする。
    //client.getをモック化する。mockResolvedValueメソッドを使用して「①mockBlogData = ダミーの記事データ」を返すようにする。
    //mockResolvedValueメソッドで「モック化したclient.get関数が呼び出された時に『①mockBlogDataを解決値として返す。』」
    (client.get as jest.Mock).mockResolvedValue(mockBlogData);

    ////③実行する。
    //getBlogPost関数を呼び出す。引数は「記事ID(例:123)」
    const result = await getBlogPost('123');

    ////④確認する。
    //④-1:出力のテスト(外側)
    //この関数は「データの結果」が正しいかを確認する。
    //toEqualで「③のconst resultの結果」が『①のmockBlogDataと等しいか？』を確認する。
    expect(result).toEqual(mockBlogData);

    //④-2:内部処理のテスト(内側)
    //この関数は「処理の中身」が正しいか？を確認する。
    //client.get関数が呼び出されたときに、引数(endpoint: 'blog', contentId: '123')が『APIとして正しく渡されたかを確認する。』
    expect(client.get).toHaveBeenCalledWith({
      //toHaveBeenCalledWithとは「関数(client.get関数)が、その引数で呼ばれたか？」をチェックするメソッド。
      //つまり、toHaveBeenCalledWith(A); は『(A)という引数で関数が呼び出されたか？』を確認する。
      endpoint: 'blog',
      contentId: '123',
    });
  });
});
