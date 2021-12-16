import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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

export const Date = ({ date, setDate }) => {
  //날짜 설정하기
  const getDate = (date) => setDate(date);

  return (
    <DatePickers
      dateFormat="yyyy년 MM월 dd일"
      selected={date}
      onChange={(date) => getDate(date)}
      todayButton="오늘"
      locale={ko}
      withPortal
    />
  );
};
