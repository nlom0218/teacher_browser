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

const WelcomeContents = () => {
  const media = useMedia();
  return (
    <Container>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcAdvertising />
            <div>?????? ????????????</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/d8d13d9d93ab4026bef0c440ada24292"
              )
            }
          >
            <SiNotion />
            <div>???????????? ??? ??????</div>
          </TitleLayout>
        </Title>
        <Layout>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-6-12-c5087b5e768a4527a8b64d69bd96addd"
              )
            }
          >
            <FcCursor />
            <div>22.6.12 ????????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-5-29-51ae79a702d8481c8232ff44130a0fac"
              )
            }
          >
            <FcCursor />
            <div>22.5.29 ????????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-5-1-82e3b526ac1e4c5ab69b5d0d79cb1354"
              )
            }
          >
            <FcCursor />
            <div>22.5.1 ????????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-4-17-7658f4a3675d454bb6ca10c1e8087a0d"
              )
            }
          >
            <FcCursor />
            <div>22.4.17 ????????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-4-10-671eb8757867429081ca91dc904ceff5"
              )
            }
          >
            <FcCursor />
            <div>22.4.10 ????????????</div>
          </ContentsItem>
        </Layout>
      </ContentsContainer>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcLike />
            <div>???????????? ?????????</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/1aa6fc8d7ec1492a8a24890ca1907549"
              )
            }
          >
            <SiNotion />
            <div>???????????? ??? ??????</div>
          </TitleLayout>
        </Title>
        <Layout>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/5-31-c25d5524210048a084830b8dab049187"
              )
            }
          >
            <FcCursor />
            <div>????????? ??? ?????????(~5.31)</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/92792b7124f9455faa264f73778f0d58"
              )
            }
          >
            <FcCursor />
            <div>????????? ????????? ?????? ?????? ????????? ?????? ??????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/522744f7087644538dbf8d3d19eb5eca"
              )
            }
          >
            <FcCursor />
            <div>????????? ????????? ?????? ?????? ?????????(~3.31)</div>
          </ContentsItem>
        </Layout>
      </ContentsContainer>
      <ContentsContainer>
        <Title>
          <TitleLayout>
            <FcAreaChart />
            <div>???????????? ???????????? ??? ????????????</div>
          </TitleLayout>
          <TitleLayout
            className="title_notion"
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/a5b56d8122f444cd9e372674f57724b2"
              )
            }
          >
            <SiNotion />
            <div>???????????? ??? ??????</div>
          </TitleLayout>
        </Title>
        <Layout>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-3-16-f321120bf0494d0b8ecb1915f0ff4cfd"
              )
            }
          >
            <FcCursor />
            <div>?????? ??????(????????? ?????? ??????)</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-3-27-ec408ce41a18490c980060d506ebadde"
              )
            }
          >
            <FcCursor />
            <div>?????? ?????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-4-10-f4e4c1d714814e0faacd7180a2bb96d1"
              )
            }
          >
            <FcCursor />
            <div>??????????????? ?????????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-4-14-c0f1ca03a60b44b59d276b0533330a57"
              )
            }
          >
            <FcCursor />
            <div>??????????????? ???????????? ?????? ??????</div>
          </ContentsItem>
          <ContentsItem
            onClick={() =>
              window.open(
                "https://sparkly-corleggy-3e4.notion.site/22-5-15-1-1-1f81191418164ae8af6dbb99c98a35a1"
              )
            }
          >
            <FcCursor />
            <div>1???1??? ?????????</div>
          </ContentsItem>
        </Layout>
      </ContentsContainer>
      {/* <ContentsContainer>
      <TTTitle>???????????? ??????????????? ????????? ?????????{media === "Desktop" && <br />} ??????????????? ????????? ???????????????{media === "Desktop" && <br />} ???????????????!</TTTitle>
    </ContentsContainer> */}
    </Container>
  );
};

export default WelcomeContents;
