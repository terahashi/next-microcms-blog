'use client'; //styled-componentsを使うために必要。

import Link from 'next/link';
import styled from 'styled-components';
import { Wrapper, Inner } from './LayoutPrimitives';

//⭐️「アクティブリンク」で現在いるページのリンクに「.is-activeクラス」を付与する。
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavWrap = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: #000;
  z-index: 1000;

  .pc-menu {
    display: flex;
    justify-content: flex-start;
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
//import { Inner }を上書きして使用できます。
const NavInner = styled(Inner)`
  padding: 10px var(--layout-padding);
`;

export const Nav = () => {
  //⬇︎usePathname()で現在のルートのパス名を文字列として取得
  const pathname = usePathname();

  return (
    <NavWrap>
      <Wrapper>
        <NavInner>
          <div className='pc-menu gap-x-4 md:gap-x-7'>
            <Link href='/' className={clsx(pathname === '/' && 'is-active')}>
              Top
            </Link>
            <Link href='/about' className={clsx(pathname === '/about' && 'is-active')}>
              About
            </Link>
          </div>
        </NavInner>
      </Wrapper>
    </NavWrap>
  );
};
