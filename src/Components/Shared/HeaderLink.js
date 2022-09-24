import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { movePageLink, isFullScreenModeVar } from "../../apollo";
import IcAttendance from "../../icons/Attendance/IcAttendance";
import IcAttendanceClick from "../../icons/Attendance/IcAttendanceClick";
import IcBookMark from "../../icons/Bookmark/IcBookMark";
import IcBookMarkClick from "../../icons/Bookmark/IcBookMarkClick";
import IcCalender from "../../icons/Calender/IcCalender";
import IcCalenderClick from "../../icons/Calender/IcCalenderClick";
import IcHome from "../../icons/Home/IcHome";
import IcHomeClick from "../../icons/Home/IcHomeClick";
import IcTeacherTool from "../../icons/TeacherTool/TeacherTool";
import IcTeacherToolClick from "../../icons/TeacherTool/TeacherToolClick";
import IcToDoList from "../../icons/ToDoList/IcToDoList";
import IcToDoListClick from "../../icons/ToDoList/IcToDoListClick";
import routes from "../../routes";

const LinkName = styled.div`
  position: absolute;
  bottom: ${(props) => !props.isFullScreenMode && "-20px"};
  bottom: ${(props) => !props.isFullScreenMode && "-1.25rem"};
  top: ${(props) => props.isFullScreenMode && "-20px"};
  top: ${(props) => props.isFullScreenMode && "-1.25rem"};
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  border-radius: 5px;
`;

export const HeaderToDo = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);

  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.todo} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ? <IcToDoListClick /> : <IcToDoList />}
      {isHover && !isFullScreenMode && <LinkName>할일목록</LinkName>}
    </Link>
  );
};

export const HeaderAttend = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);

  const [isHover, setIsHover] = useState(false);

  return (
    <Link to={routes.attend} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ? <IcAttendanceClick /> : <IcAttendance />}
      {isHover && !isFullScreenMode && !isFullScreenMode && <LinkName>출석부</LinkName>}
    </Link>
  );
};

export const HedaerCalender = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);

  const [isHover, setIsHover] = useState(false);
  const onClickCalendar = () => {
    localStorage.setItem("calendarDate", new Date());
  };
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
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);

  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.menu} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ? <IcTeacherToolClick /> : <IcTeacherTool />}
      {isHover && !isFullScreenMode && <LinkName>메뉴</LinkName>}
    </Link>
  );
};

export const HeaderHome = () => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);

  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.home} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ? <IcHomeClick /> : <IcHome />}
      {isHover && !isFullScreenMode && <LinkName>홈</LinkName>}
    </Link>
  );
};
