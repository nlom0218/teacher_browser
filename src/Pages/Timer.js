import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import { Btn, BtnContainer, BtnSpan } from '../Components/Timer/Btn';
import { TimerContainer, TimerInnerFrame, TimerOuterFrame } from '../Components/Timer/TimeDisplay';

const Timer = () => {

  // Stopwatch (Countup)

  let [isRunning, setIsRunning] = useState(false);
  let [milliseconds, setMilliseconds] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let newMilliseconds = milliseconds;
  let newSeconds = seconds;
  let newMinutes = minutes;

  const countUp = () => {
    newMilliseconds = milliseconds++;
    setMilliseconds(newMilliseconds);

    if (milliseconds >= 100) {
      newSeconds = ++seconds;
      milliseconds = 0;
      setSeconds(newSeconds);
    }

    if (seconds > 59) {
      newMinutes = ++minutes;
      seconds = 0;
      setMinutes(newMinutes);
    }
  };

  const pause = () => {
    // FIXME:
    setIsRunning(false);
    clearInterval(countUp);
  };

  const startStopwatch = () => {
    countUp();
    setIsRunning(true);
    setInterval(countUp, 10);
  };

  // Timer (Countdown)
  // TODO:
  let [millisecondsLeft, setMillisecondsLeft] = useState(0);
  let [secondsLeft, setSecondsLeft] = useState(10);
  let [minutesLeft, setMinutesLeft] = useState(0);
  let newMillisecondsLeft = millisecondsLeft;
  let newSecondsLeft = secondsLeft;
  let newMinutesLeft = minutesLeft;

  const countDown = () => {
    setInterval(setSecondsLeft(secondsLeft => secondsLeft - 1), 1000);
    console.log(secondsLeft);
  }

  // For display

  let millisecondsDisplay = String(milliseconds).padStart(2, '0');
  let secondsDisplay = String(seconds).padStart(2, '0');
  let minutesDisplay = String(minutes).padStart(2, '0');

  return (
    <BasicContainer menuItem={true}>
      <TimerContainer>
        <TimerOuterFrame gauge={seconds}>
          <TimerInnerFrame>
            <span style={{ color: "limegreen" }}>{minutesDisplay}</span>
            &nbsp;:&nbsp;
            <span style={{ color: "red" }}>{secondsDisplay}</span>
            &nbsp;:&nbsp;
            <span style={{ color: "yellow" }}>{millisecondsDisplay}</span>
          </TimerInnerFrame>
        </TimerOuterFrame>
        <BtnContainer>
          <Btn onClick={isRunning ? pause : startStopwatch}>
            <BtnSpan>
              {isRunning ? "PAUSE" : "START"}
            </BtnSpan>
          </Btn>
          <Btn>
            <BtnSpan>
              RESET
            </BtnSpan>
          </Btn>
        </BtnContainer>
        <BtnContainer style={{ width: "80%" }}>
          <Btn onClick={countDown}>
            <BtnSpan>1분</BtnSpan>
          </Btn>
          <Btn>
            <BtnSpan>3분</BtnSpan>
          </Btn>
          <Btn>
            <BtnSpan>5분</BtnSpan>
          </Btn>
          <Btn>
            <BtnSpan>10분</BtnSpan>
          </Btn>
          <Btn>
            <BtnSpan>30분</BtnSpan>
          </Btn>
        </BtnContainer>
      </TimerContainer >
    </BasicContainer>
  );
}

export default Timer;