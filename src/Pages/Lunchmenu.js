import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import { useDidMountEffect } from "../Hooks/useDidMountEffect";
import useMe from "../Hooks/useMe";
import { SchoolNameForm } from "../Components/Lunchmenu/SchoolNameForm";
import { Date } from "../Components/Lunchmenu/Date";

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

const Text = styled.li`
  font-size: 1.5em;
  margin: 5px;
`;

const Lunchmenu = () => {
  const [date, setDate] = useState(new window.Date());
  const [schoolCode, setSchoolCode] = useState([]);
  const [menu, setMenu] = useState([]);

  //회원정보 불러오기
  const me = useMe();

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

  //로그인 정보 있으면 반영
  useEffect(() => {
    if (me) setSchoolCode([me?.areaCode, me?.schoolCode]);
  }, [me]);
  //맨처음 제외하고 state값 변경 시 rerender
  useDidMountEffect(getMenu, [date, schoolCode]);

  //리턴
  return (
    <BasicContainer menuItem={true}>
      <Title>식단표</Title>
      <DateContainer>
        <Date date={date} setDate={setDate} />
        <SchoolNameForm
          schoolName={me?.schoolName}
          setSchoolCode={setSchoolCode}
          setMenu={setMenu}
        />
        {menu.map((e, index) => (
          <Text key={index}>{e}</Text>
        ))}
      </DateContainer>
    </BasicContainer>
  );
};

export default Lunchmenu;
