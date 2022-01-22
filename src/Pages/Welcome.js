import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { moveNews, moveWelcome, welcomeSectionVar } from '../apollo';
import BasicContainer from '../Components/Shared/BasicContainer';
import NewsSection from '../Components/Welcome/NewsSection';
import WelcomeSection from '../Components/Welcome/WelcomeSection';
import useMe from '../Hooks/useMe';

const Container = styled.div`
  display: grid;
  grid-template-rows: 40px auto;
  row-gap: 20px;
`

const WelcomeNavBar = styled.div``

const Welcome = () => {
  const welcomeSection = useReactiveVar(welcomeSectionVar)
  const me = useMe()

  const [init, setInit] = useState(true)

  const onClickNavBarIcon = () => {
    setInit(false)
    if (welcomeSection === "welcome") {
      moveNews()
    } else {
      moveWelcome()
    }
  }
  return (<BasicContainer>
    <Container>
      <WelcomeNavBar onClick={onClickNavBarIcon}>dddd</WelcomeNavBar>
      <WelcomeSection
        init={init}
        welcomeSection={welcomeSection}
      />
      <NewsSection
        init={init}
        welcomeSection={welcomeSection}
        userEmail={me?.email}
        favoriteNews={me?.favoriteNews}
      />
    </Container>
  </BasicContainer>
  );
}

export default Welcome;