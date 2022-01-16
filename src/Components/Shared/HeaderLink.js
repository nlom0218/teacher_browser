import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IcBookMark from '../../icons/Bookmark/IcBookMark';
import IcBookMarkClick from '../../icons/Bookmark/IcBookMarkClick';
import IcCalender from '../../icons/Calender/IcCalender';
import IcCalenderClick from '../../icons/Calender/IcCalenderClick';
import routes from '../../routes';

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
