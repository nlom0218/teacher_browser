import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import NewsSection from '../Components/Welcome/NewsSection';
import useMe from '../Hooks/useMe';

const Welcome = () => {
  const me = useMe()
  return (<BasicContainer>
    <NewsSection
      userEmail={me?.email}
      favoriteNews={me?.favoriteNews}
    />
  </BasicContainer>);
}

export default Welcome;