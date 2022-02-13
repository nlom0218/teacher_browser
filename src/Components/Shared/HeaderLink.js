import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { moveWelcome, movePageLink } from '../../apollo';
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

export const HeaderNews = () => {
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
    </Link>
  );
};

export const HeaderToDo = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link
      to={routes.todo}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? <IcToDoListClick /> : <IcToDoList />}
    </Link>
  );
};

export const HeaderBookMark = () => {
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
    </Link>
  );
};

export const HedaerCalender = () => {
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
    </Link>
  );
};

export const HeaderMenu = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.menu} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcTeacherToolClick /> : <IcTeacherTool />}
  </Link>);
}
