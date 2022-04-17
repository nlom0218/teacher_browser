import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import { is } from "date-fns/locale";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { DELETE_DDAY_MUTATION } from "../../Graphql/User/mutation";
import { ME_QUERY } from "../../Hooks/useMe";

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

const SettingList = styled.div`
  display: grid;
  border-radius: 10px;
`;

const SettingItem = styled.div`
  background-color: ${(props) => props.theme.originBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
  transition: background-color 1s ease;
  :hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  :first-child {
    border-bottom-left-radius: 0px;
    border-bottom-left-radius: 0rem;
    border-bottom-right-radius: 0px;
    border-bottom-right-radius: 0rem;
  }
  :last-child {
    border-top-left-radius: 0px;
    border-top-left-radius: 0rem;
    border-top-right-radius: 0px;
    border-top-right-radius: 0rem;
  }
`;

const DDayLayout = ({
  dDay,
  index,
  setIndex,
  toggleIsMoveDDay,
  userEmail,
  settingMode,
  setSettingMode,
  hover,
  setHover,
  setMsg,
  isMoveDDay,
  initMove,
  setInitMove,
  userId,
}) => {
  const [deleteDDay, { loading }] = useMutation(DELETE_DDAY_MUTATION, {
    onCompleted: (result) => {
      const {
        deleteDDay: { ok },
      } = result;
      if (ok) {
        setMsg("D-DAY가 삭제되었습니다.😄");
        setIndex(0);
        if (initMove) {
          toggleIsMoveDDay({
            variables: { userEmail, type: "start" },
          });
        }
        setSettingMode(false);
      }
    },
    update(
      cache,
      {
        data: {
          deleteDDay: { ok },
        },
      }
    ) {
      if (ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            dDay(prev) {
              const copyDDay = [...prev];
              return copyDDay.filter((item) => item.ID !== dDay[index].ID);
            },
          },
        });
      }
    },
  });

  const onClickDeleteBtn = () => {
    deleteDDay({
      variables: {
        userEmail,
        ID: dDay[index].ID,
      },
    });
  };

  const onClickEditBtn = () => {
    inPopup("registerDDay");
    setSettingMode(false);
    setHover(false);
    localStorage.setItem("dDayID", dDay[index].ID);
  };

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
            <SettingList settingMode={settingMode}>
              <SettingItem onClick={onClickEditBtn}>D-DAY 수정</SettingItem>
              <SettingItem onClick={onClickDeleteBtn}>D-DAY 삭제</SettingItem>
            </SettingList>
          )}
        </DDaySetting>
      )}
    </SDDayLayout>
  );
};

export default DDayLayout;
