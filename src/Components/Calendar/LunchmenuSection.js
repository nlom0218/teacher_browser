import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import IcLunchmenuClick from '../../icons/Lunchmenu/IcLunchmenuClick';
import routes from '../../routes';
import { customMedia } from '../../styles';
import LunchmenuItem from '../Lunchmenu/LunchmenuItem';
import Loading from '../Shared/Loading';
import SectionContainer from './styled/SectionContainer';
import SectionContents from './styled/SectionContents';
import SectionTitle from './styled/SectionTitle';

const SLunchmenus = styled.div`
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
    grid-row: 1 / -1;
  `}
  .lunch_subMsg {
    grid-column: 1 / -1;
    text-align: center;
    padding: 40px 0px;
    padding: 2.5rem 0rem;
  }
  .lunch_errMsg {
    color: ${props => props.theme.redColor};
  }
  .lunch_loading {
  }
`

const NoSchoolContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  min-height: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const NoSchoolText = styled.div`
  color: ${props => props.theme.redColor};
`

const SchoolLinkBtn = styled.div`
  padding: 10px;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const LunchmenuSection = ({ urlDate, me }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [menu, setMenu] = useState(undefined);

  const onClickAccountBtn = () => {
    navigate(routes.editAccount)
  }

  const getMenu = () => {
    const date = new window.Date(parseInt(urlDate))
    const changedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}${date.getDate().toString().padStart(2, 0)}`;
    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo` +
      `?KEY=954dac30b088454d9a95700f044ce620` +
      `&Type=json` +
      `&pIndex=1` +
      `&pSize=100` +
      `&ATPT_OFCDC_SC_CODE=${me?.areaCode}` +
      `&SD_SCHUL_CODE=${me?.schoolCode}` +
      `&MLSV_YMD=${changedDate}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.RESULT) {
          setLoading(false)
          setMenu(undefined)
        } else {
          setLoading(false)
          setMenu(
            (json.mealServiceDietInfo[1]).row[0].DDISH_NM.split("<br/>").map(item => {
              return {
                food: item.replace(/[0-9]/g, "").replace(/\./g, ""),
                allergy: item.split(/[^0-9]/g).filter(item => item !== "")
              }
            })
          );
        }
      });
  };

  useEffect(() => {
    getMenu()
  }, [urlDate, me]);

  return (<SectionContainer>
    <SectionTitle>
      <div><IcLunchmenuClick /></div>
      <div>식단표</div>
      {/* <PlusScheduleBtn onClick={onClickPlusBtn}><AiOutlinePlus /></PlusScheduleBtn> */}
    </SectionTitle>
    <SectionContents>
      {!me?.schoolCode ?
        <NoSchoolContainer>
          <NoSchoolText>등록된 학교가 없습니다. 😢</NoSchoolText>
          <SchoolLinkBtn onClick={onClickAccountBtn}>학교 등록하기</SchoolLinkBtn>
        </NoSchoolContainer>
        :
        <SLunchmenus>
          {loading ?
            <Loading page="subPage" />
            :
            (menu ?
              menu?.map((item, index) => (
                <LunchmenuItem key={index} item={item} me={me} summary="true">
                </LunchmenuItem>
              ))
              :
              <div className="lunch_errMsg lunch_subMsg">급식 정보가 없습니다. 😢</div>
            )
          }
        </SLunchmenus>}
    </SectionContents>
  </SectionContainer>);
}

export default LunchmenuSection;