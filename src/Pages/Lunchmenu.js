import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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

const Form = styled.form`
  display: flex;
  height: 50px;
  vertical-align: top;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const SchoolNameInput = styled.input`
  background-color: white;
  padding: 10px;
  margin: 10px;
  width: 250px;
  height: 30px;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 10px;
  height: 30px;
  border-radius: 5px;
  border: none;
  box-shadow: 5px 5px 5px;
  transition: 0.1s;
  &:active {
    margin-left: 15px;
    margin-right: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
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

  //학교 설정하기
  const searchSchool = ({ schoolName }) => {
    fetch(
      `https://open.neis.go.kr/hub/schoolInfo` +
        `?KEY=${process.env.REACT_APP_MENU_API_KEY}` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&SCHUL_NM=${schoolName}`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.RESULT) {
          setValue("schoolName", json.RESULT.MESSAGE);
          setMenu(["검색 결과가 없습니다."]);
        } else if (json.schoolInfo[1].row.length === 1) {
          setValue(
            "schoolName",
            `${json.schoolInfo[1].row[0].SCHUL_NM}(${json.schoolInfo[1].row[0].ATPT_OFCDC_SC_NM})`
          );
          setSchoolCode([
            json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE,
            json.schoolInfo[1].row[0].SD_SCHUL_CODE,
          ]);
        } else if (json.schoolInfo) {
          setValue("schoolName", "검색 결과가 너무 많습니다.");
        }
      });
  };

  //메뉴 받아오기
  const getMenu = () => {
    console.log(date, schoolCode);
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
                .replace(/(\d{1,2}\.|\")/g, "")
                .split("<br/>")
            );
      });
  };

  //첫 렌더링에 getMenu 막기
  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);
    useEffect(() => {
      didMount.current ? func() : (didMount.current = true);
    }, deps);
  };
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
        <Form onSubmit={handleSubmit(searchSchool)}>
          <SchoolNameInput
            {...register("schoolName")}
            placeholder="학교 이름을 입력해주세요."
            autoComplete="off"
            required
            minLength="3"
            onClick={(obj) => (obj.target.value = "")}
          />
          <Button>확인</Button>
        </Form>
        {menu.map((e, index) => (
          <Text key={index}>{e}</Text>
        ))}
      </DateContainer>
    </BasicContainer>
  );
};

export default Lunchmenu;
