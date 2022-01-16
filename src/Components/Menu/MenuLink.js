import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import styled from 'styled-components';
import IcStopwatch from '../../icons/Stopwatch/IcStopwatch';
import IcPressedStopwatch from '../../icons/Stopwatch/IcPressedStopwatch';

const SMenu = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  color: ${props => props.theme.fontColor};
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
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0))
  }
`

const Title = styled.div`
  font-weight: 600;
  text-align: center;
`

export const TimerLink = () => {
  const [isHover, setIsHover] = useState(false)
  return (<Link to={routes.timer}>
    <SMenu onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover ? <IcPressedStopwatch /> : <IcStopwatch />}
      <Title>타이머</Title>
    </SMenu>
  </Link >);
}

export const DrawLink = () => {
  return (<Link to={routes.draw}>
    <SMenu>
      {/* <FcDonate /> */}
      <Title>랜덤뽑기</Title>
    </SMenu>
  </Link>);
}

export const SwapLink = () => {
  return (<Link to={routes.swap}>
    <SMenu>
      {/* <FcRefresh /> */}
      <Title>자리바꾸기</Title>
    </SMenu>
  </Link>);
}

export const OrderLink = () => {
  return (<Link to={routes.order}>
    <SMenu>
      {/* <FcNumericalSorting12 /> */}
      <Title>순서정하기</Title>
      {/* 급식순서 -> 순서정하기 */}
    </SMenu>
  </Link>);
}

export const LunchmenuLink = ({ onClickLunchmenu }) => {
  return (<Link to={routes.lunchmenu} onClick={onClickLunchmenu}>
    <SMenu>
      {/* <FcList /> */}
      <Title>식단표</Title>
    </SMenu>
  </Link>);
}

export const ScheduleLink = () => {
  return (<Link to={routes.schedule}>
    <SMenu>
      {/* <FcDataSheet /> */}
      <Title>시간표</Title>
    </SMenu>
  </Link>);
}

export const JournalLink = () => {
  return (
    <Link to={routes.journal}>
      <SMenu>
        {/* <FcDocument /> */}
        <Title>학급일지</Title>
      </SMenu>
    </Link>);
}

export const ListLink = () => {
  return (<Link to={routes.list}>
    <SMenu>
      {/* <FcContacts /> */}
      <Title>명렬표</Title>
    </SMenu>
  </Link>);
}
