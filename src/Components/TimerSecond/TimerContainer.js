import React from 'react';
import styled from 'styled-components';
import { color } from '../../styles';

const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TimeBox = styled.div`
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  font-size: ${props => props.screen === "full" ?
    (props.isHours ? "20vw" : "28vw")
    :
    (props.isHours ? "12vw" : "20vw")
  };
  text-align: center;
  transition: font-size 0.4s ease;
  cursor: pointer;
  color: ${props => props.screen === "full" && color.white};
  text-shadow: ${props => props.screen === "full" && "rgb(0, 0, 0) 5px 5px 5px"};;
  text-shadow: ${props => props.screen === "full" && "rgb(0, 0, 0) 0.3125rem 0.3125rem 0.3125rem"};;
`

const TimerContainer = ({ hours, minutes, seconds, setScreen, screen }) => {
  const onClickTiemBox = () => {
    if (screen === "small") {
      setScreen("full")
    } else {
      setScreen("small")
    }
  }
  return (<Container>
    <TimeBox onClick={onClickTiemBox} screen={screen} isHours={hours !== 0}>
      {hours !== 0 && (hours < 10 ? `0${hours}:` : `${hours}:`)}
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </TimeBox>
  </Container>);
}

export default TimerContainer;