import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import NewsList from '../Components/News/NewsList';

const Home = () => {
  return (<BasicContainer>
       <NewsList />;
  </BasicContainer>);
}

export default Home;