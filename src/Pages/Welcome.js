import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { welcomeSectionVar } from '../apollo';
import BasicContainer from '../Components/Shared/BasicContainer';
import NewsSection from '../Components/Welcome/NewsSection';
import WelcomeSection from '../Components/Welcome/WelcomeSection';
import useMe from '../Hooks/useMe';

const Container = styled.div`
  min-height: 100%;
`

const Welcome = () => {
  const welcomeSection = useReactiveVar(welcomeSectionVar)
  const me = useMe()

  const [init, setInit] = useState(true)

  return (<BasicContainer screen="small">
    <Container>
      <WelcomeSection
        init={init}
        setInit={setInit}
        welcomeSection={welcomeSection}
      />
      <NewsSection
        init={init}
        setInit={setInit}
        welcomeSection={welcomeSection}
        userEmail={me?.email}
        favoriteNews={me?.favoriteNews}
      />
    </Container>
  </BasicContainer>
  );
}

export default Welcome;