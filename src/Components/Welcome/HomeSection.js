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
`;

const HomeSection = ({
  dDay,
  userEmail,
  isMoveDDay,
  setMsg,
  setErrMsg,
  links,
  userId,
}) => {
  const media = useMedia();
  return (
    <Container>
      <DDayContents
        dDay={dDay}
        userEmail={userEmail}
        isMoveDDay={isMoveDDay}
        setMsg={setMsg}
        setErrMsg={setErrMsg}
      />
      {media !== "Mobile" && (
        <LinkContents
          links={links}
          setMsg={setMsg}
          setErrMsg={setErrMsg}
          userEmail={userEmail}
          userId={userId}
        />
      )}
    </Container>
  );
};

export default HomeSection;
