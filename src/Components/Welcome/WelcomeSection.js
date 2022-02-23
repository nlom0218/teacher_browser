import React, { useState } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { hideWelcomeSection, seeWelcomSection } from '../../Animations/WelcomeSectionAni';
import { moveNews } from '../../apollo';
import AlertMessage from '../Shared/AlertMessage';
import useMedia from '../../Hooks/useMedia';
import { customMedia } from '../../styles';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import WelcomeContents from './WelcomeContents';

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
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
    row-gap: 40px;
    row-gap: 2.5rem;
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

const WelcomeTitle = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
  line-height: 160%;
  font-weight: 600;
`

const LoginMsg = styled.div`
  justify-self: flex-end;
  font-size: 1.25em;
  font-size: 1.25rem;
  line-height: 160%;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: center;
  justify-items: flex-end;
  column-gap: 10px;
  column-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`

const Msg = styled.div``

const LoginBtn = styled.div`
  font-size: 1em;
  font-size: 1rem;
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const LogoContents = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const LogoMsg = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  row-gap: 20px;
  row-gap: 1.25rem;
  line-height: 120%;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: auto 1fr;
  `}
`

const GoogleForm = styled.div`
  justify-self: flex-end;
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  ${customMedia.greaterThan("desktop")`
    justify-self: flex-start;
  `}
`

const LogoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  column-gap: 2.5rem;
  background-color: ${props => props.theme.originBgColor};
  transition: background-color 1s ease;
  border-radius: 10px;
  border-radius: 0.625rem;
`

const LogoItem = styled.div`
  position: relative;
`

const LogoImg = styled.img`
  width: 100%;
`

const LogoNum = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 20px;
  width: 1.25rem;
  height: 20px;
  height: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 50%;
  ${customMedia.greaterThan("desktop")`
    width: 40px;
    width: 2.5rem;
    height: 40px;
    height: 2.5rem;
  `}
`

const WelcomeSection = ({ welcomeSection, init, setInit, logoImageArr, me }) => {
  const [msg, setMsg] = useState(undefined)
  const media = useMedia()

  const onClickMoveIcon = () => {
    setInit(false)
    moveNews()
  }

  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    <Container>
      <MoveIcon onClick={onClickMoveIcon}>
        <FaArrowCircleRight />
      </MoveIcon>
      {me ? <WelcomeTitle>{me?.email}님 환영합니다. 😆</WelcomeTitle>
        :
        <LoginMsg>
          <Msg>네이버, 카카오, 구글로 간단히</Msg>
          <Link to={routes.login}><LoginBtn>로그인하기</LoginBtn></Link>
        </LoginMsg>
      }
      <WelcomeContents />
      <LogoContents>
        <LogoMsg>
          <div>티처캔 캐릭터에 어울리는 멋진 이름을 지어주세요! 선정된 분들껜 소소한 선물이 기다리고 있습니다. 😁</div>
          <GoogleForm onClick={() => { window.open("https://forms.gle/ih3oF6uPrn3Z1C3b7") }}>응모하러 가기</GoogleForm>
        </LogoMsg>
        <LogoList>
          {logoImageArr.map((item, index) => {
            return <LogoItem key={index}  >
              <LogoImg src={item}></LogoImg>
              <LogoNum>{index + 1}</LogoNum>
            </LogoItem>
          })}
        </LogoList>
      </LogoContents>
    </Container>
    <AlertMessage msg={msg} type="success" setMsg={setMsg} />
  </MoveContainer>);
}

export default WelcomeSection;