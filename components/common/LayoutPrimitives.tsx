//「Wrapper」や「Inner」を部品化して 全てのtSXファイルで使えるようにするためのもの。

'use client';
import styled from 'styled-components';

//Wrapper
const Wrapper = styled.div`
  padding-top: clamp(16px, 4vw, 24px);
  padding-bottom: clamp(16px, 4vw, 24px);
  padding-left: clamp(16px, 4vw, 32px);
  padding-right: clamp(16px, 4vw, 32px);
`;

//Inner(max-width: 1280px)
const Inner = styled.div`
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
`;

//PageWrapper(max-width: 960px)
const PageInner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: var(--article-layout-max-width);
`;

export { Wrapper, Inner, PageInner };
