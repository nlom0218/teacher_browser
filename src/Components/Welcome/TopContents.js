import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import LogoText from "../../image/LogoText.png";
import { customMedia } from "../../styles";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`;

const TeacherCanLogo = styled.img`
  width: 160px;
  width: 10rem;
  ${customMedia.greaterThan("tablet")`
    width: 200px;
    width: 12.5rem;
  `}
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

const TopContents = ({ me }) => {
  return (
    <Container>
      <TeacherCanLogo src={LogoText}></TeacherCanLogo>
      {me ? (
        <WelcomeTitle>{me?.email}님 환영합니다. 😆</WelcomeTitle>
      ) : (
        <LoginMsg>
          <Link to={routes.login}>로그인하기</Link>
        </LoginMsg>
      )}
    </Container>
  );
};

export default TopContents;
