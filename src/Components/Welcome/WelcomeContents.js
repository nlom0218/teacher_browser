import React from "react";
import { FcAdvertising, FcAreaChart, FcCursor, FcLike } from "react-icons/fc";
import styled from "styled-components";
import { color, customMedia } from "../../styles";
import { SiNotion } from "react-icons/si";
import useMedia from "../../Hooks/useMedia";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`;

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
`;

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
`;

const Layout = styled.div`
  min-height: 210px;
  padding: 10px;
  padding: 0.625rem;
  background-color: ${(props) => props.theme.originBgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-template-rows: repeat(5, 1fr);
`;

const ContentsContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

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
    background-color: ${(props) => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
`;

const TTTitle = styled.div`
  padding: 20px;
  font-weight: 900;
  font-size: 2em;
  line-height: 180%;
  text-align: flex-end;
  text-shadow: 1px 1px 1px ${(props) => props.theme.originBgColor};
  transition: text-shadow 1s ease;
`;

const UpdateMsg = styled.div`
  justify-self: center;
  grid-row: 1 / -1;
  display: flex;
  align-items: center;
`;

const WelcomeContents = () => {
  const media = useMedia();
  return (
    <Container>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcAdvertising />
            <div>최근 공지사항</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/d8d13d9d93ab4026bef0c440ada24292")}
          >
            <SiNotion />
            <div>노션에서 더 보기</div>
          </TitleLayout>
        </Title>
        <Layout>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/23-3-2-4ea1ea7248594b959018faca5c5be88b")
            }
          >
            <FcCursor />
            <div>23.3.2 공지사항</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-12-12-bbb606b309044843b92bd471a3122897")
            }
          >
            <FcCursor />
            <div>22.12.12 공지사항</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-10-5-a981f9de14c0456fa20d8791cf22a5eb")
            }
          >
            <FcCursor />
            <div>22.10.5 공지사항</div>
          </ContentsItem>
          <ContentsItem onClick={() => window.open("https://www.notion.so/22-9-17-965f0c04c3b54c56a30b8eb2e7c0ab26")}>
            <FcCursor />
            <div>22.9.17 공지사항</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-6-12-c5087b5e768a4527a8b64d69bd96addd")
            }
          >
            <FcCursor />
            <div>22.6.12 공지사항</div>
          </ContentsItem>
        </Layout>
      </ContentsContainer>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcLike />
            <div>진행중인 이벤트</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/1aa6fc8d7ec1492a8a24890ca1907549")}
          >
            <SiNotion />
            <div>노션에서 더 보기</div>
          </TitleLayout>
        </Title>
        <Layout>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/12-31-69007a0ec7d9440984601de395fefa11")
            }
          >
            <FcCursor />
            <div>크리스마스 소원 나무 이벤트(~12.31)</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/5-31-c25d5524210048a084830b8dab049187")
            }
          >
            <FcCursor />
            <div>가정의 달 이벤트(~5.31)</div>
          </ContentsItem>
          <ContentsItem
            onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/92792b7124f9455faa264f73778f0d58")}
          >
            <FcCursor />
            <div>티처캔 캐릭터 이름 공모 이벤트 결과 안내</div>
          </ContentsItem>
          <ContentsItem
            onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/522744f7087644538dbf8d3d19eb5eca")}
          >
            <FcCursor />
            <div>티처캔 캐릭터 이름 공모 이벤트(~3.31)</div>
          </ContentsItem>
        </Layout>
      </ContentsContainer>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcAreaChart />
            <div>앞으로의 업데이트 내용</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() => window.open("https://sparkly-corleggy-3e4.notion.site/a5b56d8122f444cd9e372674f57724b2")}
          >
            <SiNotion />
            <div>노션에서 더 보기</div>
          </TitleLayout>
        </Title>
        <Layout>
          <UpdateMsg>새로운 내용으로 찾아뵙겠습니다.😋</UpdateMsg>
          {/* <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-3-16-f321120bf0494d0b8ecb1915f0ff4cfd")
            }
          >
            <FcCursor />
            <div>작품 전시(페이지 이름 미정)</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-3-27-ec408ce41a18490c980060d506ebadde")
            }
          >
            <FcCursor />
            <div>출결 페이지</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-4-10-f4e4c1d714814e0faacd7180a2bb96d1")
            }
          >
            <FcCursor />
            <div>배경화면만 보이기</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-4-14-c0f1ca03a60b44b59d276b0533330a57")
            }
          >
            <FcCursor />
            <div>시간표에서 출판사로 이동 추가</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open("https://sparkly-corleggy-3e4.notion.site/22-5-15-1-1-1f81191418164ae8af6dbb99c98a35a1")
            }
          >
            <FcCursor />
            <div>1인1역 페이지</div>
          </ContentsItem> */}
        </Layout>
      </ContentsContainer>
      {/* <ContentsContainer>
      <TTTitle>티처캔은 선생님들의 업무와 수업을{media === "Desktop" && <br />} 도움으로써 행복한 학교생활을{media === "Desktop" && <br />} 응원합니다!</TTTitle>
    </ContentsContainer> */}
    </Container>
  );
};

export default WelcomeContents;
