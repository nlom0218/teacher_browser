import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import { Date } from "../Components/Lunchmenu/Date";
import { FaSchool } from "react-icons/fa";
import SearchSchool from "../Components/Lunchmenu/SearchSchool";
import { useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../apollo";
import useMe from "../Hooks/useMe";
import useMedia from "../Hooks/useMedia";
import { customMedia } from "../styles";
import SeeAllergy from "../Components/Lunchmenu/Popup/SeeAllergy";
import LunchmenuItem from "../Components/Lunchmenu/LunchmenuItem";
import IcSchoolYellow from "../icons/School/IcSchoolYellow";
import { useLocation } from "react-router";
import Loading from "../Components/Shared/Loading";
import useTitle from "../Hooks/useTitle";
import NoSchoolData from "../Components/Lunchmenu/Popup/NoSchoolData";

const LunchmenuContainer = styled.div`
  min-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  row-gap: 20px;
  row-gap: 1.25rem;
  margin-top: 30px;
  margin-top: 1.875rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    row-gap: 40px;
    row-gap: 2.5rem;
    margin-top: 0px;
    margin-top: 0rem;
  `}
`;

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

const SearchIcons = styled.div`
  display: grid;
  align-items: flex-end;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const SchoolDate = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: end;
  ${customMedia.greaterThan("tablet")`
    column-gap: 10px;
    column-gap: 0.625rem;
  `}
`;

const SchoolIcon = styled.div`
  align-self: flex-start;
  font-size: 2em;
  font-size: 2rem;
  display: flex;
  cursor: pointer;
  ${customMedia.greaterThan("tablet")`
    font-size: 2.5em;
    font-size: 2.5rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  `}
`;

const LunchmenuInfo = styled.div`
  grid-column: 1 / -1;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: auto 1fr;
    column-gap: 30px;
    min-height: 100%;
    max-height: 100%;
  `}
`;

const SLunchmenus = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  align-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
    grid-row: 1 / -1;
  `}
  .lunch_subMsg {
    text-align: center;
    padding: 40px 0px;
    padding: 2.5rem 0rem;
    ${customMedia.greaterThan("tablet")`
      font-size: 1.25em;
      font-size: 1.25rem;
    `}
  }
  .lunch_errMsg {
    color: ${(props) => props.theme.redColor};
  }
  .lunch_loading {
  }
`;

