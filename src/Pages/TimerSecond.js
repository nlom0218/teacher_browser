import { useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FcSettings } from 'react-icons/fc';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../apollo';
import AlertMessage from '../Components/Shared/AlertMessage';
import BasicContainer from '../Components/Shared/BasicContainer';
import TimerSetting from '../Components/TimerSecond/Popup/TimerSetting';
import TimerBtnContainer from '../Components/TimerSecond/TimerBtnContainer';
import TimerContainer from '../Components/TimerSecond/TimerContainer';
import useTitle from '../Hooks/useTitle';
import routes from '../routes';
import { color, customMedia } from '../styles';
import { stopMusicFn, playMusicFn, pauseMusicFn } from "../audio/BackgroundMusic/BackgroundMusic"
import { alermAudiocArr } from "../audio/AlermAudio/AlermAudio"
import FinishCountdonw from '../Components/TimerSecond/Popup/FinishCountdonw';

const Container = styled.div`
  min-height: 100%;
  display : grid;
  grid-template-rows : auto auto 1fr auto;
  padding: 20px;
  padding: 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : flex-start;
  position: relative;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const TopContaner = styled.div`
  position: relative;
  padding-top: 20px;
  ${customMedia.greaterThan("tablet")`
    padding-top: 0px;
  `}
`

const Title = styled.form`
  display : grid;
  grid-template-columns : 1fr auto;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
  font-size : 1.5em;
  font-size : 1.5rem;
  opacity: ${props => props.isFull ? 0 : 1};
`

const SettingIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  svg {
    display : flex;
    font-size : 2.5em;
    font-size : 2.5rem;
    cursor : pointer;
  }
  justify-self: flex-end;
  background-color: ${props => props.screen === "full" && color.white};
  padding: ${props => props.screen === "full" && "5px"};
  padding: ${props => props.screen === "full" && "0.3125rem"};
  border-radius: ${props => props.screen === "full" && "5px"};
  border-radius: ${props => props.screen === "full" && "0.3125rem"};
`

const SetModeContainer = styled.div`
  text-align: center;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  /* padding-top: 20px; */
  ${customMedia.greaterThan("tablet")`
    justify-self: flex-start;
    grid-template-columns: auto auto;
    padding-top: 0px;
  `}
`

const ModeBtn = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  opacity: ${props => props.selected ? 1 : 0.4};
  transition: background-color 1s ease, color 1s ease;
  :hover {
    opacity: 1;
    transition: opacity 0.6s ease;
  }
