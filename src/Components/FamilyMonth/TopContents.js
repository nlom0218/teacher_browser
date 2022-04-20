import React from "react";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import styled from "styled-components";
import { HeaderHome, HeaderMenu } from "../Shared/HeaderLink";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const LeftContents = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;


const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
`;

const RightContents = styled.div`
  column-gap: 10px;
  column-gap: 0.625rem;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Icon = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${props=>props.theme.btnBgColor};
  color: ${props=>props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 50%;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const TopContents = () => {

  return (
    <Container>
      <LeftContents>
        <Title>가정의 달</Title>
      </LeftContents>
      <RightContents>
        <Icon><AiOutlinePlus/></Icon>
        <Icon><AiOutlineSearch/></Icon>
      </RightContents>
    </Container>
  );
};

export default TopContents;
