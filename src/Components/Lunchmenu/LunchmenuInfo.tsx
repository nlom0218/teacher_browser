import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../../Hooks/useMe";
import { ISearchDate } from "../../Pages/Lunchmenu";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import LunchmenuBtn from "./LunchmenuBtn";
import LunchmenuItem from "./LunchmenuItem";

const SLunchmenuInfo = styled.div`
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

interface IProps {
  areaCode: string;
  schoolCode: string;
  date: Date;
  setSearchData: Dispatch<SetStateAction<ISearchDate>>;
}

interface IMenu {
  food: string;
  allergy: string[];
}

const LunchmenuInfo = ({ date, areaCode, schoolCode, setSearchData }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<undefined | IMenu[]>();
  const [origin, setOrigin] = useState<string[] | []>([]);

  const me = useMe();

  const getMenu = () => {
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
        `?KEY=954dac30b088454d9a95700f044ce620` +
        `&Type=json` +
        `&pIndex=1` +
        `&pSize=100` +
        `&ATPT_OFCDC_SC_CODE=${areaCode}` +
        `&SD_SCHUL_CODE=${schoolCode}` +
        `&MLSV_YMD=${changedDate}`,
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.RESULT) {
          setMenu(undefined);
        } else {
          setLoading(false);
          setMenu(
            json.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>").map((item: string) => {
              return {
                food: item.replace(/[0-9]/g, "").replace(/\./g, ""),
                allergy: item.split(/[^0-9]/g).filter((item) => item !== ""),
              };
            }),
          );
          setOrigin(
            json.mealServiceDietInfo[1].row[0].ORPLC_INFO.replace(/\:/g, "(")
              .replace(/\s/gi, "")
              .split("<br/>")
              .map((item: string) => item + ")"),
          );
        }
      });
  };

  useEffect(() => {
    getMenu();
  }, [date, schoolCode]);

  return (
    <SLunchmenuInfo>
      <SLunchmenus>
        {loading ? (
          <Loading page="subPage" />
        ) : menu ? (
          menu.map((item, index) => <LunchmenuItem key={index} {...item} me={me}></LunchmenuItem>)
        ) : (
          <div className="lunch_errMsg lunch_subMsg">급식 정보가 없습니다. 😢</div>
        )}
      </SLunchmenus>
      <LunchmenuBtn date={date} me={me} setSearchData={setSearchData} />
      <LunchmenuDetail>
        {menu && (
          <LunchmenuOrigin>
            <div className="detail_title">✲ 원산지</div>
            <div>{origin.join(",")}</div>
          </LunchmenuOrigin>
        )}
        <div>
          <div className="detail_title">✲ 알레르기정보</div>
          <div>
            요리명에 표시된 번호는 알레르기를 유발할수 있는 식재료입니다 (1.난류, 2.우유, 3.메밀, 4.땅콩, 5.대두, 6.밀,
            7.고등어, 8.게, 9.새우, 10.돼지고기, 11.복숭아, 12.토마토, 13.아황산염, 14.호두, 15.닭고기, 16.쇠고기,
            17.오징어, 18.조개류(굴,전복,홍합 등)
          </div>
        </div>
      </LunchmenuDetail>
    </SLunchmenuInfo>
  );
};

export default LunchmenuInfo;
