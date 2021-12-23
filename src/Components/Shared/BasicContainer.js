import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Theme from './Theme';
import { customMedia } from '../../styles';
import PreviousPageBtn from './PreviousPageBtn';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 60px 10vh;
  grid-template-rows: auto 1fr 3.75rem 10vh;
  min-height: 110vh;
  height: 110vh;
  z-index: 0;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  max-width: 75rem;
  width: 90%;
  overflow: scroll;
  background: ${props => props.theme.blurColor};
  transition: background 1s ease;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  border-radius: 10px;
  border-radius: 0.625rem;
  position: relative;
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
`

const Footer = styled.footer`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
`

const WebFooter = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;
  max-width: 75rem;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const BasicContainer = ({ children, menuItem }) => {
  const [seeSideMenu, setSeeSideMenu] = useState(false)
  const onClickBackground = () => {
    if (seeSideMenu) {
      setSeeSideMenu(false)
    }
  }
  return (<Container onClick={onClickBackground}>
    <Theme />
    <Header seeSideMenu={seeSideMenu} setSeeSideMenu={setSeeSideMenu} />
    <ContentLayout>
      {menuItem && <PreviousPageBtn />}
      {children}
    </ContentLayout>
    <div></div>
    <Footer>
      <WebFooter>
      </WebFooter>
    </Footer>
  </Container>);
}

export default BasicContainer;

