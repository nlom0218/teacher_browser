import React, { useState } from 'react';
import { FcSettings } from 'react-icons/fc';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import TimerBtnContainer from '../Components/TimerSecond/TimerBtnContainer';
import TimerContainer from '../Components/TimerSecond/TimerContainer';
import useTitle from '../Hooks/useTitle';
import { color, customMedia } from '../styles';

const Container = styled.div`
  min-height: 100%;
  display : grid;
  grid-template-rows : auto 1fr auto;
  padding: 20px;
  padding: 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const TopContaner = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`

const Title = styled.form`
  grid-row : 2 / 3;
  display : grid;
  grid-template-columns : 1fr auto;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
  font-size : 1.5em;
  font-size : 1.5rem;
  ${customMedia.greaterThan("tablet")`
  grid-row: 1 / 2;
  `}
`

const SettingIcon = styled.div`
  svg {
    display : flex;
    font-size : 2.5em;
    font-size : 2.5rem;
    cursor : pointer;
  }
  background-color: ${props => props.screen === "full" && color.white};
  padding: ${props => props.screen === "full" && "5px"};
  padding: ${props => props.screen === "full" && "0.3125rem"};
  border-radius: ${props => props.screen === "full" && "5px"};;
  border-radius: ${props => props.screen === "full" && "0.3125rem"};;
`


const TimerSecond = () => {
  const titleUpdataer = useTitle("티처캔 | 타이머")

  const [isTimer, setIsTimer] = useState(true)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerStatus, setTimerStatus] = useState("pause")

  const [screen, setScreen] = useState("small")

  return (
    <BasicContainer menuItem={true} screen={screen} page="timer">
      <Container>
        <TopContaner>
          <Title>{screen === "small" && "타이머"}</Title>
          <SettingIcon screen={screen}><FcSettings /></SettingIcon>
        </TopContaner>
        <TimerContainer hours={hours} minutes={minutes} seconds={seconds} setScreen={setScreen} screen={screen} />
        <TimerBtnContainer timerStatus={timerStatus} setTimerStatus={setTimerStatus} />
      </Container>
    </BasicContainer>
  );
}

export default TimerSecond;