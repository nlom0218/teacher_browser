import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fullScreenMode, smallScreenMode } from "../../apollo";
import { color, customMedia } from "../../styles";
import { TiDelete } from "react-icons/ti";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MemoBox = styled.div`
  position: relative;
  font-size: 4em;
  font-size: 4rem;
  padding: 20px 40px;
  padding: 1.25rem 2.5rem;
  line-height: 120%;
  font-weight: 600;
  text-align: center;
  border-radius: 10px;
  border-radius: 0.625rem;
  ${customMedia.greaterThan("desktop")`
    font-size: 6em;
    font-size: 6rem;
  `}

  // 1
  background-color: ${(props) => props.theme.cardBg};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  // 2
  /* color: ${color.white};
  text-shadow: rgb(0, 0, 0) 10px 10px 10px;
  text-shadow: rgb(0, 0, 0) 0.625rem 0.625rem 0.625rem; */
`;

const DelBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: ${(props) => props.theme.redColor};
  cursor: pointer;
  svg {
    font-size: 2em;
    font-size: 2rem;
    display: flex;
  }
`;

const TimeBox = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* font-size: ${(props) =>
    props.isFullScreenMode
      ? props.isHours
        ? "20vw"
        : "26vw"
      : props.isHours
      ? "12vw"
      : "18vw"}; */
  font-size: ${(props) => (props.isHours ? "22vw" : "28vw")};
  text-align: center;
  transition: font-size 0.4s ease;
  /* cursor: ${(props) => props.isPopup !== true && "pointer"};
  color: ${(props) => props.isFullScreenMode && color.white};
  text-shadow: ${(props) =>
    props.isFullScreenMode && "rgb(0, 0, 0) 5px 5px 5px"};
  text-shadow: ${(props) =>
    props.isFullScreenMode && "rgb(0, 0, 0) 0.3125rem 0.3125rem 0.3125rem"}; */
  color: ${color.white};
  text-shadow: rgb(0, 0, 0) 10px 10px 10px;
  text-shadow: rgb(0, 0, 0) 0.625rem 0.625rem 0.625rem;
`;

const TimerContainer = ({
  hours,
  minutes,
  seconds,
  isFullScreenMode,
  isPopup,
  localTimerMemo,
}) => {
  const [timerMemo, setTimerMemo] = useState(localStorage.getItem("timerMemo"));

  const onClickDelBtn = () => {
    localStorage.removeItem("timerMemo");
    setTimerMemo(undefined);
  };

  const onClickTiemBox = () => {
    if (isPopup) return;
    if (!isFullScreenMode) {
      fullScreenMode();
    } else {
      smallScreenMode();
    }
  };

  useEffect(() => {
    if (localTimerMemo) {
      setTimerMemo(localTimerMemo);
    }
  }, [localTimerMemo]);

  return (
    <Container>
      {timerMemo && (
        <MemoBox>
          {timerMemo}
          <DelBtn onClick={onClickDelBtn}>
            <TiDelete />
          </DelBtn>
        </MemoBox>
      )}
      <TimeBox
        isPopup={isPopup}
        onClick={onClickTiemBox}
        isFullScreenMode={isFullScreenMode}
        isHours={hours !== 0}
      >
        {hours !== 0 && (hours < 10 ? `0${hours}:` : `${hours}:`)}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </TimeBox>
    </Container>
  );
};

export default TimerContainer;
