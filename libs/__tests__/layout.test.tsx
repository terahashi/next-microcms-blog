//トップページの表示テスト「layout.tsxが children を表示しているか？」を確認する。

////1:各種コンポーネントを「モック化」する。
//「Headerをモック化」
jest.mock('@/components/common/Header', () => ({
  Header: () => <div data-testid='header'>Header</div>,
}));

//「Footerををモック化」
jest.mock('@/components/common/Footer', () => ({
  Footer: () => <div data-testid='footer'>Footer</div>,
}));

//「Navをモック化」
jest.mock('@/components/common/Nav', () => ({
  Nav: () => <div data-testid='nav'>Nav</div>,
}));

//「StyledComponentsRegistry」をモック化。
jest.mock('@/libs/styled-components-registry', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

//「⬇︎のimport」は「⬆︎のmockの後」に書く必要があります。➡️ ⭐️import時点で「ファイルが実行される」のを防ぐためです。
import { render, screen } from '@testing-library/react';
import RootLayout from '@/app/layout';

////2:テストケースを作成する。
describe('RootLayoutのテスト', () => {
  test('childrenが正しく表示されるか？', () => {
    render(
      <RootLayout>
        <div>テストコンテンツ</div>
      </RootLayout>,
    );

    expect(screen.getByText('テストコンテンツ')).toBeInTheDocument();
  });

  test('Header / Nav / Footer が表示されるか？', () => {
    render(
      <RootLayout>
        <div>テスト</div>
      </RootLayout>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
