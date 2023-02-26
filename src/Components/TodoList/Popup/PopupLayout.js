import React from "react";
import { BsArrowCounterclockwise, BsCalendarDate, BsFillPencilFill, BsStar, BsStarFill } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { customMedia } from "../../../styles";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Icon = styled.div`
  padding: ${(props) => (props.notPaddingTop ? "0px" : "15px")} 0px;
  padding: ${(props) => (props.notPaddingTop ? "0px" : "0.9375rem")} 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`;

const SetDate = styled.div`
  display: grid;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  input {
    width: 100%;
    background-color: ${(props) => props.theme.originBgColor};
    padding: 20px 10px;
    padding: 1.25rem 0.625rem;
    border-radius: 40px;
    border-radius: 2.5rem;
    cursor: pointer;
    text-align: center;
  }
  ${customMedia.greaterThan("tablet")`
       grid-template-columns : 1fr auto 1fr auto;
    `}
`;

const StartDate = styled.div`
  display: grid;
  align-items: center;
`;

const EndDate = styled.div`
  display: grid;
  align-items: center;
`;

const ResetBtn = styled.div`
  cursor: pointer;
  justify-self: center;
  svg {
    color: ${(props) => props.theme.fontColor};
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
  ${customMedia.greaterThan("tablet")`
    align-self : center;
  `}
`;

const SetStar = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: repeat(5, auto);
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 40px;
  border-radius: 2.5rem;
  justify-items: center;
  ${customMedia.greaterThan("tablet")`
      padding: 0px 40px;
      padding: 0rem 2.5rem;
      column-gap: 20px;
      column-gap: 1.25rem;
    `}
  ${customMedia.lessThan("tablet")`
      width: 100%;
    `}
`;

const StarIcon = styled.div`
  cursor: pointer;
  color: ${(props) => props.isStar && props.theme.redColor};
  padding: ${(props) => (props.notPaddingTop ? "0px" : "15px")} 0px;
  padding: ${(props) => (props.notPaddingTop ? "0px" : "0.9375rem")} 0rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
  }
`;

export const PopupInputLayout = ({ children }) => {
  return (
    <Layout>
      <Icon>
        <BsFillPencilFill />
      </Icon>
      {children}
    </Layout>
  );
};

export const PopupTextarea = ({ children }) => {
  return (
    <Layout>
      <Icon>
        <CgNotes />
      </Icon>
      {children}
    </Layout>
  );
};

export const PopupDate = ({ reset = true, startDate, endDate, setStartDate, setEndDate }) => {
  const onClickResetDateBtn = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Layout>
      <Icon>
        <BsCalendarDate />
      </Icon>
      <SetDate>
        <StartDate>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              if (endDate < date) {
                setEndDate(date);
              }
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            locale={ko}
            placeholderText="시작일 설정"
            todayButton="오늘"
          />
        </StartDate>
        <div>~</div>
        <EndDate>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
            locale={ko}
            placeholderText="종료일 설정"
          />
        </EndDate>
        {reset && (
          <ResetBtn onClick={onClickResetDateBtn}>
            <BsArrowCounterclockwise />
          </ResetBtn>
        )}
      </SetDate>
    </Layout>
  );
};

export const PopupStar = ({ star, setStar }) => {
  return (
    <Layout>
      <Icon>
        <BsStarFill />
      </Icon>
      <SetStar>
        <StarIcon onClick={() => setStar(1)} isStar={star > 0}>
          <BsStarFill />
        </StarIcon>
        <StarIcon onClick={() => setStar(2)} isStar={star > 1}>
          {star > 1 ? <BsStarFill /> : <BsStar />}
        </StarIcon>
        <StarIcon onClick={() => setStar(3)} isStar={star > 2}>
          {star > 2 ? <BsStarFill /> : <BsStar />}
        </StarIcon>
        <StarIcon onClick={() => setStar(4)} isStar={star > 3}>
          {star > 3 ? <BsStarFill /> : <BsStar />}
        </StarIcon>
        <StarIcon onClick={() => setStar(5)} isStar={star > 4}>
          {star > 4 ? <BsStarFill /> : <BsStar />}
        </StarIcon>
      </SetStar>
    </Layout>
  );
};
