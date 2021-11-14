import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import Theme from '../Components/Theme';
import { customMedia } from '../styles';

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
  padding: 20px;
  padding: 1.25rem;
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("desktop")`
    width: 100%;
  `}
`

const BasicContainer = ({ children }) => {
  return (<Container>
    <Theme />
    <Header />
    <ContentLayout>
      {children}
    </ContentLayout>
  </Container>);
}

export default BasicContainer;