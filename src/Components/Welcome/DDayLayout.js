import { format } from "date-fns";
import { is } from "date-fns/locale";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

const SDDayLayout = styled.div`
  position: relative;
  justify-self: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  background-color: ${(props) => props.hover && props.theme.cardBg};
  border-radius: 10px;
  border-radius: 0.625rem;
  transition: background-color 1s ease;
`;

const DDay = styled.div`
  font-size: 5em;
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: 0px;
  letter-spacing: 0rem;
`;

const DDAYName = styled.div`
  font-weight: 600;
`;

const DDayDate = styled.div`
  font-weight: 600;
`;

const DDaySetting = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  cursor: pointer;
  display: grid;
  justify-items: flex-end;
`;

const SettingIcon = styled.div``;

const SettingList = styled.div``;

const SettingItem = styled.div``;

const DDayLayout = ({
  dDay,
  index,
  toggleIsMoveDDay,
  userEmail,
  settingMode,
  setSettingMode,
  hover,
  setHover,
  isMoveDDay,
}) => {
  const [initMove, setInitMove] = useState();

  const onClickSettingBtn = () => {
    if (settingMode === false) {
      if (isMoveDDay) {
        setInitMove(true);
      } else {
        setInitMove(false);
      }
      toggleIsMoveDDay({
        variables: { userEmail, type: "stop" },
      });
      setSettingMode(true);
    } else {
      if (initMove) {
        toggleIsMoveDDay({
          variables: { userEmail, type: "start" },
        });
      }
      setSettingMode(false);
    }
  };

  const processDDay = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      const now = new window.Date().setHours(0, 0, 0, 0);
      const setDay = new Date(dDay[index].date).getTime();
      let DDAY;
      if (now > setDay) {
        // 이미 지난 D-Day
        DDAY = `D + ${Math.floor((now - setDay) / (1000 * 60 * 60 * 24))}`;
      } else if (now < setDay) {
        // 다가오는 D-Day
        DDAY = `D - ${Math.floor((setDay - now) / (1000 * 60 * 60 * 24))}`;
      } else if (now === setDay) {
        // 오늘
        DDAY = "D-DAY";
      }
      return DDAY;
    }
  };

  const processDDayName = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      return dDay[index].title;
    }
  };

  const processDDayDate = (index) => {
    if (dDay.length === 0) {
      return;
    } else {
      return format(dDay[index].date, "yyyy년 MM월 dd일");
    }
  };
  return (
    <SDDayLayout
      hover={hover}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        if (settingMode) {
          return;
        }
        setHover(false);
      }}
    >
      <DDay>{processDDay(index)}</DDay>
      <DDAYName>{processDDayName(index)}</DDAYName>
      <DDayDate>{processDDayDate(index)}</DDayDate>
      {hover && (
        <DDaySetting>
          <SettingIcon onClick={onClickSettingBtn}>
            <AiOutlineMenu />
          </SettingIcon>
          {settingMode && (
            <SettingList>
              <SettingItem>D-DAY 수정</SettingItem>
              <SettingItem>D-DAY 삭제</SettingItem>
            </SettingList>
          )}
        </DDaySetting>
      )}
    </SDDayLayout>
  );
};

export default DDayLayout;
