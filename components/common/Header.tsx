'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './LayoutPrimitives';

const HeaderWrap = styled.header`
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: var(--header-height);
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: #000;

  z-index: 1000;
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
    color: #000;

    &.is-active {
      font-weight: bold;
    }
    &.is-active::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -2px;
      width: 100%;
      height: 2.5px;
      /* background-color: #000; */
    }
  }
`;
//メモ:import { Inner }を上書きして使用できます。
const HeaderInner = styled(Inner)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--layout-padding);
`;

export const Header = () => {
  return (
    <HeaderWrap>
      <Wrapper>
        <HeaderInner>
          <div className='logo'>
            <Link href='/'>
              <h1 className='mb-0 font-bold text-[1.3rem] md:text-[1.5rem]'>MY BLOG</h1>
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
