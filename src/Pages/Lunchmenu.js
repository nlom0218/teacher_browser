import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import { Date } from "../Components/Lunchmenu/Date";
import dotenv from "dotenv";
import { FaSchool } from "react-icons/fa";
import SearchSchool from "../Components/Lunchmenu/SearchSchool";
import { useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../apollo";
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
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: auto 1fr;
  column-gap: 30px;
`

const SLunchmenus = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / -1;
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

const LunchmenuBtn = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  div {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`

const LunchmenuDetail = styled.div`
  align-self: flex-end;
  display: grid;
  row-gap: 30px;
  line-height: 120%;
  letter-spacing: 1px;
  opacity: 0.8;
  .detail_title {
    font-size: 1.25em;
    font-size: 1.25rem;
    margin-bottom: 10px;
    margin-bottom: 0.625rem;
    font-weight: 600;
  }
`

const LunchmenuOrigin = styled.div``

const Lunchmenu = () => {
  // localStorage에서 값 불러오기
  const {
    schoolCode: lmSchoolCode,
    areaCode: lmAreaCode,
    schoolName: lmSchoolName,
    date: lmDate }
    = JSON.parse(localStorage.getItem("lmSetting"))

  // popup reactiveVar => 파업창을 띄우기 위한 전역적으로 사용할 수 있는 변수
  const isPopup = useReactiveVar(isPopupVar)

  // localStorage에 저장된 값으로 state 지정
  const [date, setDate] = useState(lmDate ? new window.Date(lmDate) : new window.Date());
  const [schoolCode, setSchoolCode] = useState(lmSchoolCode ? lmSchoolCode : undefined)
  const [areaCode, setAreaCode] = useState(lmAreaCode ? lmAreaCode : undefined)
  const [schoolName, setSchoolName] = useState(lmSchoolName ? lmSchoolName : undefined)
  const [menu, setMenu] = useState([]);
  const [origin, setOrigin] = useState([])

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
    } else if (day === 0) {
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
      `&ATPT_OFCDC_SC_CODE=${areaCode}` +
      `&SD_SCHUL_CODE=${schoolCode}` +
      `&MLSV_YMD=${changedDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.RESULT) {
          setMenu([json.RESULT.MESSAGE])
        } else {
          setMenu(
            (json.mealServiceDietInfo[1]).row[0].DDISH_NM.split("<br/>").map(item => {
              return {
                food: item.replace(/[0-9]/g, "").replace(/\./g, ""),
                allergy: item.split(/[^0-9]/g).filter(item => item !== "").join()
              }
            })
          );
          setOrigin(json.mealServiceDietInfo[1]
            .row[0]
            .ORPLC_INFO
            .replace(/\:/g, "(")
            .replace(/\s/gi, "")
            .split("<br/>")
            .map(item => item + ")"))
        }
      });
  };

  const onClickBtn = (mode) => {
    const lmSetting = JSON.parse(localStorage.getItem("lmSetting"))
    if (mode === "tomorrow") {
      const tomorrowDate = new window.Date(date.setDate(date.getDate() + 1))
      const newLmSetting = { ...lmSetting, date: tomorrowDate }
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting))
      setDate(new window.Date(tomorrowDate))
    }
    if (mode === "today") {
      const newLmSetting = { ...lmSetting, date: new window.Date() }
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting))
      setDate(new window.Date())
    }
    if (mode === "school") {

    }
  }

  //로그인 정보 있으면 반영
  useEffect(() => {
    getMenu()
  }, [date, schoolCode]);
  //맨처음 제외하고 state값 변경 시 rerender
  // useDidMountEffect(getMenu, [date, schoolCode]);

  // 팝업창으로 이동하기
  const onClickSchoolIcon = () => inPopup()

  //리턴
  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer isPopup={isPopup}>
        <Title>
          <SchoolName>{schoolName ? `${schoolName} 식단표` : "학교를 검색해주세요."}</SchoolName>
          <SearchedDate>{processSetDate()}</SearchedDate>
          <SearchedDay>{processSetDay()}</SearchedDay>
        </Title>
        <SearchIcons>
          <ShoolDate>
            <div>{schoolName ? schoolName : "학교검색"}</div>
            <ShoolIcon onClick={onClickSchoolIcon}><FaSchool /></ShoolIcon>
          </ShoolDate>
          <Date date={date} setDate={setDate} processSetDate={processSetDate} />
        </SearchIcons>
        <LunchmenuInfo>
          <SLunchmenus>
            {menu.map((item, index) => (
              <SLunchmenu key={index}>
                <Food>{item.food}</Food>
                <Allergy>{item.allergy}</Allergy>
              </SLunchmenu>
            ))}
          </SLunchmenus>
          <LunchmenuBtn>
            <div onClick={() => onClickBtn("tomorrow")}>다음날 식단표</div>
            <div onClick={() => onClickBtn("today")}>오늘 식단표</div>
            <div onClick={() => onClickBtn("school")}>우리학교 식단표</div>
          </LunchmenuBtn>
          <LunchmenuDetail>
            <LunchmenuOrigin>
              <div className="detail_title">✲ 원산지</div>
              <div>{origin.join(",")}</div>
            </LunchmenuOrigin>
            <div>
              <div className="detail_title">✲ 알레르기정보</div>
              <div>요리명에 표시된 번호는 알레르기를 유발할수 있는 식재료입니다 (1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀, 7.고등어, 8.게, 9.새우, 10.돼지고기, 11.복숭아, 12.토마토, 13.아황산염, 14.호두, 15.닭고기, 16.쇠고기, 17.오징어, 18.조개류(굴,전복,홍합 등)</div>
            </div>
          </LunchmenuDetail>
        </LunchmenuInfo>
      </LunchmenuContainer>
      {isPopup && <SearchSchool
        setAreaCode={setAreaCode}
        setSchoolCode={setSchoolCode}
        setSchoolName={setSchoolName}
      />}
    </BasicContainer>
  );
};

export default Lunchmenu;
