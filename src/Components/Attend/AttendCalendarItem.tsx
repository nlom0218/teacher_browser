import { getDate, getDay, isToday } from "date-fns";
import styled from "styled-components";

interface IDay {
  sun: boolean;
  curMonth: boolean;
}

interface IDate {
  isToday: boolean;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const Day = styled.div<IDay>`
  justify-self: flex-end;
  color: ${(props) => props.sun && props.theme.redColor};
  opacity: ${(props) => (props.curMonth ? 1 : 0.4)};
  transition: ${(props) => props.sun && "color 1s ease"};
  position: relative;
`;

const Date = styled.div<IDate>`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: 5px;
  margin: 0.3125rem;
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${(props) => props.isToday && props.theme.redColor};
  color: ${(props) => props.isToday && props.theme.bgColor};
  border-radius: 20px;
  border-radius: 1.25rem;
  transition: ${(props) => props.isToday && "background-color 1s ease, color 1s ease"};
  cursor: pointer;
  :hover {
    background-color: ${(props) => (!props.isToday ? props.theme.hoverColor : props.theme.redColor)};
    transition: ${(props) => !props.isToday && "background-color 0.4s ease"};
  }
`;

interface IProps {
  date: Date;
  month: String;
}

const AttendCalendarItem = ({ date, month }: IProps) => {
  return (
    <Container>
      <Day sun={getDay(date) === 0} curMonth={month === "cur"}>
        <Date isToday={isToday(date)}> {getDate(date)}</Date>
      </Day>
    </Container>
  );
};

export default AttendCalendarItem;
