import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { SEE_SCHEDULE_QUERY } from '../../Graphql/Schedule/query';
import { SEE_TO_DO_LIST_QUERY } from '../../Graphql/ToDoList/query';
import { customMedia } from '../../styles';
import Loading from '../Shared/Loading';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import routes from '../../routes';
import ScheduleSection from './ScheduleSection';
import ToDoListSection from './ToDoListSection';
import LunchmenuSection from './LunchmenuSection';
import JournalSection from './JournalSection';
import AttendSection from './AttendSection';
import { processSetDay } from '../../shared';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import useMedia from '../../Hooks/useMedia';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Title = styled.div`
  font-size : 1.25em;
  font-size : 1.25rem;
  text-transform: uppercase;
  ${customMedia.greaterThan("tablet")`
    font-size: 2em;
    font-size: 2rem;
  `}
`

const TodayBtn = styled.div`
  cursor: pointer;
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
`

const Btn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`

const BottomContainer = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const LeftSection = styled.div`
  display: grid;
  grid-template-rows: repeat(2, minmax(120px, auto));
  grid-template-rows: repeat(2, minmax(7.5rem, auto));
  row-gap: 20px;
  row-gap: 1.25rem;
`

const RightSection = styled.div`
  display: grid;
  grid-template-rows: minmax(120px, auto) repeat(2, minmax(120px, auto));
  grid-template-rows: minmax(120px, auto) repeat(2, minmax(7.5rem, auto));
  row-gap: 20px;
  row-gap: 1.25rem;
`

const CalendarDetail = ({ userEmail, urlDate, setScreen, screen, refetchQuery }) => {
  const navigate = useNavigate()
  const media = useMedia()

  const onClickTodayBtn = () => {
    const newDate = new Date().setHours(0, 0, 0, 0)
    navigate(`${routes.calendar}/${newDate}`)
  }

  const onClickBtnMinus = () => {
    const newDate = parseInt(urlDate) - 86400000
    navigate(`${routes.calendar}/${newDate}`)
  }

  const onClickBtn = () => {
    const newDate = parseInt(urlDate) + 86400000
    navigate(`${routes.calendar}/${newDate}`)
  }

  const onClickFull = () => {
    if (screen === "small") {
      setScreen("full")
    } else {
      setScreen("small")
    }
  }

  return (<Container>
    <TopContents>
      <Title>{format(new Date(parseInt(urlDate)), "yyyy년 MM월 dd일")} {processSetDay(new Date(parseInt(urlDate)))}요일</Title>
      <TodayBtn className="calendar_btn" onClick={onClickTodayBtn}>TODAY</TodayBtn>
      <Btn className="calendar_btn" onClick={onClickBtnMinus}><IoIosArrowBack /></Btn>
      <Btn className="calendar_btn" onClick={onClickBtn}><IoIosArrowForward /></Btn>
      {media === "Desktop" && <Btn className="calendar_btn" onClick={onClickFull}>{screen === "small" ? <BiFullscreen /> : <BiExitFullscreen />}</Btn>}
    </TopContents>
    <BottomContainer>
      <LeftSection>
        <ScheduleSection urlDate={urlDate} refetchQuery={refetchQuery}></ScheduleSection>
        <ToDoListSection urlDate={urlDate} refetchQuery={refetchQuery}></ToDoListSection>
      </LeftSection>
      <RightSection>
        <LunchmenuSection urlDate={urlDate}></LunchmenuSection>
        <JournalSection urlDate={urlDate}></JournalSection>
        <AttendSection urlDate={urlDate}></AttendSection>
      </RightSection>
    </BottomContainer>
  </Container>);
}

export default CalendarDetail;