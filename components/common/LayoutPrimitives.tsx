//「Wrapper」や「Inner」を部品化して 全てのtSXファイルで使えるようにするためのもの。

'use client';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

//Wrapper
const Wrapper = styled.div`
  padding-top: clamp(16px, 4vw, 24px);
  padding-bottom: clamp(16px, 4vw, 24px);
  padding-left: clamp(16px, 4vw, 32px);
  padding-right: clamp(16px, 4vw, 32px);
`;

//Inner
const Inner = styled.div`
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
`;

export { Wrapper, Inner };
