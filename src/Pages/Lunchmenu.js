import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gql, useQuery } from "@apollo/client";
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

const GET_SCHOOL = gql`
  query SearchSchool($name: String!) {
    searchSchool(name: $name) {
      SCHUL_NM
      ATPT_OFCDC_SC_CODE
      SD_SCHUL_CODE
    }
  }
`;

const Lunchmenu = () => {
  const [date, setDate] = useState(new window.Date());
  const [schoolName, setSchoolName] = useState("");
  const [officeCode, setOfficeCode] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [menu, setMenu] = useState([]);

  const { register, handleSubmit } = useForm();
  // {name} = data
  const onSubmit = (data) => setSchoolName(data);

  //함수로 수정하기
  //variables 수정하기
  const School = (variables) => {
    const { data } = useQuery(GET_SCHOOL, variables);
    if (data) {
      if (data.searchSchool[0]) {
        setOfficeCode(data.searchSchool[0].ATPT_OFCDC_SC_CODE);
        setSchoolCode(data.searchSchool[0].SD_SCHUL_CODE);
      } else {
        setMenu("없는 학교 이름입니다.");
      }
    }
    return "";
  };

  function getMenu() {
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
        `?KEY=${process.env.REACT_APP_MENU_API_KEY}` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&ATPT_OFCDC_SC_CODE=${officeCode}` +
        `&SD_SCHUL_CODE=${schoolCode}` +
        `&MLSV_YMD=${changedDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        json.RESULT
          ? json.RESULT.CODE === "ERROR-300"
            ? setMenu("학교 이름을 입력해주세요.")
            : setMenu("해당 일에 급식 정보가 없습니다.")
          : setMenu(
              JSON.stringify(json.mealServiceDietInfo[1].row[0].DDISH_NM)
                .replace(/(\d{1,2}\.|\")/g, "")
                .split("<br/>")
            );
      });
  }

  // useEffect 제거하기
  useEffect(getMenu, [date, schoolName]);

  return (
    <BasicContainer menuItem={true}>
      <Title>식단표</Title>
      <DateContainer>
        <Date
          dateFormat="yyyy년 MM월 dd일"
          selected={date}
          onChange={(date) => setDate(date)}
          todayButton="오늘"
          locale={ko}
          withPortal
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <SchoolNameInput
            placeholder="학교 이름을 입력해주세요."
            {...register("name", { required: true })}
          />
          <Button>확인</Button>
        </Form>
        {menu.length < 10 ? (
          menu.map((element) => <Text>{element}</Text>)
        ) : (
          <Text>{menu}</Text>
        )}
        <br />
        <School variables={schoolName} />
      </DateContainer>
    </BasicContainer>
  );
};

export default Lunchmenu;
