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

const Container = styled.div`
  display: grid;
  grid-template-rows: ${props => !props.isFullScreenMode ? "auto 1fr 60px" : "20px 1fr 20px"};
  grid-template-rows: ${props => !props.isFullScreenMode ? "auto 1fr 3.75rem" : "1.25rem 1fr 1.25rem"};
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
  /* animation: ${props => props.bgThemeAni && opacityContainerAni} 2.1s ease; */
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: ${props => !props.isFullScreenMode && "1200px"};
  max-width: ${props => !props.isFullScreenMode && "75rem"};
  width: ${props => !props.isFullScreenMode ? "90%" : "96%"};
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
    width: ${props => !props.isFullScreenMode ? "100%" : "98%"};
  `}
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
    {!isFullScreenMode ? <Header seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} /> : <div></div>}
    <ContentLayout notScroll={notScroll} isFullScreenMode={isFullScreenMode} page={page}>
      {menuItem && (!isFullScreenMode && <PreviousPageBtn />)}
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;

