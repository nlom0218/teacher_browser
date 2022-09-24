import React from "react";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
  fullScreenMode,
  isFullScreenModeVar,
  movePageLink,
  smallScreenMode,
} from "../../apollo";
import { FaSun, FaMoon } from "react-icons/fa";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import useMedia from "../../Hooks/useMedia";
import { HeaderToDo, HedaerCalender, HeaderMenu, HeaderHome, HeaderAttend } from "./HeaderLink";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";
import { customMedia } from "../../styles";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  bottom: 1.25rem;
  right: 20px;
  right: 1.25rem;
  display: grid;
  grid-template-columns: ${(props) => (props.isFullScreen ? "auto auto auto" : "auto auto")};
  z-index: 15;
  svg {
    font-size: 1.5em;
    display: flex;
  }
  .theme_btn,
  .menu_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    padding: 0.625rem;
    border-radius: 50%;
    box-shadow: 0px 2px 1px 0.5px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0.125rem 0.0625rem 0.03125rem rgba(0, 0, 0, 0.2);
    background: ${(props) => props.theme.bgColor};
    cursor: pointer;
    :hover {
      background: ${(props) => props.theme.fontColor};
      color: ${(props) => props.theme.bgColor};
    }
  }
  .menu_btn {
    transition: background 1s ease;
  }
`;

const MenuNavigation = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const MenuItem = styled.div`
  margin-right: 10px;
  margin-right: 0.625rem;
`;

const ScreenTheme = styled.div`
  margin-right: 10px;
  margin-right: 0.625rem;
`;

const BackgroungTheme = styled.div``;

const LightModeBtn = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: 0.75em;
  font-size: 0.75rem;
  svg {
    display: flex;
    color: tomato;
  }
  ${customMedia.greaterThan("desktop")`
    font-size: 1em;
    font-size: 1rem;
  `}
`;

const DarkModeBtn = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  font-size: 0.75em;
  font-size: 0.75rem;
  svg {
    display: flex;
    color: yellow;
    /* margin-right: 5px;
    margin-right: 0.3125rem; */
  }
  ${customMedia.greaterThan("desktop")`
    font-size: 1em;
    font-size: 1rem;
  `}
`;

const Theme = () => {
  const media = useMedia();
  const navigate = useNavigate();

  const isFullScreen = useReactiveVar(isFullScreenModeVar);
  const darkMode = useReactiveVar(darkModeVar);

  const onClickRoutes = (page) => {
    if (page === "home") {
      navigate(routes.home);
    } else if (page === "todo") {
      navigate(routes.todo);
    } else if (page === "pageLink") {
      movePageLink();
      navigate(routes.pageLink);
    } else if (page === "calendar") {
      localStorage.setItem("calendarDate", new Date());
      navigate(routes.calendar);
    } else if (page === "menu") {
      navigate(routes.menu);
    }
  };

  const onClickBtn = () => {
    if (darkMode) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };
  const onClickScreenBtn = () => {
    if (isFullScreen) {
      smallScreenMode();
    } else {
      fullScreenMode();
    }
  };
  return (
    <Wrapper isFullScreen={isFullScreen}>
      {isFullScreen && (
        <MenuNavigation>
          <MenuItem className="menu_btn" onClick={() => onClickRoutes("home")}>
            <HeaderHome />
          </MenuItem>
          <MenuItem className="menu_btn" onClick={() => onClickRoutes("todo")}>
            <HeaderToDo />
          </MenuItem>
          <MenuItem className="menu_btn" onClick={() => onClickRoutes("calendar")}>
            <HedaerCalender />
          </MenuItem>
          <MenuItem className="menu_btn" onClick={() => onClickRoutes("pageLink")}>
            <HeaderAttend />
          </MenuItem>
          <MenuItem className="menu_btn" onClick={() => onClickRoutes("menu")}>
            <HeaderMenu />
          </MenuItem>
        </MenuNavigation>
      )}
      {media === "Desktop" && (
        <ScreenTheme onClick={onClickScreenBtn} className="menu_btn">
          {isFullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </ScreenTheme>
      )}
      <BackgroungTheme onClick={onClickBtn} className="theme_btn">
        {darkMode ? (
          <LightModeBtn>
            <FaSun />
            {/* <div>라이트 모드로 보기</div> */}
          </LightModeBtn>
        ) : (
          <DarkModeBtn>
            <FaMoon />
            {/* <div>다크 모드로 보기</div> */}
          </DarkModeBtn>
        )}
      </BackgroungTheme>
    </Wrapper>
  );
};

export default Theme;
