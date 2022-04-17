import React from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import HeaderSideBtn from "./HeaderSideBtn";
import {
  HeaderBookMark,
  HeaderHome,
  HeaderMenu,
  HeaderToDo,
  HedaerCalender,
} from "./HeaderLink";

const Container = styled.div`
  width: 100%;
  display: grid;
  padding: ${(props) => (props.isFullScreenMode ? "10px" : "20px")};
  padding: ${(props) => (props.isFullScreenMode ? "0.625rem" : "1.25rem")};
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
    align-items: flex-start;
  `}
`;

const PageBtn = styled.div`
  position: relative;
  justify-self: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 2.75em;
    font-size: 2.75rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  padding: 5px 20px;
  background: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  transition: background 1s ease;
`;

const Header = ({ seeSideMenu, setSeeSideMenu, isFullScreenMode }) => {
  return (
    <Container isFullScreenMode={isFullScreenMode}>
      <div></div>
      {isFullScreenMode ? (
        <div></div>
      ) : (
        <PageBtn>
          <HeaderHome />
          <HeaderToDo />
          <HedaerCalender />
          <HeaderBookMark />
          <HeaderMenu />
        </PageBtn>
      )}
      <HeaderSideBtn
        seeSideMenu={seeSideMenu}
        setSeeSideMenu={setSeeSideMenu}
      />
    </Container>
  );
};

export default Header;
