import React from "react";
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

const BasicInfo = ({ schoolName, processSetDate, date }) => {
  const processSetDay = () => {
    const day = date.getDay();
    if (day === 1) {
      return "월요일";
    } else if (day === 2) {
      return "화요일";
    } else if (day === 3) {
      return "수요일";
    } else if (day === 4) {
      return "목요일";
    } else if (day === 5) {
      return "금요일";
    } else if (day === 6) {
      return "토요일";
    } else if (day === 0) {
      return "일요일";
    }
  };
  return (
    <Title>
      <SchoolName>{schoolName ? `${schoolName} 식단표` : "학교를 검색해주세요."}</SchoolName>
      <SearchedDate>{processSetDate()}</SearchedDate>
      <SearchedDay>{processSetDay()}</SearchedDay>
    </Title>
  );
};

export default BasicInfo;
