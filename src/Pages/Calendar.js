import React, { useEffect, useState } from 'react';
import { format, startOfWeek, getWeeksInMonth, addMonths, startOfMonth, addDays, addWeeks, getMonth, getDay } from "date-fns"
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { AiOutlinePlus } from "react-icons/ai"
import { useReactiveVar } from '@apollo/client';
import CalendarItem from '../Components/Calendar/CalendarItem';
import AddSchedule from '../Components/Calendar/Popup/AddSchedule';
import { inPopup, isPopupVar } from '../apollo';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from '../Hooks/useMe';
import AlertMessage from '../Components/Shared/AlertMessage';
import Loading from '../Components/Shared/Loading';

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  padding: 20px;
  padding: 1.25rem;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  .calendar_btn {
    cursor: pointer;
    color: ${props => props.theme.bgColor};
    background-color: ${props => props.theme.btnBgColor};
    transition: color 1s ease, background-color 1s ease;
  }
`

const Title = styled.div`
  font-size: 2em;
  font-size: 2rem;
`

const TodayBtn = styled.div`
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
`

const Btn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`

const BottomContainerLayout = styled.div`
  position: relative;
`

const BottomContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  min-height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  overflow: ${props => props.notScroll ? "scroll" : "scroll"};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`

const Day = styled.div`
  justify-self: flex-end;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  color: ${props => props.sun && props.theme.redColor};
  transition: ${props => props.sun && "color 1s ease"};
`

const CalendarList = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${props => `repeat(${props.weekLength}, minmax(100px, auto))`};
  grid-template-rows: ${props => `repeat(${props.weekLength}, minmax(6.25rem, auto))`};
  background-color: ${props => props.theme.girdBorderColor};
  border: 1px solid ${props => props.theme.girdBorderColor};
  transition: background-color 1s ease, border 1s ease;
  row-gap: 1px;
  column-gap: 1px;
`

const Calendar = () => {
  const isPopup = useReactiveVar(isPopupVar)

  const me = useMe()

  const [date, setDate] = useState(new Date())
  const [create, setCreate] = useState(1)
  const [weekLength, setWeekLength] = useState(1)
  const [dateArr, setDateArr] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)

  const onClickTodayBtn = () => {
    const newDate = new Date()
    setDate(newDate)
  }

  const onClickBtn = () => {
    const newDate = addMonths(date, 1)
    setDate(newDate)
  }
  const onClickBtnMinus = () => {
    const newDate = addMonths(date, -1)
    setDate(newDate)
  }

  const onClickPlusBtn = () => {
    inPopup("addSchedule")
  }

  useEffect(() => {
    const newDateArr = []
    const monthStart = startOfMonth(date)
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const weekLength = getWeeksInMonth(date)
    for (let i = 0; i < weekLength; i++) {
      const tempWeekStart = addWeeks(weekStart, i)
      for (let i = 0; i < 7; i++) {
        const tempDate = addDays(tempWeekStart, i)
        if (getMonth(tempDate) === getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: 'cur'
          })
        } else if (getMonth(tempDate) < getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: 'pre'
          })
        } else if (getMonth(tempDate) > getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: 'next'
          })
        }
      }
    }
    setDateArr(newDateArr)
    setWeekLength(weekLength)
  }, [date])

  if (!weekLength) {
    return <div></div>
  }

  return (<BasicContainer>
    <Container>
      <TopContainer>
        <Title>{format(date, "yyyy년 MM월")}</Title>
        <TodayBtn className="calendar_btn" onClick={onClickTodayBtn}>TODAY</TodayBtn>
        <Btn className="calendar_btn" onClick={onClickBtnMinus}><IoIosArrowBack /></Btn>
        <Btn className="calendar_btn" onClick={onClickBtn}><IoIosArrowForward /></Btn>
        <Btn className="calendar_btn" onClick={onClickPlusBtn}><AiOutlinePlus /></Btn>
      </TopContainer>
      <BottomContainerLayout>
        <BottomContainer>
          {["일", "월", "화", "수", "목", "금", "토"].map((item, index) => {
            return <Day key={index} sun={item === "일"}>
              {item}
            </Day>
          })}
          <CalendarList weekLength={weekLength}>
            {dateArr && dateArr?.map((item, index) => {
              return <CalendarItem key={index} item={item} create={create} userEmail={me?.email} />
            })}
          </CalendarList>
        </BottomContainer>
      </BottomContainerLayout>
      {isPopup === "addSchedule" && <AddSchedule setErrMsg={setErrMsg} userEmail={me?.email} setCreate={setCreate} />}
    </Container>
    {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
  </BasicContainer>);
}

export default Calendar;