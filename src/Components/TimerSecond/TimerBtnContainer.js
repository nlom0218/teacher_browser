import React from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-self: center;
  column-gap: 60px;
  column-gap: 3.75rem;
  div {
    padding: 20px;
    padding: 1.25rem;
    border-radius: 50%;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
  }
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
  }
`

const PlayBtn = styled.div`
  cursor: pointer;
`

const PauseBtn = styled.div`
  cursor: pointer;
`

const StopBtn = styled.div`
  cursor: pointer;
`


const TimerBtnContainer = ({ timerStatus, setTimerStatus, setReset }) => {

  const onClickBtn = () => {
    if (timerStatus === "pause") {
      setTimerStatus("play")
    } else {
      setTimerStatus("pause")
    }
  }

  const onClickStopBtn = () => {
    setReset(prev => prev + 1)
  }

  return (<Container timerStatus={timerStatus}>
    {timerStatus === "pause" ?
      <PlayBtn onClick={onClickBtn}><FaPlay /></PlayBtn>
      :
      <PauseBtn onClick={onClickBtn}><FaPause /></PauseBtn>
    }
    <StopBtn onClick={onClickStopBtn}><FaStop /></StopBtn>
  </Container>);
}

export default TimerBtnContainer;