import React, { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  hideWelcomeSection,
  seeWelcomSection,
} from "../../Animations/WelcomeSectionAni";
import { moveWelcome } from "../../apollo";
import routes from "../../routes";
import { customMedia } from "../../styles";

const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.welcomeSection === "home" ? 0 : "100%")};
  left: ${(props) => (props.welcomeSection === "home" ? 0 : "-100%")};
  animation: ${(props) =>
      !props.init &&
      (props.welcomeSection === "home" ? seeWelcomSection : hideWelcomeSection)}
    1s ease forwards;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Container = styled.div`
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 40px;
  row-gap: 2.5rem;
  align-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`;

const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const WelcomeTitle = styled.div`
  justify-self: flex-end;
  line-height: 160%;
  font-weight: 600;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
    font-size: 1.25em;
    font-size: 1.25rem;
  `}
`;

const LoginMsg = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
  line-height: 160%;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: flex-end;
  align-items: flex-start;
  column-gap: 10px;
  column-gap: 0.625rem;
  a {
    font-size: 1em;
    font-size: 1rem;
    padding: 5px 20px;
    padding: 0.3125rem 1.25rem;
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
  `}
`;

const HomeSection = ({ welcomeSection, init, setInit, me }) => {
  console.log(me);
  const onClickMoveIcon = () => {
    setInit(false);
    moveWelcome();
  };

  return (
    <MoveContainer welcomeSection={welcomeSection} init={init}>
      <Container>
        <MoveIcon onClick={onClickMoveIcon}>
          <FaArrowCircleRight />
        </MoveIcon>
        {me ? (
          <WelcomeTitle>{me?.email}님 환영합니다. 😆</WelcomeTitle>
        ) : (
          <LoginMsg>
            <Link to={routes.login}>로그인하기</Link>
          </LoginMsg>
        )}
      </Container>
    </MoveContainer>
  );
};

export default HomeSection;
