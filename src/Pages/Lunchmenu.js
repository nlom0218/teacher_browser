import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import { useDidMountEffect } from "../Hooks/useDidMountEffect";
import useMe from "../Hooks/useMe";
import { Date } from "../Components/Lunchmenu/Date";
import dotenv from "dotenv";
import { FaSchool } from "react-icons/fa";
dotenv.config();

const LunchmenuContainer = styled.div`
  height: 100%;
  padding: 60px;
  padding: 3.75rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const Title = styled.h1`
  font-size: 1.25em;
  font-size: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;


const SchoolName = styled.div``

const SearchedDate = styled.div`
  font-size: 2em;
  font-size: 2rem;
`

const SearchedDay = styled.div`
  opacity: 0.7;
`

const SearchIcons = styled.div`
  display: grid;
  align-items: flex-end;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const ShoolDate = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-end;
  justify-items: end;
  column-gap: 10px;
  column-gap: 0.625rem;
`

const ShoolIcon = styled.div`
  align-self: flex-start;
  display: flex;
  font-size: 2em;
  font-size: 2rem;
  cursor: pointer;
`

const LunchmenuInfo = styled.div`
  height: 100%;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
`

const SLunchmenus = styled.div`
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  align-items: center;
`

const SLunchmenu = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Food = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
`

const Allergy = styled.div`
  opacity: 0.6;
`

const Lunchmenu = () => {
  const [date, setDate] = useState(new window.Date());
  const [schoolCode, setSchoolCode] = useState([]);
  const [menu, setMenu] = useState([]);
  console.log(menu);
  const [schoolName, setSchoolName] = useState(undefined)

  //회원정보 불러오기
  const me = useMe();

  const processSetDay = () => {
    const day = date.getDay()
    if (day === 1) {
      return "월요일"
    } else if (day === 2) {
      return "화요일"
    } else if (day === 3) {
      return "수요일"
    } else if (day === 4) {
      return "목요일"
    } else if (day === 5) {
      return "금요일"
    } else if (day === 6) {
      return "토요일"
    } else if (day === 7) {
      return "일요일"
    }
  }
  const processSetDate = () => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}월 ${date.getDate().toString().padStart(2, 0)}일`
  }
  //메뉴 받아오기
  const getMenu = () => {
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
      `?KEY=954dac30b088454d9a95700f044ce620` +
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
            (json.mealServiceDietInfo[1]).row[0].DDISH_NM.split("<br/>").map(item => {
              return {
                food: item.replace(/[0-9]/g, "").replace(/\./g, ""),
                allergy: item.split(/[^0-9]/g).filter(item => item !== "").join()
              }
            })
          );
        console.log(json.mealServiceDietInfo[1].row[0]);
      });
  };

  //로그인 정보 있으면 반영
  useEffect(() => {
    if (me) {
      setSchoolCode([me?.areaCode, me?.schoolCode])
      setSchoolName(me?.schoolName)
    };
  }, [me]);
  //맨처음 제외하고 state값 변경 시 rerender
  useDidMountEffect(getMenu, [date, schoolCode]);

  //리턴
  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer>
        <Title>
          <SchoolName>{schoolName ? `${schoolName} 식단표` : "학교를 검색해주세요."}</SchoolName>
          <SearchedDate>{processSetDate()}</SearchedDate>
          <SearchedDay>{processSetDay()}</SearchedDay>
        </Title>
        <SearchIcons>
          <ShoolDate>
            <div>{schoolName ? schoolName : "학교검색"}</div>
            <ShoolIcon><FaSchool /></ShoolIcon>
          </ShoolDate>
          <Date date={date} setDate={setDate} processSetDate={processSetDate} />
        </SearchIcons>
        {/* <SchoolNameForm
          schoolName={me?.schoolName}
          setSchoolCode={setSchoolCode}
          setMenu={setMenu}
        /> */}
        <LunchmenuInfo>
          <SLunchmenus>
            {menu.map((item, index) => (
              <SLunchmenu key={index}>
                <Food>{item.food}</Food>
                <Allergy>{item.allergy}</Allergy>
              </SLunchmenu>
            ))}
          </SLunchmenus>
        </LunchmenuInfo>
      </LunchmenuContainer>
    </BasicContainer>
  );
};

export default Lunchmenu;
