import { format } from "date-fns";
import styled from "styled-components";
import { customMedia } from "../../styles";

const Title = styled.h1`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  ${customMedia.greaterThan("tablet")`
  `}
`;

const SchoolName = styled.div``;

const SearchedDate = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  ${customMedia.greaterThan("tablet")`
    font-size: 2em;
    font-size: 2rem; 
  `}
`;

const SearchedDay = styled.div`
  opacity: 0.7;
`;

interface IProps {
  schoolName: string;
  date: Date;
}

const BasicInfo = ({ schoolName, date }: IProps) => {
  const processSetDay = () => {
    const dayNum = date.getDay();
    let day = "";
    if (dayNum === 1) {
      day = "월요일";
    } else if (dayNum === 2) {
      day = "화요일";
    } else if (dayNum === 3) {
      day = "수요일";
    } else if (dayNum === 4) {
      day = "목요일";
    } else if (dayNum === 5) {
      day = "금요일";
    } else if (dayNum === 6) {
      day = "토요일";
    } else if (dayNum === 0) {
      day = "일요일";
    }
    return day;
  };
  return (
    <Title>
      <SchoolName>{schoolName ? `${schoolName} 식단표` : "학교를 검색해주세요."}</SchoolName>
      <SearchedDate>{format(date, "yyyy년 MM월 dd일")}</SearchedDate>
      <SearchedDay>{processSetDay()}</SearchedDay>
    </Title>
  );
};

export default BasicInfo;
