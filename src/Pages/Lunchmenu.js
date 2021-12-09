import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useDidMountEffect } from "../Hooks/useDidMountEffect";
import useMe from "../Hooks/useMe";
import { SchoolNameForm } from "../Components/Lunchmenu/SchoolNameForm";

import dotenv from "dotenv";
dotenv.config();

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  margin: 1em;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Date = styled(DatePicker)`
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

const Text = styled.li`
  font-size: 1.5em;
  margin: 5px;
`;

const Lunchmenu = () => {
  const [date, setDate] = useState(new window.Date());
  const [schoolCode, setSchoolCode] = useState([]);
  const [menu, setMenu] = useState([]);

  const { register, handleSubmit, setValue } = useForm();

  //날짜 설정하기
  const getDate = (date) => {
    setDate(date);
  };

  //회원정보 불러오기
  const userInfo = useMe();
  console.log(userInfo);

  //메뉴 받아오기
  const getMenu = () => {
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
        `?KEY=${process.env.REACT_APP_MENU_API_KEY}` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&ATPT_OFCDC_SC_CODE=${schoolCode[0]}` +
        `&SD_SCHUL_CODE=${schoolCode[1]}` +
        `&MLSV_YMD=${changedDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        json.RESULT
          ? setMenu([json.RESULT.MESSAGE])
          : setMenu(
              JSON.stringify(json.mealServiceDietInfo[1].row[0].DDISH_NM)
                .replace(/\"/g, "")
                .split("<br/>")
            );
      });
  };

  //첫 렌더링에 getMenu 막기
  useDidMountEffect(getMenu, [date, schoolCode]);

  //리턴
  return (
    <BasicContainer menuItem={true}>
      <Title>식단표</Title>
      <DateContainer>
        <Date
          dateFormat="yyyy년 MM월 dd일"
          selected={date}
          onChange={(date) => getDate(date)}
          todayButton="오늘"
          locale={ko}
          withPortal
        />
        <SchoolNameForm setSchoolCode={setSchoolCode} setMenu={setMenu} />
        {menu.map((e, index) => (
          <Text key={index}>{e}</Text>
        ))}
      </DateContainer>
    </BasicContainer>
  );
};

export default Lunchmenu;
