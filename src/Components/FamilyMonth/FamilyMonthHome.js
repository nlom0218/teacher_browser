import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { isFullScreenModeVar } from "../../apollo";
import { customMedia } from "../../styles";
import mainImg from "./image/main.png";

const Container = styled.div`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  max-width: 80%;
  min-width: 80%;
  ${customMedia.greaterThan(`desktop`)`
    max-width: ${(props) => (props.isfullScreenMode ? "40%" : "60%")};
    min-width: ${(props) => (props.isfullScreenMode ? "40%" : "60%")};
  `}
`;

const ImgContainer = styled.img`
  width: 100%;
`;

const FamilyMonthHome = () => {
  const isfullScreenMode = useReactiveVar(isFullScreenModeVar);
  return (
    <Container isfullScreenMode={isfullScreenMode}>
      <ImgContainer src={mainImg} />
    </Container>
  );
};

export default FamilyMonthHome;
