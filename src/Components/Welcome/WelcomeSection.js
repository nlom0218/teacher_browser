import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { moveNews } from '../../apollo';

const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${props => props.welcomeSection === "welcome" ? 0 : "100%"};
  left: ${props => props.welcomeSection === "welcome" ? 0 : "-100%"};
  animation: ${props => !props.init && (props.welcomeSection === "welcome" ? seeWelcomSection : hideWelcomeSection)} 1s ease forwards;
`

const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 10;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
  }
`

const WelcomeSection = ({ welcomeSection, init, setInit }) => {

  const onClickMoveIcon = () => {
    setInit(false)
    moveNews()
  }

  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    <MoveIcon onClick={onClickMoveIcon}><FaArrowCircleRight /></MoveIcon>
  </MoveContainer>);
}

export default WelcomeSection;