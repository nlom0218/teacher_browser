import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { moveWelcome, movePageLink, isFullScreenModeVar } from '../../apollo';
import IcBookMark from '../../icons/Bookmark/IcBookMark';
import IcBookMarkClick from '../../icons/Bookmark/IcBookMarkClick';
import IcCalender from '../../icons/Calender/IcCalender';
import IcCalenderClick from '../../icons/Calender/IcCalenderClick';
import IcNews from '../../icons/News/IcNews';
import IcNewsClick from '../../icons/News/IcNewsClick';
import IcTeacherTool from '../../icons/TeacherTool/TeacherTool';
import IcTeacherToolClick from '../../icons/TeacherTool/TeacherToolClick';
import IcToDoList from '../../icons/ToDoList/IcToDoList';
import IcToDoListClick from '../../icons/ToDoList/IcToDoListClick';
import routes from '../../routes';

const LinkName = styled.div`
  position: absolute;
  bottom: ${props => !props.isFullScreenMode && "-20px"};
  bottom: ${props => !props.isFullScreenMode && "-1.25rem"};
  top: ${props => props.isFullScreenMode && "-20px"};
  top: ${props => props.isFullScreenMode && "-1.25rem"};
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  border-radius: 5px;
`

export const HeaderNews = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const [isHover, setIsHover] = useState(false);
  const onClickHome = () => {
    moveWelcome();
  };

  return (
    <Link
      to={routes.home}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickHome}
    >
      {isHover ? <IcNewsClick /> : <IcNews />}
      {isHover && !isFullScreenMode && <LinkName>홈/뉴스</LinkName>}
    </Link>
  );
};

export const HeaderToDo = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      to={routes.todo}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? <IcToDoListClick /> : <IcToDoList />}
      {isHover && !isFullScreenMode && <LinkName>할일목록</LinkName>}
    </Link>
  );
};

export const HeaderBookMark = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const [isHover, setIsHover] = useState(false);

  const onClickMyLink = () => {
    movePageLink();
  };
  return (
    <Link
      to={routes.pageLink}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickMyLink}
    >
      {isHover ? <IcBookMarkClick /> : <IcBookMark />}
      {isHover && !isFullScreenMode && !isFullScreenMode && <LinkName>링크페이지</LinkName>}
    </Link>
  );
};

export const HedaerCalender = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const [isHover, setIsHover] = useState(false);
  const onClickCalendar = () => {
    localStorage.setItem("calendarDate", new Date())
  }
  return (
    <Link
      to={routes.calendar}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickCalendar}
    >
      {isHover ? <IcCalenderClick /> : <IcCalender />}
      {isHover && !isFullScreenMode && <LinkName>달력</LinkName>}
    </Link>
  );
};

export const HeaderMenu = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar)

  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.menu} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcTeacherToolClick /> : <IcTeacherTool />}
    {isHover && !isFullScreenMode && <LinkName>메뉴</LinkName>}
  </Link>);
}
