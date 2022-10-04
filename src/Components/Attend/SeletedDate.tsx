import { ko } from "date-fns/esm/locale";
import { Dispatch, SetStateAction } from "react";
import ReactDatePicker from "react-datepicker";
import { BsCalendarDate } from "react-icons/bs";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { Icon } from "../Calendar/Popup/PopupLayout";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
`;

const DateContainer = styled.div`
  display: grid;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  input {
    width: 100%;
    background-color: ${(props) => props.theme.originBgColor};
    padding: 10px;
    padding: 0.625rem;
    border-radius: 40px;
    border-radius: 2.5rem;
    cursor: pointer;
    text-align: center;
    transition: background-color 1s ease;
  }
  ${customMedia.greaterThan("tablet")`
       grid-template-columns : 1fr auto 1fr;
    `}
`;

const SeleteDate = styled.div`
  display: grid;
  align-items: center;
  font-size: 0.875em;
  font-size: 0.875rem;
`;

interface IProps {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
  endDate: Date;
  setEndDate: Dispatch<SetStateAction<Date>>;
}

const SeletedDate = ({ startDate, setStartDate, endDate, setEndDate }: IProps) => {
  return (
    <Container>
      <Icon>
        <BsCalendarDate />
      </Icon>
      <DateContainer>
        <SeleteDate>
          <ReactDatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            todayButton="오늘"
            onChange={(date: Date) => {
              setStartDate(date);
              if (endDate < date) {
                setEndDate(date);
              }
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
          />
        </SeleteDate>
        <div>~</div>
        <SeleteDate>
          <ReactDatePicker
            dateFormat="yyyy/MM/dd"
            selected={endDate}
            onChange={(date: Date) => {
              setEndDate(date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
            placeholderText="종료일 설정"
          />
        </SeleteDate>
      </DateContainer>
    </Container>
  );
};

export default SeletedDate;
