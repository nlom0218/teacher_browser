import React from "react";
import styled from "styled-components";
import useMedia from "../../Hooks/useMedia";
import { customMedia } from "../../styles";
import DDayContents from "./DDAYContents";
import LinkContents from "./LinkContents";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-rows: 1fr 1fr;
  `}
  position: relative;
`;

const Error = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${(props) => props.theme.redColor};
  font-weight: 700;
  span {
    margin: 0px 10px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const HomeSection = ({ dDay, userEmail, isMoveDDay, setMsg, setErrMsg, links, setLinks, userId }) => {
  const media = useMedia();

  const onClickErrorMsg = () => {
    window.open("https://sparkly-corleggy-3e4.notion.site/23-4-3-8e84540280514b2b89c269872acb7049");
  };

  return (
    <Container>
      <DDayContents
        dDay={dDay}
        userEmail={userEmail}
        isMoveDDay={isMoveDDay}
        setMsg={setMsg}
        setErrMsg={setErrMsg}
        userId={userId}
      />
      {media !== "Mobile" && (
        <LinkContents
          links={links}
          setLinks={setLinks}
          setMsg={setMsg}
          setErrMsg={setErrMsg}
          userEmail={userEmail}
          userId={userId}
        />
      )}
      <Error>
        학생 관련 데이터 오류에 대한 공지사항입니다.
        <span onClick={onClickErrorMsg}>공지 확인하기</span>
        불편을 드려 죄송합니다.
      </Error>
    </Container>
  );
};

export default HomeSection;
