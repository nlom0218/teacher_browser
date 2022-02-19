import React from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa';
import styled from 'styled-components';
import { MdAudiotrack } from "react-icons/md"
import { color, customMedia } from '../../styles';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-self: center;
  column-gap: 60px;
  column-gap: 3.75rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  .timerBtn {
    padding: 20px;
    padding: 1.25rem;
    border-radius: 50%;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease, font-size 0.6s ease;
  }
  svg {
    display: flex;
  }
`

const PlayBtn = styled.div`
  cursor: pointer;
  font-size: ${props => props.screen === "full" ? "1.25em" : "2em"};
  font-size: ${props => props.screen === "full" ? "1.25rem" : "2rem"};
`

const PauseBtn = styled.div`
  cursor: pointer;
  font-size: ${props => props.screen === "full" ? "1.25em" : "2em"};
  font-size: ${props => props.screen === "full" ? "1.25rem" : "2rem"};
`

const StopBtn = styled.div`
  cursor: pointer;
  font-size: ${props => props.screen === "full" ? "1.25em" : "2em"};
  font-size: ${props => props.screen === "full" ? "1.25rem" : "2rem"};
`

const BgMusic = styled.div`
  grid-column: 1 / -1;
  display: grid;
  justify-self: center;
  grid-template-columns: auto auto;
  align-items: center;
  color: ${props => props.screen === "full" && color.white};
  text-shadow: ${props => props.screen === "full" && "rgb(0, 0, 0) 5px 5px 5px"};;
  text-shadow: ${props => props.screen === "full" && "rgb(0, 0, 0) 0.3125rem 0.3125rem 0.3125rem"};
  ${customMedia.greaterThan("desktop")`
    position: absolute;
    bottom: 2%;
    left: 0%;
    font-size: 1.25em;
    font-size: 1.25rem;
  `}
`


const TimerBtnContainer = ({ alarmAudio, timerStatus, setTimerStatus, setReset, setErrMsg, localHours, localMinutes, localSeconds, mode, bgMusic, screen }) => {
  console.log(screen);
  const onClickBtn = () => {
    if (mode === "countdown") {
      if (localHours === 0 && localMinutes === 0 && localSeconds === 0) {
        setErrMsg("설정에서 카운트 다운 시간을 설정해주세요. 😂")
        return
      }
    }
    if (timerStatus === "pause") {
      setTimerStatus("play")
    } else {
      setTimerStatus("pause")
    }
  }

  const onClickStopBtn = () => {
    setReset(prev => prev + 1)
  }

  return (<Container timerStatus={timerStatus} >
    {timerStatus === "pause" ?
      <PlayBtn screen={screen} className="timerBtn" onClick={onClickBtn}><FaPlay /></PlayBtn>
      :
      <PauseBtn screen={screen} className="timerBtn" onClick={onClickBtn}><FaPause /></PauseBtn>
    }
    <StopBtn screen={screen} className="timerBtn" onClick={onClickStopBtn}><FaStop /></StopBtn>
    {bgMusic && <BgMusic screen={screen}>
      <MdAudiotrack />
      <div>{bgMusic.name}</div>
    </BgMusic>}
  </Container>);
}

export default TimerBtnContainer;