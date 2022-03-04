import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import NewsList from '../Components/News/NewsList';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: 2fr auto;
`
const TopContents = styled.div`
  display: grid;
  justify-self:center;
  grid-template-columns : 1fr 1fr 1fr;
  padding: 20px;
  padding: 1.25rem;

`

const NewsContents = styled.div`
`
const Home = () => {
  return (<BasicContainer>
    <Container>
      <TopContents>
        <h2> 오늘 할일 </h2>
        <h2> 식단표 </h2>
        <h2> 오늘의 시간표 </h2>

      </TopContents>

      <NewsContents><NewsList /></NewsContents>
    </Container>
  </BasicContainer>);
}

export default Home;