const LunchmenuBtn = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  grid-row: 1 / 2;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    column-gap: 0.625rem;
    `}
  ${customMedia.greaterThan("desktop")`
    justify-self: flex-start;
    grid-template-columns: auto auto auto auto;
  `}
  div {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
`;

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
`;

const LunchmenuOrigin = styled.div``;

const Lunchmenu = () => {
  const titleUpdataer = useTitle("????????? | ?????????");
  // ?????????
  const media = useMedia();

  const { state } = useLocation();

  // localStorage?????? ??? ????????????
  const { schoolCode: lmSchoolCode, areaCode: lmAreaCode, schoolName: lmSchoolName, date: lmDate } = JSON.parse(localStorage.getItem("lmSetting"));

  // popup reactiveVar => ???????????? ????????? ?????? ??????????????? ????????? ??? ?????? ??????
  const isPopup = useReactiveVar(isPopupVar);

  // localStorage??? ????????? ????????? state ??????
  const [date, setDate] = useState(lmDate ? new window.Date(lmDate) : new window.Date());
  const [schoolCode, setSchoolCode] = useState(lmSchoolCode ? lmSchoolCode : undefined);
  const [areaCode, setAreaCode] = useState(lmAreaCode ? lmAreaCode : undefined);
  const [schoolName, setSchoolName] = useState(lmSchoolName ? lmSchoolName : undefined);
  const [menu, setMenu] = useState("loading");
  const [origin, setOrigin] = useState([]);

  console.log("hello");

  const me = useMe();

  const processSetDay = () => {
    const day = date.getDay();
    if (day === 1) {
      return "?????????";
    } else if (day === 2) {
      return "?????????";
    } else if (day === 3) {
      return "?????????";
    } else if (day === 4) {
      return "?????????";
    } else if (day === 5) {
      return "?????????";
    } else if (day === 6) {
      return "?????????";
    } else if (day === 0) {
      return "?????????";
    }
  };
  const processSetDate = () => {
    return `${date.getFullYear()}??? ${(date.getMonth() + 1).toString().padStart(2, 0)}??? ${date.getDate().toString().padStart(2, 0)}???`;
  };
  //?????? ????????????
  const getMenu = () => {
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
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
          // setMenu([json.RESULT.MESSAGE])
          setMenu(undefined);
        } else {
          setMenu(
            json.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>").map((item) => {
              return {
                food: item.replace(/[0-9]/g, "").replace(/\./g, ""),
                allergy: item.split(/[^0-9]/g).filter((item) => item !== ""),
              };
            })
          );
          setOrigin(
            json.mealServiceDietInfo[1].row[0].ORPLC_INFO.replace(/\:/g, "(")
              .replace(/\s/gi, "")
              .split("<br/>")
              .map((item) => item + ")")
          );
        }
      });
  };

  const onClickBtn = (mode) => {
    const lmSetting = JSON.parse(localStorage.getItem("lmSetting"));
    if (mode === "yesterday") {
      const yesterdayDate = new window.Date(date.setDate(date.getDate() - 1));
      const newLmSetting = { ...lmSetting, date: yesterdayDate };
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
      setDate(new window.Date(yesterdayDate));
      return;
    }
    if (mode === "tomorrow") {
      const tomorrowDate = new window.Date(date.setDate(date.getDate() + 1));
      const newLmSetting = { ...lmSetting, date: tomorrowDate };
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
      setDate(new window.Date(tomorrowDate));
      return;
    }
    if (mode === "today") {
      const newLmSetting = { ...lmSetting, date: new window.Date() };
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
      setDate(new window.Date());
      return;
    }
    if (mode === "school" && me?.schoolName) {
      const newLmSetting = {
        ...lmSetting,
        areaCode: me?.areaCode,
        schoolName: me?.schoolName,
        schoolCode: me?.schoolCode,
      };
      setAreaCode(me?.areaCode);
      setSchoolCode(me?.schoolCode);
      setSchoolName(me?.schoolName);
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
    } else {
      inPopup("noSchoolData");
    }
  };

  const onClickSchoolIcon = () => inPopup("lmSearchSchool");

  //????????? ?????? ????????? ??????
  useEffect(() => {
    getMenu();
  }, [date, schoolCode]);
  //????????? ???????????? state??? ?????? ??? rerender
  // useDidMountEffect(getMenu, [date, schoolCode]);

  useEffect(() => {
    if (state) {
      const newDate = new window.Date(parseInt(state?.urlDate));
      setDate(newDate);
    }
  }, []);

  //??????
  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer isPopup={isPopup}>
        <Title>
          <SchoolName>{schoolName ? `${schoolName} ?????????` : "????????? ??????????????????."}</SchoolName>
          <SearchedDate>{processSetDate()}</SearchedDate>
          <SearchedDay>{processSetDay()}</SearchedDay>
        </Title>
        <SearchIcons>
          <SchoolDate>
            {media !== "Mobile" && <div>{schoolName ? schoolName : "????????????"}</div>}
            <SchoolIcon onClick={onClickSchoolIcon}>
              <IcSchoolYellow />
            </SchoolIcon>
          </SchoolDate>
          <Date date={date} setDate={setDate} processSetDate={processSetDate} />
        </SearchIcons>
        <LunchmenuInfo>
          <SLunchmenus>
            {menu === "loading" ? (
              <Loading page="subPage" />
            ) : menu ? (
              menu.map((item, index) => <LunchmenuItem key={index} item={item} me={me}></LunchmenuItem>)
            ) : (
              <div className="lunch_errMsg lunch_subMsg">?????? ????????? ????????????. ????</div>
            )}
          </SLunchmenus>
          <LunchmenuBtn>
            <div onClick={() => onClickBtn("yesterday")}>?????? ?????????</div>
            <div onClick={() => onClickBtn("tomorrow")}>????????? ?????????</div>
            <div onClick={() => onClickBtn("today")}>?????? ?????????</div>
            {me && <div onClick={() => onClickBtn("school")}>???????????? ?????????</div>}
          </LunchmenuBtn>
          <LunchmenuDetail>
            {menu && (
              <LunchmenuOrigin>
                <div className="detail_title">??? ?????????</div>
                <div>{origin.join(",")}</div>
              </LunchmenuOrigin>
            )}
            <div>
              <div className="detail_title">??? ??????????????????</div>
              <div>
                ???????????? ????????? ????????? ??????????????? ???????????? ?????? ?????????????????? (1.??????, 2.??????, 3.??????, 4.??????, 5.??????, 6.???, 7.?????????, 8.???, 9.??????, 10.????????????, 11.?????????, 12.?????????, 13.????????????,
                14.??????, 15.?????????, 16.?????????, 17.?????????, 18.?????????(???,??????,?????? ???)
              </div>
            </div>
          </LunchmenuDetail>
        </LunchmenuInfo>
      </LunchmenuContainer>
      {isPopup === "lmSearchSchool" && <SearchSchool setAreaCode={setAreaCode} setSchoolCode={setSchoolCode} setSchoolName={setSchoolName} />}
      {isPopup === "seeAllergy" && <SeeAllergy />}
      {isPopup === "noSchoolData" && <NoSchoolData />}
    </BasicContainer>
  );
};

export default Lunchmenu;
