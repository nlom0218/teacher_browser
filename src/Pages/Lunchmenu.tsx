import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import SearchSchool from "../Components/Lunchmenu/SearchSchool";
import { useReactiveVar } from "@apollo/client";
import { isPopupVar } from "../apollo";
import { customMedia } from "../styles";
import SeeAllergy from "../Components/Lunchmenu/Popup/SeeAllergy";
import { useLocation } from "react-router";
import useTitle from "../Hooks/useTitle";
import NoSchoolData from "../Components/Lunchmenu/Popup/NoSchoolData";
import LunchmenuInfo from "../Components/Lunchmenu/LunchmenuInfo";
import BasicInfo from "../Components/Lunchmenu/BasicInfo";
import SearchContainer from "../Components/Lunchmenu/SearchContainer";

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

interface ILoaction {
  state: {
    urlDate: string;
  };
}

export interface ISearchDate {
  date: Date;
  schoolCode: string;
  areaCode: string;
  schoolName: string;
}

const Lunchmenu = () => {
  const titleUpdataer = useTitle("티처캔 | 식단표");
  const { state } = useLocation() as ILoaction;
  const {
    schoolCode: lmSchoolCode,
    areaCode: lmAreaCode,
    schoolName: lmSchoolName,
    date: lmDate,
  } = JSON.parse(localStorage.getItem("lmSetting") || "");

  const isPopup = useReactiveVar(isPopupVar);

  const [searchData, setSearchData] = useState<ISearchDate>({
    date: lmDate ? new window.Date(lmDate) : new window.Date(),
    schoolCode: lmSchoolCode ? lmSchoolCode : undefined,
    areaCode: lmAreaCode ? lmAreaCode : undefined,
    schoolName: lmSchoolName ? lmSchoolName : undefined,
  });

  const processSetDate = () => {
    return `${searchData.date.getFullYear()}년 ${(searchData.date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}월 ${searchData.date.getDate().toString().padStart(2, "0")}일`;
  };

  useEffect(() => {
    if (state) {
      const newDate = new window.Date(parseInt(state?.urlDate));
      setSearchData((prev) => {
        return {
          ...prev,
          date: newDate,
        };
      });
    }
  }, []);

  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer>
        <BasicInfo {...searchData} processSetDate={processSetDate} />
        <SearchContainer {...searchData} setSearchData={setSearchData} processSetDate={processSetDate} />
        <LunchmenuInfo {...searchData} setSearchData={setSearchData} />
      </LunchmenuContainer>
      {isPopup === "lmSearchSchool" && <SearchSchool setSearchData={setSearchData} />}
      {isPopup === "seeAllergy" && <SeeAllergy />}
      {isPopup === "noSchoolData" && <NoSchoolData />}
    </BasicContainer>
  );
};

export default Lunchmenu;
