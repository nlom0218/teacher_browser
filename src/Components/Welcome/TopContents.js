import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../routes";
import LogoText from "../../image/LogoText.png";
import { customMedia } from "../../styles";
import { ToLeft, ToRight } from "../../Animations/MenuBtn";
import { FcAdvertising, FcHome } from "react-icons/fc";
import { TiTree } from "react-icons/ti";

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

const LeftContainer = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  justify-items: flex-end;
  align-items: flex-start;
  align-self: flex-start;
`;

const WelcomeTitle = styled.div`
  line-height: 160%;
  font-weight: 600;
  text-align: center;
  ${customMedia.greaterThan("tablet")`
    font-size: 1.25em;
    font-size: 1.25rem;
  `}
`;

const LoginMsg = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  line-height: 120%;
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

const HomeBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  position: relative;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const Btn = styled.div`
  cursor: pointer;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  opacity: 0.8;
  text-align: center;
`;

const HomeBtnBackground = styled.div`
  position: absolute;
  left: 0;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
  animation: ${(props) => (props.typeAniInit ? "none" : props.welcomePage === "home" ? ToLeft : ToRight)} 1s ease
    forwards;
  transform: ${(props) => (props.typeAniInit && props.welcomePage === "home" ? "translateX(0%)" : "translateX(100%)")};
`;

const Event = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    font-size: 2em;
    font-size: 2rem;
    color: ${(props) => props.theme.redColor};
  }
  transition: color 1s ease;
  cursor: pointer;
`;
const Contents = styled.div`
  display: grid;
  justify-items: flex-end;
`;
const ThemeTitle = styled.div`
  color: ${(props) => props.theme.redColor};
  font-weight: 700;
`;
const ThemeSubject = styled.div`
  color: ${(props) => props.theme.cardHoverBg};
`;

const TopContents = ({ me, welcomePage, setWelComPage }) => {
  const [typeAniInit, setTypeAniInit] = useState(true);
  const onClickHomeBtn = () => {
    if (welcomePage === "home") {
      setWelComPage("notice");
    } else {
      setWelComPage("home");
    }
    setTypeAniInit(false);
    setTimeout(() => {
      setTypeAniInit(true);
    }, 1000);
  };
  return (
    <Container>
      <TeacherCanLogo src={LogoText}></TeacherCanLogo>
      <LeftContainer>
        {me ? (
          <WelcomeTitle>{me?.nickname ? me?.nickname : me?.email}님 환영합니다. 😆</WelcomeTitle>
        ) : (
          <LoginMsg>
            <Link to={routes.login}>로그인하기</Link>
          </LoginMsg>
        )}
        <HomeBtn>
          <Btn onClick={onClickHomeBtn}>
            <FcHome />
          </Btn>
          <Btn onClick={onClickHomeBtn}>
            <FcAdvertising />
          </Btn>
          <HomeBtnBackground welcomePage={welcomePage} onClick={onClickHomeBtn} typeAniInit={typeAniInit}>
            {welcomePage === "home" ? (
              <div>
                <FcHome />
              </div>
            ) : (
              <div>
                <FcAdvertising />
              </div>
            )}
          </HomeBtnBackground>
        </HomeBtn>
        <Link to={routes.xmasTree}>
          <Event>
            <Contents>
              <ThemeTitle>크리스마스</ThemeTitle>
              <ThemeSubject>소원 나무 이벤트</ThemeSubject>
            </Contents>
            <div>
              <TiTree />
            </div>
          </Event>
        </Link>
      </LeftContainer>
    </Container>
  );
};

export default TopContents;
