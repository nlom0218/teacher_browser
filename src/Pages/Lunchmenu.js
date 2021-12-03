import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  margin: 1em;
`;

const Lunchmenu = () => {
  const [date, setDate] = useState(new window.Date());
  const [menu, setMenu] = useState("");

  function getMenu() {
    const OFFICE_CODE = "J10";
    const SCHOOL_CODE = "7741022";
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
    console.log(process.env.REACT_APP_MENU_API_KEY);
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
        `?KEY=${process.env.REACT_APP_MENU_API_KEY}` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&ATPT_OFCDC_SC_CODE=${OFFICE_CODE}` +
        `&SD_SCHUL_CODE=${SCHOOL_CODE}` +
        `&MLSV_YMD=${changedDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        json.RESULT
          ? setMenu("해당 일에 급식 정보가 없습니다.")
          : setMenu(json.mealServiceDietInfo[1].row[0].DDISH_NM);
      });
  }

  useEffect(getMenu);

  return (
    <BasicContainer menuItem={true}>
      <Title>식단표</Title>
      <DatePicker
        dateFormat="yyyy년 MM월 dd일"
        selected={date}
        onChange={(date) => setDate(date)}
        todayButton="오늘"
        locale={ko}
        withPortal
      />
      {menu}
    </BasicContainer>
  );
};

export default Lunchmenu;
