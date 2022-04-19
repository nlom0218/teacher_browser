import React from "react";
import styled from "styled-components";
import { HeaderHome, HeaderMenu } from "../Shared/HeaderLink";
import LogoText from "../../image/LogoText.png";

const STopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: flex-start;
  padding: 20px;
  padding: 1.25rem;
`;

const LeftContents = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const TeacherCanLogo = styled.img`
  width: 120px;
  width: 7.5rem;
`;

const Title = styled.div`
  font-size: 2em;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 1px 1px 1px ${(props) => props.theme.originBgColor};
  transition: text-shadow 1s ease;
`;

const RightContents = styled.div`
  column-gap: 10px;
  column-gap: 0.625rem;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const LinkIcon = styled.div`
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
`;

const TopContents = () => {
  return (
    <STopContents>
      <LeftContents>
        <TeacherCanLogo src={LogoText}></TeacherCanLogo>
      </LeftContents>
      <RightContents>
        <LinkIcon>
          <HeaderHome />
        </LinkIcon>
        <LinkIcon>
          <HeaderMenu />
        </LinkIcon>
      </RightContents>
    </STopContents>
  );
};

export default TopContents;
