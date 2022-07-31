import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import styled from "styled-components";
import IcStopwatch from "../../icons/Stopwatch/IcStopwatch";
import IcPressedStopwatch from "../../icons/Stopwatch/IcPressedStopwatch";
import IcLunchmenuClick from "../../icons/Lunchmenu/IcLunchmenuClick";
import IcLunchmenu from "../../icons/Lunchmenu/IcLunchmenu";
import IcSchedule from "../../icons/Schedule/IcSchedule";
import IcScheduleClick from "../../icons/Schedule/IcScheduleClick";
import IcRandom from "../../icons/Random/IcRandom";
import IcRandomClick from "../../icons/Random/IcRandomClick";
import IcChangingSeatsClick from "../../icons/ChangingSeats/IcChangingSeatsClick";
import IcChangingSeats from "../../icons/ChangingSeats/IcChangingSeats";
import IcNameTable from "../../icons/NameTable/IcNameTable";
import IcOrderClick from "../../icons/Order/IcOrderClick";
import IcOrder from "../../icons/Order/IcOrder";
import IcJournal from "../../icons/Journal/IcJournal";
import IcJournalClick from "../../icons/Journal/IcJournalClick";
import IcNameTableOpened from "../../icons/NameTable/IcNameTableOpened";
import { enableSeeStudent, fullScreenMode } from "../../apollo";
import IcNewsClick from "../../icons/News/IcNewsClick";
import IcNews from "../../icons/News/IcNews";
import useMedia from "../../Hooks/useMedia";
import IcFamilyMonth from "../../icons/FamilyMonth/FamilyMonth";

const SMenu = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  color: ${(props) => props.theme.fontColor};
  transition: color 1s ease;
  cursor: pointer;
  a {
    z-index: 10;
  }
  img {
    margin: 0 auto;
  }
  svg {
    margin: 0 auto;
    font-size: 3.125em;
    font-size: 3.125rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
`;

const STimerLink = styled.a``;

const Title = styled.div`
  font-weight: 600;
  text-align: center;
`;

export const TimerLink = () => {
  const timerUrl =
    process.env.NODE_ENV === "production"
      ? `https://teachercan.com/timer_popup/countup`
      : `http://localhost:3000/timer_popup/countup`;
  const windowFeatures = "left=100,top=100,width=1600,height=800, popup";

  const onClickNewWindow = () => {
    window.open(timerUrl, "timer", windowFeatures);
  };

  const [isHover, setIsHover] = useState(false);
  return (
    <STimerLink onClick={onClickNewWindow}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcPressedStopwatch /> : <IcStopwatch />}
        <Title>타이머</Title>
      </SMenu>
    </STimerLink>
  );
};

export const DrawLink = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.draw}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcRandomClick /> : <IcRandom />}
        <Title>랜덤뽑기</Title>
      </SMenu>
    </Link>
  );
};

export const SwapLink = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.swap}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcChangingSeatsClick /> : <IcChangingSeats />}
        <Title>자리바꾸기</Title>
      </SMenu>
    </Link>
  );
};

export const OrderLink = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.order}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcOrderClick /> : <IcOrder />}
        <Title>순서정하기</Title>
      </SMenu>
    </Link>
  );
};

export const LunchmenuLink = ({ onClickLunchmenu }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.lunchmenu} onClick={onClickLunchmenu}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcLunchmenuClick /> : <IcLunchmenu />}
        <Title>식단표</Title>
      </SMenu>
    </Link>
  );
};

export const ScheduleLink = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.schedule}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcScheduleClick /> : <IcSchedule />}
        <Title>시간표</Title>
      </SMenu>
    </Link>
  );
};

export const JournalLink = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={routes.journal}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcJournalClick /> : <IcJournal />}
        <Title>학급일지</Title>
      </SMenu>
    </Link>
  );
};

export const ListLink = () => {
  const [isHover, setIsHover] = useState(false);
  const onClickListLink = () => {
    enableSeeStudent();
  };
  return (
    <Link to={routes.list} onClick={onClickListLink}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcNameTableOpened /> : <IcNameTable />}
        <Title>명렬표</Title>
      </SMenu>
    </Link>
  );
};

export const NewsLink = () => {
  const [isHover, setIsHover] = useState(false);
  const onClickListLink = () => {};
  return (
    <Link to={routes.news} onClick={onClickListLink}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcNewsClick /> : <IcNews />}
        <Title>뉴스</Title>
      </SMenu>
    </Link>
  );
};

export const ManagingRolesLink = () => {
  const [isHover, setIsHover] = useState(false);
  const onClickListLink = () => {};
  return (
    <Link to={routes.managingRoles} onClick={onClickListLink}>
      <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcOrderClick /> : <IcOrder />}
        <Title>1인1역</Title>
      </SMenu>
    </Link>
  );
};

export const FamilyMonthLink = () => {
  const media = useMedia();
  const onClickListLink = () => {
    if (media === "Desktop") {
      fullScreenMode();
    }
  };
  return (
    <Link to={routes.familyMonth} onClick={onClickListLink}>
      <SMenu
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
      >
        <IcFamilyMonth />
        <Title style={{ color: "#F7658E" }}>가정의 달</Title>
      </SMenu>
    </Link>
  );
};
