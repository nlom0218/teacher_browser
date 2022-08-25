import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { IMe } from "../../Hooks/useMe";
import { ISearchDate } from "../../Pages/Lunchmenu";
import { customMedia } from "../../styles";

const SLunchmenuBtn = styled.div`
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

interface IProps extends IMe {
  date: Date;
  setSearchData: Dispatch<SetStateAction<ISearchDate>>;
}

const LunchmenuBtn = ({ date, me, setSearchData }: IProps) => {
  const onClickDateBtn = (mode: string) => {
    const lmSetting = JSON.parse(localStorage.getItem("lmSetting") || "");
    let newDate = new window.Date();
    if (mode === "yesterday") {
      newDate = new window.Date(date.setDate(date.getDate() - 1));
    }
    if (mode === "tomorrow") {
      newDate = new window.Date(date.setDate(date.getDate() + 1));
    }
    const newLmSetting = { ...lmSetting, date: newDate };
    localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
    setSearchData((prev) => {
      return {
        ...prev,
        date: newDate,
      };
    });
  };

  const onClickSchoolBtn = () => {
    const lmSetting = JSON.parse(localStorage.getItem("lmSetting") || "");
    if (me?.schoolName) {
      const newLmSetting = {
        ...lmSetting,
        areaCode: me?.areaCode,
        schoolName: me?.schoolName,
        schoolCode: me?.schoolCode,
      };
      localStorage.setItem("lmSetting", JSON.stringify(newLmSetting));
      setSearchData((prev) => {
        return {
          ...prev,
          areaCode: me?.areaCode,
          schoolName: me?.schoolName,
          schoolCode: me?.schoolCode,
        };
      });
    } else {
      inPopup("noSchoolData");
    }
  };

  return (
    <SLunchmenuBtn>
      <div onClick={() => onClickDateBtn("yesterday")}>전날 식단표</div>
      <div onClick={() => onClickDateBtn("tomorrow")}>다음날 식단표</div>
      <div onClick={() => onClickDateBtn("today")}>오늘 식단표</div>
      {me && <div onClick={onClickSchoolBtn}>우리학교 식단표</div>}
    </SLunchmenuBtn>
  );
};

export default LunchmenuBtn;
