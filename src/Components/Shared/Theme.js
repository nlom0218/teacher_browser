import React from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode, fullScreenMode, fullScreenModeVar, smallScreenMode } from '../../apollo';
import { FaSun, FaMoon } from "react-icons/fa";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi"
import useMedia from '../../Hooks/useMedia';
import media from 'styled-media-query';

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  bottom: 1.25rem;
  right: 20px;
  right: 1.25rem;
  display: grid;
  grid-template-columns: auto auto;
  z-index: 1;
`

const ScreenTheme = styled.div`
  margin-right: 10px;
  margin-right: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 50%;
  box-shadow: 0px 2px 1px 0.5px rgba(0,0,0,0.2);
  box-shadow: 0px 0.125rem 0.0625rem 0.03125rem rgba(0,0,0,0.2);
  background: ${props => props.theme.bgColor};
  transition: none;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
  }
`

const BackgroungTheme = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 10px;
  padding: 0.75rem 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  box-shadow: 0px 2px 1px 0.5px rgba(0,0,0,0.2);
  box-shadow: 0px 0.125rem 0.0625rem 0.03125rem rgba(0,0,0,0.2);
  background: ${props => props.theme.bgColor};
  transition: none;
  font-size: 0.75em;
  font-size: 0.75rem;
  cursor: pointer;
  :hover {
    background: ${props => props.theme.fontColor};
    color: ${props => props.theme.bgColor};
  }
`

const LightModeBtn = styled.div`
  svg {
    color: tomato;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const DarkModeBtn = styled.div`
  svg {
    color: yellow;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const Theme = () => {
  const media = useMedia()

  const fullScreen = useReactiveVar(fullScreenModeVar)
  const darkMode = useReactiveVar(darkModeVar)
  const onClickBtn = () => {
    if (darkMode) {
      disableDarkMode()
    } else {
      enableDarkMode()
    }
  }
  const onClickScreenBtn = () => {
    if (fullScreen) {
      smallScreenMode()
    } else {
      fullScreenMode()
    }
  }
  return (
    <Wrapper>
      {media === "Desktop" && <ScreenTheme onClick={onClickScreenBtn}>
        {fullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
      </ ScreenTheme>}
      <BackgroungTheme onClick={onClickBtn}>
        {darkMode ?
          <LightModeBtn>
            <FaSun /> 라이트 모드로 보기
        </LightModeBtn>
          :
          <DarkModeBtn>
            <FaMoon /> 다크 모드로 보기
        </DarkModeBtn>
        }
      </BackgroungTheme>
    </Wrapper >
  )
}

export default Theme;