`


const TimerSecond = ({ bgMusicMp3, setBgMusicMp3 }) => {
  const titleUpdataer = useTitle("티처캔 | 타이머")

  const isPopup = useReactiveVar(isPopupVar)

  const { mode } = useParams()

  const localHours = parseInt(localStorage.getItem("countdownHours")) ? parseInt(localStorage.getItem("countdownHours")) : 0
  const localMinutes = parseInt(localStorage.getItem("countdownMinutes")) ? parseInt(localStorage.getItem("countdownMinutes")) : 0
  const localSeconds = parseInt(localStorage.getItem("countdownSeconds")) ? parseInt(localStorage.getItem("countdownSeconds")) : 0

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [timerStatus, setTimerStatus] = useState("pause")

  const [bgMusic, setBgMusic] = useState(undefined)
  const [alarmAudio, setAlarmAudio] = useState(undefined)
  const [alremMp3, setAlremMp3] = useState(undefined)

  const [errMsg, setErrMsg] = useState(undefined)

  const [reset, setReset] = useState(1)

  const [screen, setScreen] = useState("small")

  const onClickSettingBtn = () => {
    inPopup("timerSetting")
  }

  useEffect(() => {
    if (timerStatus === "play") {
      if (bgMusicMp3) {
        playMusicFn(bgMusicMp3)
      }
      if (mode === "countup") {
        const countup = setInterval(() => {
          if (seconds < 60) {
            setSeconds(prev => prev + 1)
          }
          if (seconds === 59) {
            setSeconds(0)
            if (minutes === 59) {
              setMinutes(0)
              setHours(prev => prev + 1)
            } else {
              setMinutes(prev => prev + 1)
            }
          }
        }, [1000])

        return () => clearInterval(countup)
      } else if (mode === 'countdown') {
        const countdown = setInterval(() => {
          if (seconds > 0) {
            setSeconds(prev => prev - 1)
          }
          if (seconds === 0) {
            setSeconds(59)
            if (minutes === 0) {
              setMinutes(59)
              setHours(prev => prev - 1)
            } else {
              setMinutes(prev => prev - 1)
            }
          }
        }, [1000])
        if (hours === 0 && minutes === 0 && seconds === 0) {
          if (bgMusicMp3) {
            stopMusicFn(bgMusicMp3)
          }
          if (alremMp3) {
            playMusicFn(alremMp3)
          }
          inPopup("finishCountdown")
          clearInterval(countdown)
          setReset(prev => prev + 1)
        }

        return () => clearInterval(countdown)
      }
    } else {
      if (bgMusicMp3) {
        pauseMusicFn(bgMusicMp3)
      }
    }
  }, [timerStatus, hours, minutes, seconds])

  useEffect(() => {
    if (bgMusicMp3) {
      stopMusicFn(bgMusicMp3)
    }
    if (mode === "countup") {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
      if (timerStatus === "play") {
        setTimerStatus("pause")
      }
    }
    if (mode === "countdown") {
      setHours(localHours)
      setMinutes(localMinutes)
      setSeconds(localSeconds)
      if (timerStatus === "play") {
        setTimerStatus("pause")
      }
    }
  }, [reset])

  useEffect(() => {
    setBgMusic(undefined)
    setBgMusicMp3(undefined)
    if (bgMusicMp3) {
      stopMusicFn(bgMusicMp3)
    }
    if (mode === "countdown") {
      setHours(localHours)
      setMinutes(localMinutes)
      setSeconds(localSeconds)
    } else {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
    setTimerStatus("pause")
  }, [mode])

  useEffect(() => {
    if (bgMusic) {
      setBgMusicMp3(new Audio(bgMusic.audio))
    } else {
      setBgMusicMp3(undefined)
    }
  }, [bgMusic])

  useEffect(() => {
    if (alarmAudio) {
      setAlremMp3(new Audio(alarmAudio.audio))
    } else {
      setAlremMp3(undefined)
    }
  }, [alarmAudio])

  return (
    <BasicContainer menuItem={true} screen={screen} page="timer">
      <Container>
        <TopContaner>
          <Title isFull={screen === "full"}>{screen === "small" ? "타이머" : "11"}</Title>
          {timerStatus === "pause" && <SettingIcon screen={screen} onClick={onClickSettingBtn}><FcSettings /></SettingIcon>}
        </TopContaner>
        <SetModeContainer>
          <Link to={`${routes.timer}/countup`}>
            <ModeBtn selected={mode === "countup"}>COUNT UP</ModeBtn>
          </Link>
          <Link to={`${routes.timer}/countdown`}>
            <ModeBtn selected={mode === "countdown"}>COUNT DOWN</ModeBtn>
          </Link>
        </SetModeContainer>
        <TimerContainer hours={hours} minutes={minutes} seconds={seconds} setScreen={setScreen} screen={screen} />
        <TimerBtnContainer
          timerStatus={timerStatus}
          setTimerStatus={setTimerStatus}
          setReset={setReset}
          setErrMsg={setErrMsg}
          localHours={localHours}
          localMinutes={localMinutes}
          localSeconds={localSeconds}
          mode={mode}
          screen={screen}
          bgMusic={bgMusic}
          alarmAudio={alarmAudio}
        />
      </Container>
      {isPopup === "timerSetting" && <TimerSetting
        mode={mode}
        hours={hours}
        setHours={setHours}
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
        setErrMsg={setErrMsg}
        setBgMusic={setBgMusic}
        bgMusic={bgMusic}
        alarmAudio={alarmAudio}
        setAlarmAudio={setAlarmAudio}
      />}
      {isPopup === "finishCountdown" &&
        <FinishCountdonw
          alremMp3={alremMp3}
        />}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} time={3000} type="error" />}
    </BasicContainer>
  );
}

export default TimerSecond;