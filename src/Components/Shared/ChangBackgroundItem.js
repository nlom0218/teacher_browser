import React from "react";
import styled, { keyframes } from "styled-components";

const bgDownAni = keyframes`
  0% {
    top: -100%;
    bottom: 100%;
  }
  40% {
    top: 0;
    bottom: 0;
  }
  60% {
    top: 0;
    bottom: 15px;
  }
  80% {
    top: 0;
    bottom: 0;
  }
  90%{
    top: 0;
    bottom: 5px;
  }
  100% {
    top: 0;
    bottom: 0;
  }
`;

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  background: ${(props) => props.color};
  background-size: cover;
  background-position: center;
  animation: ${(props) => props.bgThemeAni && bgDownAni} 2s ease forwards;
`;

const ChangBackgroundItem = ({ color, userBgTheme, bgThemeAni }) => {
  return (
    <React.Fragment>
      {userBgTheme === color && <Container color={color} bgThemeAni={bgThemeAni}></Container>}
    </React.Fragment>
  );
};

export default ChangBackgroundItem;
