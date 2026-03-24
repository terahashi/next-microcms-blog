'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './LayoutPrimitives';

const HeaderWrap = styled.header`
  /* height: var(--header-height); */
  width: 100%;
  z-index: 1000;
  background-color: #130e30;
  .logo {
    position: relative;
  }
  .pc-menu {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }
  a {
    font-size: 1.1rem;
    position: relative; //::after用に必須
    color: #fff;
  }
`;

const HeaderInner = styled(Inner)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Header = () => {
  return (
    <HeaderWrap>
      <Wrapper>
        <HeaderInner>
          <div className='logo'>
            <Link href='/'>
              <h1 className='mb-0 font-bold text-[1.7rem] md:text-[2.5rem]'>DevLog</h1>
            </Link>
          </div>

          {/* <div className='pc-menu gap-x-4 md:gap-x-7'>
            <Link href='/gallery'>About</Link>
          </div> */}
        </HeaderInner>
      </Wrapper>
    </HeaderWrap>
  );
};
