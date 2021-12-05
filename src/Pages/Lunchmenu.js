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
  const [menu, setMenu] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setSchoolName(data);

  const School = (variables) => {
    const { loading, data } = useQuery(GET_SCHOOL, variables);
    if (loading) {
      return "로딩중";
    }
    if (data) {
      setOfficeCode(data.searchSchool[0].ATPT_OFCDC_SC_CODE);
      setSchoolCode(data.searchSchool[0].SD_SCHUL_CODE);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="학교 이름을 입력해주세요."
          {...register("name", { required: true })}
        />
        <button>확인</button>
      </form>
      {menu}
      <br />
      <School variables={schoolName} />
    </BasicContainer>
  );
};

export default Lunchmenu;
