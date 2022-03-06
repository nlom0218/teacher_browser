import React from 'react';
import { FcAdvertising, FcAreaChart, FcCursor, FcLike } from 'react-icons/fc';
import styled from 'styled-components';
import { color, customMedia } from '../../styles';
import { SiNotion } from "react-icons/si"
import useMedia from '../../Hooks/useMedia';

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

const Title = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  .title_notion {
    justify-self: flex-end;
    cursor: pointer;
    font-size: 0.9em;
    font-size: 0.9rem;
    font-weight: 400;
    svg {
      font-size: 1em;
      font-size: 1rem;
    }
  }
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr auto;
  `}
`

const TitleLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  font-weight: 600;
  font-size: 1.1em;
  font-size: 1.1rem;
  svg {
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`

const Layout = styled.div`
  min-height: 210px;
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.theme.originBgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-template-rows: repeat(5, 1fr);
`

const ContentsContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const ContentsItem = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  align-self: flex-start;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${props => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
`

const TTTitle = styled.div`
  padding: 20px;
  font-weight: 900;
  font-size: 2em;
  line-height: 180%;
  text-align: flex-end;
  text-shadow: 1px 1px 1px ${props => props.theme.originBgColor};
  transition: text-shadow 1s ease;
`

const WelcomeContents = () => {
  const media = useMedia()
  return (<Container>
    <ContentsContainer>
      <Title>
        <TitleLayout><FcAdvertising /><div>최근 공지사항</div></TitleLayout>
        <TitleLayout className="title_notion" onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/d8d13d9d93ab4026bef0c440ada24292")}><SiNotion /><div>노션에서 더 보기</div></TitleLayout>
      </Title>
      <Layout>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-3-6-8a5cad61d1a745859c38a870f86918ad")}><FcCursor /><div>22.3.6. 공지사항</div></ContentsItem>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-3-1-51a53ce9f6f84433b27fce1e1041f15e")}><FcCursor /><div>22.3.1. 공지사항</div></ContentsItem>
      </Layout>
    </ContentsContainer>
    <ContentsContainer>
      <Title>
        <TitleLayout><FcLike /><div>진행중인 이벤트</div></TitleLayout>
        <TitleLayout className="title_notion" onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/1aa6fc8d7ec1492a8a24890ca1907549")}><SiNotion /><div>노션에서 더 보기</div></TitleLayout>
      </Title>
      <Layout>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/522744f7087644538dbf8d3d19eb5eca")}><FcCursor /><div>티처캔 캐릭터 이름 공모 이벤트(~3.31)</div></ContentsItem>
      </Layout>
    </ContentsContainer>
    <ContentsContainer>
      <Title>
        <TitleLayout><FcAreaChart /><div>진행중인 업데이트 및 오류해결</div></TitleLayout>
        <TitleLayout className="title_notion" onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/a5b56d8122f444cd9e372674f57724b2")}><SiNotion /><div>노션에서 더 보기</div></TitleLayout>
      </Title>
      <Layout>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-2-27-0d3b660e9d5849dfabcc301ef3ec4d1e")}><FcCursor /><div>랜덤뽑기 뽑힌 학생 제외 기능</div></ContentsItem>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-2-28-5529895b4b324f1d9134734644a44e23")}><FcCursor /><div>자리정하기에서 남녀 기능 추가</div></ContentsItem>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-3-3-61d3d415dec8429489de22fbf288cdb0")}><FcCursor /><div>명렬표 인쇄 기능 추가</div></ContentsItem>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-3-6-b896a3ad47544036a42e64280ab28b0b")}><FcCursor /><div>상단메뉴 이름 표시하기</div></ContentsItem>
        <ContentsItem onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/22-3-6-0e26df5e82894d89b7e99e64422c6f03")}><FcCursor /><div>랜덤뽑기 반응형 업데이트</div></ContentsItem>
      </Layout>
    </ContentsContainer>
    {/* <ContentsContainer>
      <TTTitle>티처캔은 선생님들의 업무와 수업을{media === "Desktop" && <br />} 도움으로써 행복한 학교생활을{media === "Desktop" && <br />} 응원합니다!</TTTitle>
    </ContentsContainer> */}
  </Container>);
}

export default WelcomeContents;