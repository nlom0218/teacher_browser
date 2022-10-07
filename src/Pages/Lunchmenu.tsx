import { useState, useEffect } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import "react-datepicker/dist/react-datepicker.css";
import SearchSchool from "../Components/Lunchmenu/Popup/SearchSchool";
import { useReactiveVar } from "@apollo/client";
import { isPopupVar } from "../apollo";
import { customMedia } from "../styles";
import SeeAllergy from "../Components/Lunchmenu/Popup/SeeAllergy";
import { useLocation, useParams } from "react-router";
import useTitle from "../Hooks/useTitle";
import NoSchoolData from "../Components/Lunchmenu/Popup/NoSchoolData";
import LunchmenuInfo from "../Components/Lunchmenu/LunchmenuInfo";
import BasicInfo from "../Components/Lunchmenu/BasicInfo";
import SearchContainer from "../Components/Lunchmenu/SearchContainer";
import useMe from "../Hooks/useMe";

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
  schoolCode?: string;
  areaCode?: string;
  schoolName?: string;
}

const Lunchmenu = () => {
  const titleUpdataer = useTitle("티처캔 | 식단표");
  const me = useMe();
  const { state } = useLocation() as ILoaction;
  const { popup } = useParams() as { popup: string };

  const isPopup = useReactiveVar(isPopupVar);

  const [searchData, setSearchData] = useState<ISearchDate>({
    date: new window.Date(),
    schoolCode: undefined,
    areaCode: undefined,
    schoolName: undefined,
  });

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

  useEffect(() => {
    if (localStorage.getItem("lmSetting")) {
      const {
        schoolCode: lmSchoolCode,
        areaCode: lmAreaCode,
        schoolName: lmSchoolName,
        date: lmDate,
      } = JSON.parse(localStorage.getItem("lmSetting") || "");
      setSearchData({
        date: new Date(),
        schoolCode: lmSchoolCode,
        areaCode: lmAreaCode,
        schoolName: lmSchoolName,
      });
    } else if (me) {
      localStorage.setItem(
        "lmSetting",
        JSON.stringify({
          areaCode: me?.areaCode,
          schoolCode: me?.schoolCode,
          schoolName: me?.schoolName,
          date: new window.Date(),
        }),
      );
      setSearchData({
        date: new window.Date(),
        schoolCode: me?.schoolCode,
        areaCode: me?.areaCode,
        schoolName: me?.schoolName,
      });
    } else {
      localStorage.setItem(
        "lmSetting",
        JSON.stringify({
          areaCode: undefined,
          schoolCode: undefined,
          schoolName: undefined,
          date: new window.Date(),
        }),
      );
    }
  }, [me]);

  return (
    <BasicContainer menuItem={true}>
      <LunchmenuContainer>
        <BasicInfo {...searchData} />
        <SearchContainer {...searchData} setSearchData={setSearchData} />
        <LunchmenuInfo {...searchData} setSearchData={setSearchData} />
      </LunchmenuContainer>
      {isPopup === "lmSearchSchool" && <SearchSchool setSearchData={setSearchData} />}
      {isPopup === "seeAllergy" && <SeeAllergy />}
      {isPopup === "noSchoolData" && <NoSchoolData />}
    </BasicContainer>
  );
};

export default Lunchmenu;
