import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './Header';
import Theme from './Theme';
import { customMedia } from '../../styles';
import PreviousPageBtn from './PreviousPageBtn';
import { useReactiveVar } from '@apollo/client';
import { bgThemeAniVar, isFullScreenModeVar } from '../../apollo';

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

const fullScreenAni = keyframes`
  from {
    max-width: 1200px;
    max-width: 75rem;
  }
  to {
    max-width: 96vw;
  }
`

const smallScreenModeAni = keyframes`
  from {
    max-width: 96vw;
  }
  to {
    max-width: 1200px;
    max-width: 75rem;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-rows: ${props => !props.isFullScreenMode ? "auto 1fr 60px" : "40px 1fr 40px"};
  grid-template-rows: ${props => !props.isFullScreenMode ? "auto 1fr 3.75rem" : "2.5rem 1fr 2.5rem"};
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
  /* animation: ${props => props.bgThemeAni && opacityContainerAni} 2.1s ease; */
  position: relative;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: ${props => !props.isFullScreenMode ? "1200px" : "96vw"};
  max-width: ${props => !props.isFullScreenMode ? "75rem" : "96vw"};
  /* width: ${props => !props.isFullScreenMode ? "90%" : "96%"}; */
  width: 96%;
  border-radius: 10px;
  border-radius: 0.625rem;
  background: ${props => props.theme.blurColor};
  background: ${props => props.isFullScreenMode && (props.page === "timer" && "none")};
  transition: background 1s ease;
  position: relative;
  overflow: ${props => props.notScroll ? "scroll" : "scroll"};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
  /* animation: ${props => props.isFullScreenMode ? fullScreenAni : smallScreenModeAni} 1s ease forwards; */
`

const BasicContainer = ({ children, menuItem, notScroll, page }) => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const bgThemeAni = useReactiveVar(bgThemeAniVar)
  const [seeSideMenu, setSeeSideMenu] = useState(false)
  const onClickBackground = () => {
    if (seeSideMenu) {
      setSeeSideMenu(false)
    }
  }
  return (<Container onClick={onClickBackground} bgThemeAni={bgThemeAni} isFullScreenMode={isFullScreenMode}>
    <Theme />
    <Header seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} isFullScreenMode={isFullScreenMode} />
    <ContentLayout notScroll={notScroll} isFullScreenMode={isFullScreenMode} page={page}>
      {menuItem && <PreviousPageBtn />}
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;

