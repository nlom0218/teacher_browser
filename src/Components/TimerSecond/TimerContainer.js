import React from "react";
import styled from "styled-components";
import { fullScreenMode, smallScreenMode } from "../../apollo";
import { color, customMedia } from "../../styles";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MemoBox = styled.div`
  font-size: 4em;
  font-size: 4rem;
  padding: 20px 40px;
  padding: 1.25rem 2.5rem;
  line-height: 120%;
  font-weight: 600;
  text-align: center;
  ${customMedia.greaterThan("desktop")`
    font-size: 6em;
    font-size: 6rem;
  `}
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
}) => {
  const onClickTiemBox = () => {
    if (isPopup) return;
    if (!isFullScreenMode) {
      fullScreenMode();
    } else {
      smallScreenMode();
    }
  };
  return (
    <Container>
      <MemoBox>4교시 국어 수업 준비, 준비물은 없음</MemoBox>
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
