import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import { Date } from "../Components/Lunchmenu/Date";
import SearchSchool from "../Components/Lunchmenu/SearchSchool";
import { useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { customMedia } from "../styles";
import SeeAllergy from "../Components/Lunchmenu/Popup/SeeAllergy";
import IcSchoolYellow from "../icons/School/IcSchoolYellow";
import { useLocation } from "react-router";
import useTitle from "../Hooks/useTitle";
import NoSchoolData from "../Components/Lunchmenu/Popup/NoSchoolData";
import LunchmenuInfo from "../Components/Lunchmenu/LunchmenuInfo";
import BasicInfo from "../Components/Lunchmenu/BasicInfo";

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

const Lunchmenu = () => {
  const titleUpdataer = useTitle("티처캔 | 식단표");

  const media = useMedia();

  const { state } = useLocation();

  const {
    schoolCode: lmSchoolCode,
    areaCode: lmAreaCode,
    schoolName: lmSchoolName,
    date: lmDate,
  } = JSON.parse(localStorage.getItem("lmSetting"));

  const isPopup = useReactiveVar(isPopupVar);

  const [date, setDate] = useState(lmDate ? new window.Date(lmDate) : new window.Date());
  const [schoolCode, setSchoolCode] = useState(lmSchoolCode ? lmSchoolCode : undefined);
  const [areaCode, setAreaCode] = useState(lmAreaCode ? lmAreaCode : undefined);
  const [schoolName, setSchoolName] = useState(lmSchoolName ? lmSchoolName : undefined);

  const processSetDate = () => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1).toString().padStart(2, 0)}월 ${date
      .getDate()
      .toString()
      .padStart(2, 0)}일`;
  };

  const onClickSchoolIcon = () => inPopup("lmSearchSchool");

  useEffect(() => {
    if (state) {
      const newDate = new window.Date(parseInt(state?.urlDate));
      setDate(newDate);
    }
  }, []);

  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer isPopup={isPopup}>
        <BasicInfo schoolName={schoolName} processSetDate={processSetDate} date={date} />
        <SearchIcons>
          <SchoolDate>
            {media !== "Mobile" && <div>{schoolName ? schoolName : "학교검색"}</div>}
            <SchoolIcon onClick={onClickSchoolIcon}>
              <IcSchoolYellow />
            </SchoolIcon>
          </SchoolDate>
          <Date date={date} setDate={setDate} processSetDate={processSetDate} />
        </SearchIcons>
        <LunchmenuInfo
          date={date}
          setDate={setDate}
          areaCode={areaCode}
          schoolCode={schoolCode}
          setAreaCode={setAreaCode}
          setSchoolCode={setSchoolCode}
          setSchoolName={setSchoolName}
        />
      </LunchmenuContainer>
      {isPopup === "lmSearchSchool" && (
        <SearchSchool setAreaCode={setAreaCode} setSchoolCode={setSchoolCode} setSchoolName={setSchoolName} />
      )}
      {isPopup === "seeAllergy" && <SeeAllergy />}
      {isPopup === "noSchoolData" && <NoSchoolData />}
    </BasicContainer>
  );
};

export default Lunchmenu;
