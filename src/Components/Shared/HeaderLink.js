import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IcBookMark from '../../icons/Bookmark/IcBookMark';
import IcBookMarkClick from '../../icons/Bookmark/IcBookMarkClick';
import IcCalender from '../../icons/Calender/IcCalender';
import IcCalenderClick from '../../icons/Calender/IcCalenderClick';
import IcNews from '../../icons/News/IcNews';
import IcNewsClick from '../../icons/News/IcNewsClick';
import IcToDoList from '../../icons/ToDoList/IcToDoList';
import IcToDoListClick from '../../icons/ToDoList/IcToDoListClick';
import routes from '../../routes';

export const HeaderNews = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.home} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcNewsClick /> : <IcNews />}
  </Link>);
}

export const HeaderToDo = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.todo} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcToDoListClick /> : <IcToDoList />}
  </Link>);
}

export const HeaderBookMark = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.pageLink} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcBookMarkClick /> : <IcBookMark />}
  </Link>);
}

export const HedaerCalender = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.calendar} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    {isHover ? <IcCalenderClick /> : <IcCalender />}
  </Link>);
}
