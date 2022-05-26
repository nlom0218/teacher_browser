import React from "react";
import styled from "styled-components";
import { fullScreenMode, smallScreenMode } from "../../apollo";
import { color } from "../../styles";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  text-shadow: rgb(0, 0, 0) 5px 5px 5px;
  text-shadow: rgb(0, 0, 0) 0.3125rem 0.3125rem 0.3125rem;
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
