import { getDate, getDay, isToday } from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-rows: auto 1fr;
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
`

const CalendarItem = ({ item }) => {
  return (<Container>
    <Day
      sun={getDay(item.date) === 0}
      curMonth={item.month === "cur"}
    >
      <Date isToday={isToday(item.date)}>{getDate(item.date)}일</Date>
    </Day>
  </Container>);
}

export default CalendarItem;