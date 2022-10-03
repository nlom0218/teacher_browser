import { addMonths, format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
  padding-bottom: 0px;
  padding-bottom: 0rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  align-self: flex-start;
  ${customMedia.greaterThan("tablet")`
    font-size: 2em;
    font-size: 2rem;
  `}
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, auto);
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  ${customMedia.greaterThan("tablet")`
    grid-row: 1 / 2;
  `}
  .calendar_btn {
    cursor: pointer;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: color 1s ease, background-color 1s ease;
  }
`;

const TodayBtn = styled.div`
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
`;

const MoveBtn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const Select = styled.div`
  font-size: 0.875rem;
  font-size: 0.875em;
  padding: 5px 20px;
  padding: 0.313rem 1.25rem;
  transition: color 1s ease, background-color 1s ease;
  border: none;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
`;

interface IPros {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

const MainTop = ({ date, setDate }: IPros) => {
  const onClickBtn = (type: string) => {
    if (type === "cur") setDate(new Date());
    else if (type === "before") setDate((prev) => addMonths(prev, -1));
    else if (type === "next") setDate((prev) => addMonths(prev, 1));
  };
  return (
    <Layout>
      <Title>{format(date, "yyyy년 MM월")}</Title>
      <BtnContainer>
        <TodayBtn className="calendar_btn" onClick={() => onClickBtn("cur")}>
          TODAY
        </TodayBtn>
        <MoveBtn className="calendar_btn" onClick={() => onClickBtn("before")}>
          <IoIosArrowBack />
        </MoveBtn>
        <MoveBtn className="calendar_btn" onClick={() => onClickBtn("next")}>
          <IoIosArrowForward />
        </MoveBtn>
        <Select className="calendar_btn">종류 별 출결</Select>
        <Select className="calendar_btn">학생 별 출결</Select>
        <Select className="calendar_btn">명렬표로 보기</Select>
      </BtnContainer>
    </Layout>
  );
};

export default MainTop;
