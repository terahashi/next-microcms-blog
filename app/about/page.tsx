////Aboutページ

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { breakpoints } from '@/styles/breakpoints';

//コンポーネント
import { Wrapper, PageInner } from '@/components/common/LayoutPrimitives';

////ArticleHeader(絵文字、日時、タイトル)
const About_Header = styled.div`
  margin-top: 70px;
  margin-bottom: 50px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-top: 70px;
    margin-bottom: 50px;
  }
`;

////Container
const About_Header_Container = styled.div`
  margin-bottom: 20px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-bottom: 20px;
  }
`;

const About_Profile_Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #3b3151;
  }
  @media screen and (min-width: ${breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
  }
`;

const About_Profile_title = styled.h1`
  max-width: 780px;
  margin: 20px auto 0;
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

const About_Body_Container = styled.div`
  max-width: 780px;
  margin: 0 auto 70px;
  padding: 20px 0px;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin: 0 auto 70px;
    padding: 50px 40px;
  }
`;

const About_Text = styled.div`
  margin: 0 auto 40px;
`;

const About_Link = styled(Link)`
  text-decoration: none;
  color: #cf5eff;
  font-weight: bold;
  transition: color 0.2s ease;
  &:hover {
    color: #cf5eff;
    font-weight: bold;
    text-decoration: underline;
  }
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <PageInner>
        <main>
          <About_Header>
            <About_Header_Container>
              <About_Profile_Image>
                <Image src='/images/neko.jpg' alt='プロフィール画像' width={150} height={150} />
              </About_Profile_Image>

              <About_Profile_title className='title__ja'>高橋 / tuyu kuji</About_Profile_title>
            </About_Header_Container>
            <About_Body_Container>
              <About_Text>
                <h2 className='font-bold text-[1.1rem]'>このブログを運営している 高橋 です。</h2>
                <p className=''>インターネット上では tuyu kuji 名義で活動しています。</p>
              </About_Text>

              <About_Text>
                <h2 className='font-bold text-[1.1rem]'>このブログについて</h2>
                <p>
                  学習した内容のアウトプットとして記事を投稿しています。
                  <br />
                  現在はNext.jsやReact、TypeScriptなどを積極的に学習しています。
                  <br />
                  今後はAWSやバックエンドの知見も深めていきたいと思っています。
                </p>
              </About_Text>

              <About_Text>
                <h2 className='font-bold text-[1.1rem]'>技術スタック</h2>
                <ul className='list-disc pl-5'>
                  <li>Next.js</li>
                  <li>React</li>
                  <li>TypeScript</li>
                </ul>
              </About_Text>

              <About_Text>
                <h2 className='font-bold text-[1.1rem]'>リンク</h2>
                <ul className='list-disc pl-5'>
                  <li>
                    <About_Link href='https://github.com/terahashi?tab=repositories' target='_blank' rel='noopener noreferrer'>
                      GitHub
                    </About_Link>
                  </li>
                  <li>
                    <About_Link href='https://qiita.com/tuyukuzi' target='_blank' rel='noopener noreferrer'>
                      Qiita
                    </About_Link>
                  </li>
                </ul>
              </About_Text>
            </About_Body_Container>
          </About_Header>
        </main>
      </PageInner>
    </Wrapper>
  );
}

////SEO設定(このページ専用)
export const metadata = {
  title: 'About', //このページのタイトル
  description: 'DevLogを運営。Next.jsやReactを中心に学習内容を発信しています。', //このページの説明
};
