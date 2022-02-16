import { useQuery } from '@apollo/client';
import { getDate, getDay, isToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_TO_DO_LIST_ONLY_LENGTH_QUERY } from '../../Graphql/ToDoList/query';
import IcToDoList from '../../icons/ToDoList/IcToDoList';
import routes from '../../routes';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 5px;
  row-gap: 0.3125rem;
`

const Day = styled.div`
  justify-self: flex-end;
  color: ${props => props.sun && props.theme.redColor};
  opacity: ${props => props.curMonth ? 1 : 0.4};
  transition: ${props => props.sun && "color 1s ease"};
  position: relative;
`

const Date = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: 5px;
  margin: 0.3125rem;
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${props => props.isToday && props.theme.redColor};
  color: ${props => props.isToday && props.theme.bgColor};
  border-radius: 20px;
  border-radius: 1.25rem;
  transition: ${props => props.isToday && "background-color 1s ease, color 1s ease"};
  cursor: pointer;
  :hover {
    background-color: ${props => !props.isToday ? props.theme.hoverColor : props.theme.redColor};
    transition: ${props => !props.isToday && "background-color 0.4s ease"};
  }
`

const ScheduleList = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-rows: ${props => `repeat(${props.row}, 1fr)`};
  row-gap: 5px;
  row-gap: 0.3125rem;
`

const EmptyBox = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  opacity: 0;
`

const ScheduleItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: ${props => props.dateType === "start" && "5px"};
  margin-left: ${props => props.dateType === "start" && "0.3125rem"};
  margin-right: ${props => props.dateType === "end" && "5px"};
  margin-right: ${props => props.dateType === "end" && "0.3125rem"};
  border-top-left-radius: ${props => props.dateType === "start" && "10px"};
  border-top-left-radius: ${props => props.dateType === "start" && "0.625rem"};
  border-bottom-left-radius: ${props => props.dateType === "start" && "10px"};
  border-bottom-left-radius: ${props => props.dateType === "start" && "0.625rem"};
  border-top-right-radius: ${props => props.dateType === "end" && "10px"};
  border-top-right-radius: ${props => props.dateType === "end" && "0.625rem"};
  border-bottom-right-radius: ${props => props.dateType === "end" && "10px"};
  border-bottom-right-radius: ${props => props.dateType === "end" && "0.625rem"};
  border-top-right-radius: ${props => props.isEndDate && "10px"};
  border-top-right-radius: ${props => props.isEndDate && "0.625rem"};
  border-bottom-right-radius: ${props => props.isEndDate && "10px"};
  border-bottom-right-radius: ${props => props.isEndDate && "0.625rem"};
  margin-right: ${props => props.isEndDate && "5px"};
  margin-right: ${props => props.isEndDate && "0.3125rem"};
  background-color: ${props => props.color};
  .schedule_date {
    padding: 5px;
    padding: 0.3125rem;
  }
`

const StartDate = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
`

const EndDate = styled.div`
  opacity: 0;
  cursor: pointer;
`

const TermDate = styled.div`
  opacity: 0;
  cursor: pointer;
`

const Summary = styled.div`
  padding: 10px;
  padding: 0.625rem;
`

const ToDoLength = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.625rem;
  align-items: center;
`

const ToDoIcon = styled.div`
  svg {
    display: flex;
  }
`

const ToDoText = styled.div`
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.8;
`

const DotIcon = styled.div`
  background: ${props => props.theme.fontColor};
  transition: background 1s ease;
  opacity: 0.4;
  justify-self: center;
  align-self: center;
  width: 12px;
  width: 0.75rem;
  height: 12px;
  height: 0.75rem;
  border-radius: 50%;

