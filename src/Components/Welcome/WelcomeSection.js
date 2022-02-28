import React, { useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { moveNews } from '../../apollo';
import AlertMessage from '../Shared/AlertMessage';
import { customMedia } from '../../styles';
import WelcomeContents from './WelcomeContents';
import TopContents from './TopContents';
import BottomContents from './BottomContents';

const MoveContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${props => props.welcomeSection === "welcome" ? 0 : "100%"};
  left: ${props => props.welcomeSection === "welcome" ? 0 : "-100%"};
  animation: ${props => !props.init && (props.welcomeSection === "welcome" ? seeWelcomSection : hideWelcomeSection)} 1s ease forwards;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const Container = styled.div`
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 40px;
  row-gap: 2.5rem;
  align-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`

const WelcomeSection = ({ welcomeSection, init, setInit, logoImageArr, me }) => {
  const [msg, setMsg] = useState(undefined)

  const onClickMoveIcon = () => {
    setInit(false)
    moveNews()
  }

  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    <Container>
      <MoveIcon onClick={onClickMoveIcon}>
        <FaArrowCircleRight />
      </MoveIcon>
      <TopContents me={me} />
      <WelcomeContents />
      <BottomContents />
    </Container>
    <AlertMessage msg={msg} type="success" setMsg={setMsg} />
  </MoveContainer>);
}

export default WelcomeSection;