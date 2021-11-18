import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Theme from './Theme';
import { customMedia } from '../../styles';
import BackMenuBtn from './BackMenuBtn';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 100px;
  min-height: 100vh;
  height: 100vh;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  max-width: 75rem;
  width: 90%;
  display: grid;
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

const BasicContainer = ({ children, menuItem }) => {
  return (<Container>
    <Theme />
    <Header />
    <ContentLayout>
      {menuItem && <BackMenuBtn />}
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;