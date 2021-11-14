import React from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import Theme from '../Components/Theme';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr 100px;
  min-height: 100vh;
  height: 100vh;
`

const Home = () => {
  return (<Container>
    <Theme />
    <Header />
  </Container>);
}

export default Home;