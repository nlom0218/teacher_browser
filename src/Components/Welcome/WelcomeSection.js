import React, { useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { welcomeTitleAni } from '../../Animations/TextColorAni';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { moveNews } from '../../apollo';
import AlertMessage from '../Shared/AlertMessage';
import useMedia from '../../Hooks/useMedia';
import { customMedia } from '../../styles';
import useTitle from '../../Hooks/useTitle';
import TextareaAutosize from 'react-textarea-autosize';

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

const WelcomeTitle = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  font-size: 2em;
  font-size: 2rem;
  letter-spacing: 5px;
  letter-spacing: 0.3125rem;
  line-height: 160%;
  font-weight: 600;
  background-image: ${props => props.theme.textAniColor};
  transition: background-image 1s ease;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${welcomeTitleAni} 5s infinite linear;
  ${customMedia.greaterThan("tablet")`
    padding: 20px 40px;
    padding: 1.25rem 2.5rem;
    font-size: 3em;
    font-size: 3rem;
  `}
`

const Box = styled.div`
  padding: 50px;
`

const WelcomeSection = ({ welcomeSection, init, setInit }) => {
  const [msg, setMsg] = useState(undefined)
  const media = useMedia()

  const onClickMoveIcon = () => {
    setInit(false)
    moveNews()
  }

  const onClickBtn = () => {
    setMsg("안녕하세요? 잘 되나 시험중입니다~!")
  }

  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    <MoveIcon onClick={onClickMoveIcon}>
      <FaArrowCircleRight />
    </MoveIcon>
    <WelcomeTitle>WELCOME TO{media !== "Desktop" && <br />} TEACHER CAN</WelcomeTitle>
    <div onClick={onClickBtn}>클릭미!!</div>
    <AlertMessage msg={msg} type="success" setMsg={setMsg} />
  </MoveContainer>);
}

export default WelcomeSection;