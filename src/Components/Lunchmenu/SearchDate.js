import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { forwardRef, useState } from "react";
import useMedia from "../../Hooks/useMedia";
import { customMedia } from "../../styles";
import IcCalender from "../../icons/Calender/IcCalender";
import IcCalenderClick from "../../icons/Calender/IcCalenderClick";

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
  ${customMedia.greaterThan("tablet")`
    column-gap: 10px;
    column-gap: 0.625rem;
  `}
`;

const DateIcon = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 2em;
  font-size: 2rem;
  ${customMedia.greaterThan("tablet")`
    font-size: 2.5em;
    font-size: 2.5rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  `}
`;

export const SearchDate = ({ date, setDate, processSetDate }) => {
  const [isHover, setIsHover] = useState(false);

  const media = useMedia();

  const getDate = (date) => {
    const lmSetting = JSON.parse(localStorage.getItem("lmSetting"));
    const newLmSetting = { ...lmSetting, date };
    localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
    setDate(date);
  };
  const CustomInput = forwardRef(({ onClick }, ref) => (
    <DateContainer ref={ref}>
      {media !== "Mobile" && <div>{processSetDate()}</div>}
      <DateIcon onClick={onClick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcCalenderClick /> : <IcCalender />}
      </DateIcon>
    </DateContainer>
  ));
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
