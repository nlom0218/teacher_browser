import React from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import { darkModeVar, disableDarkMode, enableDarkMode, fullScreenMode, isFullScreenModeVar, smallScreenMode } from '../../apollo';
import { FaSun, FaMoon } from "react-icons/fa";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi"
import useMedia from '../../Hooks/useMedia';
import { HeaderNews, HeaderToDo, HeaderBookMark, HedaerCalender, HeaderMenu } from "./HeaderLink"

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  bottom: 1.25rem;
  right: 20px;
  right: 1.25rem;
  display: grid;
  grid-template-columns: ${props => props.isFullScreen ? "auto auto auto" : "auto auto"};
  z-index: 1;
  svg {
    font-size: 1.5em;
    display: flex;
  }
  .theme_btn {
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
  }
`

const MenuNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`

const MenuItem = styled.div`
`

const ScreenTheme = styled.div`
`

const BackgroungTheme = styled.div`
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
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  svg {
    display: flex;
    color: tomato;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const DarkModeBtn = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  svg {
    display: flex;
    color: yellow;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`

const Theme = () => {
  const media = useMedia()

  const isFullScreen = useReactiveVar(isFullScreenModeVar)
  const darkMode = useReactiveVar(darkModeVar)
  const onClickBtn = () => {
    if (darkMode) {
      disableDarkMode()
    } else {
      enableDarkMode()
    }
  }
  const onClickScreenBtn = () => {
    if (isFullScreen) {
      smallScreenMode()
    } else {
      fullScreenMode()
    }
  }
  return (
    <Wrapper isFullScreen={isFullScreen}>
      {isFullScreen && <MenuNavigation>
        <MenuItem className="theme_btn">
          <HeaderNews />
        </MenuItem>
        <MenuItem className="theme_btn">
          <HeaderToDo />
        </MenuItem>
        <MenuItem className="theme_btn">
          <HeaderBookMark />
        </MenuItem>
        <MenuItem className="theme_btn">
          <HedaerCalender />
        </MenuItem>
        <MenuItem className="theme_btn">
          <HeaderMenu />
        </MenuItem>
      </MenuNavigation>}
      {media === "Desktop" && <ScreenTheme onClick={onClickScreenBtn} className="theme_btn">
        {isFullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
      </ ScreenTheme>}
      <BackgroungTheme onClick={onClickBtn}>
        {darkMode ?
          <LightModeBtn>
            <FaSun />
            <div>라이트 모드로 보기</div>
          </LightModeBtn>
          :
          <DarkModeBtn>
            <FaMoon />
            <div>다크 모드로 보기</div>
          </DarkModeBtn>
        }
      </BackgroungTheme>
    </Wrapper >
  )
}

export default Theme;