`

const CalendarItem = ({ item, create, media, userEmail, schedule, refetchQuery }) => {

  const navigate = useNavigate()

  const [dateSchedule, setDateSchedule] = useState([])
  const [row, setRow] = useState(1)
  console.log(getDate(item.date), new window.Date(item.date).setHours(0, 0, 0, 0));
  console.log(schedule);
  console.log(dateSchedule);

  const { data: toDoLength, loading: toDoLoading, refetch } = useQuery(SEE_TO_DO_LIST_ONLY_LENGTH_QUERY, {
    variables: {
      userEmail,
      date: new window.Date(item.date).setHours(0, 0, 0, 0)
    },
    skip: !userEmail
  })

  const processNumberDate = () => {
    return new window.Date(item.date).setHours(0, 0, 0, 0)
  }

  const processTerm = (termArr) => {
    const numberDate = new window.Date(item.date).setHours(0, 0, 0, 0)
    if (termArr.map(item => parseInt(item)).includes(numberDate)) {
      return true
    } else {
      return false
    }
  }

  const processDateType = (startDate, endDate) => {
    if (parseInt(startDate) === processNumberDate()) {
      return "start"
    } else if (parseInt(endDate) === processNumberDate()) {
      return "end"
    } else {
      return "term"
    }
  }

  const isEndDate = (endDate) => {
    if (parseInt(endDate) === processNumberDate()) {
      return true
    } else {
      return false
    }
  }

  const onClickSchedule = (id) => {
    inPopup("editSchedule")
    localStorage.setItem("editSchedule", id)
  }

  const onClickDay = () => {
    const date = new window.Date(item.date).setHours(0, 0, 0, 0)
    navigate(`${routes.calendar}/${date}`)
  }

  useEffect(() => {
    if (schedule) {
      const lastIndex = schedule?.length - 1
      if (lastIndex < 0) {
        return
      }
      const newDateSchedule = schedule?.filter(scheduleItem => scheduleItem.allDate.includes(new window.Date(item.date).setHours(0, 0, 0, 0)))
      const lastSort = Math.max(...newDateSchedule?.map(item => item.sort))
      if (!lastSort === -Infinity) {
        setRow(lastSort)
      }
      const reallyDateSchedule = []
      for (let i = 0; i < lastSort; i++) {
        const sortSchedule = newDateSchedule.filter((item) => item.sort === i + 1)
        if (sortSchedule.length === 0) {
          reallyDateSchedule.push(undefined)
        } else {
          reallyDateSchedule.push(sortSchedule[0])
        }
      }
      setDateSchedule(reallyDateSchedule)
    }
  }, [schedule])

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  return (<Container>
    <Day
      sun={getDay(item.date) === 0}
      curMonth={item.month === "cur"}
    >
      <Date isToday={isToday(item.date)} onClick={onClickDay}>{getDate(item.date)}{media !== "Mobile" && "일"}</Date>
    </Day>
    {media !== "Mobile" ? <React.Fragment>
      <ScheduleList row={row}>
        {dateSchedule.length !== 0 && dateSchedule?.map((scheduleItem, index) => {
          if (!scheduleItem) {
            return <ScheduleItem key={index}>
              <EmptyBox>e</EmptyBox>
            </ScheduleItem>
          } else {
            return <ScheduleItem onClick={() => onClickSchedule(scheduleItem._id)} key={index} color={scheduleItem.color} dateType={processDateType(scheduleItem.startDate, scheduleItem.endDate)} isEndDate={isEndDate(scheduleItem.endDate)}>
              {processDateType(scheduleItem.startDate, scheduleItem.endDate) === "start" && <StartDate className="schedule_date" >{scheduleItem.schedule}</StartDate>}
              {processDateType(scheduleItem.startDate, scheduleItem.endDate) === "end" && <EndDate className="schedule_date" >end</EndDate>}
              {processTerm(scheduleItem.term) && <TermDate className="schedule_date" >term</TermDate>}
            </ScheduleItem>
          }
        })}
      </ScheduleList>
      <Summary>
        {!toDoLength?.seeToDoListOnlyLength ? <div></div> : toDoLength?.seeToDoListOnlyLength !== 0 && <ToDoLength>
          <ToDoIcon><IcToDoList /></ToDoIcon>
          <ToDoText>{toDoLength?.seeToDoListOnlyLength}개</ToDoText>
        </ToDoLength>}
      </Summary></React.Fragment>
      :
      <React.Fragment>
        {dateSchedule.length !== 0 && <DotIcon></DotIcon>}
      </React.Fragment>
    }
  </Container>);
}

export default CalendarItem;