import React from "react";
import styled from "styled-components";
import DDayContents from "./DDAYContents";
import LinkContents from "./LinkContents";

const Container = styled.div``;

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
