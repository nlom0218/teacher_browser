import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { forwardRef } from "react";
import { FcCalendar } from "react-icons/fc";
import { BsCalendarDate } from "react-icons/bs";

const DatePickers = styled(DatePicker)`
  font-size: 2em;
  text-align: center;
  border-radius: 10px;
  margin: 15px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  box-shadow: 5px 5px 5px;
  transition: 0.1s;
  &:active {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    box-shadow: none;
  }
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: end;
  column-gap: 5px;
  column-gap: 0.3125rem;
`


const DateIcon = styled.div`
  cursor: pointer;  
  display: flex;
  font-size: 2em;
  font-size: 2rem;
`

export const Date = ({ date, setDate, processSetDate }) => {
  //날짜 설정하기
  const getDate = (date) => setDate(date);
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateContainer ref={ref}>
      <div>{processSetDate()}</div>
      <DateIcon onClick={onClick}><BsCalendarDate /></DateIcon>
    </DateContainer>
  ))
  return (
    <DatePickers
      dateFormat="yyyy/MM/dd"
      selected={date}
      onChange={(date) => getDate(date)}
      todayButton="오늘"
      locale={ko}
      customInput={<CustomInput />}
      withPortal
    />
  );
};
