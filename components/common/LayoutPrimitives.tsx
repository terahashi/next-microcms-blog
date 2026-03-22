//「Wrapper」や「Inner」を部品化して 全てのtSXファイルで使えるようにするためのもの。

'use client';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

//ページ全体コンテナ
const PageContainer = styled.div`
  padding-top: var(--header-height);
  min-height: unset;

  /* @media screen and (min-width: ${breakpoints.tablet}) {
    min-height: 100dvh;
  } */
`;

//Wrapper
const Wrapper = styled.div`
  padding-left: clamp(16px, 4vw, 32px);
  padding-right: clamp(16px, 4vw, 32px);
`;

//Inner
const Inner = styled.div`
  width: 100%;
  max-width: var(--layout-max-width);
  padding-inline: var(--layout-padding);
  margin: 0 auto;
`;

export { PageContainer, Wrapper, Inner };
