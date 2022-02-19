import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import Theme from './Theme';
import { customMedia } from '../../styles';
import PreviousPageBtn from './PreviousPageBtn';
import { useReactiveVar } from '@apollo/client';
import { bgThemeAniVar } from '../../apollo';

const opacityContainerAni = keyframes`
  0% {
    opacity: 1;
  }
  20% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-rows: ${props => props.screen === "small" ? "auto 1fr 60px" : "20px 1fr 20px"};
  grid-template-rows: ${props => props.screen === "small" ? "auto 1fr 3.75rem" : "1.25rem 1fr 1.25rem"};
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
  /* animation: ${props => props.bgThemeAni && opacityContainerAni} 2.1s ease; */
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: ${props => props.screen === "small" && "1200px"};
  max-width: ${props => props.screen === "small" && "75rem"};
  width: ${props => props.screen === "small" ? "90%" : "96%"};
  border-radius: 10px;
  border-radius: 0.625rem;
  background: ${props => props.theme.blurColor};
  background: ${props => props.screen !== "small" && (props.page === "timer" && "none")};
  transition: background 1s ease;
  position: relative;
  overflow: ${props => props.notScroll ? "scroll" : "scroll"};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: ${props => props.screen === "small" ? "100%" : "98%"};
  `}
`

const BasicContainer = ({ children, menuItem, notScroll, screen, page }) => {
  const bgThemeAni = useReactiveVar(bgThemeAniVar)
  const [seeSideMenu, setSeeSideMenu] = useState(false)
  const onClickBackground = () => {
    if (seeSideMenu) {
      setSeeSideMenu(false)
    }
  }
  return (<Container onClick={onClickBackground} bgThemeAni={bgThemeAni} screen={screen}>
    <Theme />
    {screen === "small" ? <Header seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} /> : <div></div>}
    <ContentLayout notScroll={notScroll} screen={screen} page={page}>
      {menuItem && (screen === "small" && <PreviousPageBtn />)}
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;

