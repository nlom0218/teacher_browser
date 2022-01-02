import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Theme from './Theme';
import { customMedia } from '../../styles';
import PreviousPageBtn from './PreviousPageBtn';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 60px;
  grid-template-rows: auto 1fr 3.75rem;
  min-height: 100vh;
  height: 100vh;
  z-index: 0;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  max-width: 75rem;
  width: 90%;
  border-radius: 10px;
  border-radius: 0.625rem;
  background: ${props => props.theme.blurColor};
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
`

const BasicContainer = ({ children, menuItem, notScroll }) => {
  const [seeSideMenu, setSeeSideMenu] = useState(false)
  const onClickBackground = () => {
    if (seeSideMenu) {
      setSeeSideMenu(false)
    }
  }
  return (<Container onClick={onClickBackground}>
    <Theme />
    <Header seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} />
    <ContentLayout notScroll={notScroll}>
      {menuItem && <PreviousPageBtn />}
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;

