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
  border-bottom: 1px solid var(--border-ligner);
  z-index: 1000;
  background-color: #130e30;

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
    color: #fff;

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
      background-color: #ffffff;
    }
  }
`;

const NavWrapper = styled(Wrapper)`
  padding-top: 0;
  padding-bottom: 0;
`;

export const Nav = () => {
  //⬇︎usePathname()で現在のルートのパス名を文字列として取得
  const pathname = usePathname();

  return (
    <NavWrap>
      <NavWrapper>
        <Inner>
          <div className='pc-menu gap-x-4 md:gap-x-7'>
            <Link href='/' className={clsx('pt-[10px] pb-[10px] p-[0px]', pathname === '/' && 'is-active')}>
              Top
            </Link>
            <Link href='/about' className={clsx('pt-[10px] pb-[10px] p-[0px]', pathname === '/about' && 'is-active')}>
              About
            </Link>
          </div>
        </Inner>
      </NavWrapper>
    </NavWrap>
  );
};
