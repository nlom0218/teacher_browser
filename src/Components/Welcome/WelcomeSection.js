import React from 'react';
import styled from 'styled-components';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';

const MoveContainer = styled.div`
  position: absolute;
  top: 40px;
  top: 2.5rem;
  bottom: 0;
  right: ${props => props.welcomeSection === "welcome" ? 0 : "100%"};
  left: ${props => props.welcomeSection === "welcome" ? 0 : "-100%"};
  animation: ${props => !props.init && (props.welcomeSection === "welcome" ? seeWelcomSection : hideWelcomeSection)} 1s ease forwards;
`

const WelcomeSection = ({ welcomeSection, init }) => {
  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    sdfsdfsdfsdfs
  </MoveContainer>);
}

export default WelcomeSection;