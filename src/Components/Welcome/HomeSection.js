import React from "react";
import styled from "styled-components";
import DDayContents from "./DDAYContents";
import LinkContents from "./LinkContents";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const HomeSection = ({ dDay, userEmail, isMoveDDay, setMsg, setErrMsg }) => {
  return (
    <Container>
      <DDayContents
        dDay={dDay}
        userEmail={userEmail}
        isMoveDDay={isMoveDDay}
        setMsg={setMsg}
        setErrMsg={setErrMsg}
      />
      <LinkContents />
    </Container>
  );
};

export default HomeSection;
