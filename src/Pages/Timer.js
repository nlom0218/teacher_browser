import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import { Btn, BtnContainer, BtnSpan } from '../Components/Timer/Btn';
import { TimerContainer, TimerInnerFrame, TimerOuterFrame } from '../Components/Timer/TimeDisplay';

const Timer = () => {
  // Stopwatch (Countup)

  let [isRunning, setIsRunning] = useState(false);
  let [intervalId, setIntervalId] = useState(null);
  let [milliseconds, setMilliseconds] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let newMilliseconds = milliseconds;
  let newSeconds = seconds;
  let newMinutes = minutes;

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        newMilliseconds = milliseconds++;
        setMilliseconds(milliseconds => newMilliseconds);
        if (milliseconds >= 100) {
          newSeconds = ++seconds;
          milliseconds = 0;
          setSeconds(seconds => newSeconds);
        }
        if (seconds > 59) {
          newMinutes = ++minutes;
          seconds = 0;
          setMinutes(minutes => newMinutes);
        }
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const pause = () => {
    // FIXME:
    setIsRunning(false);
    // clearInterval(countUp);
  };

  const startStopwatch = () => {
    // countUp();
    setIsRunning(true);
    // setInterval(countUp, 10);
  };

  const resetTime = () => {
    setMilliseconds(() => 0);
    setSeconds(() => 0);
    setMinutes(() => 0);
    setIsRunning(false);
  };

  const timeRecordsFromLocal = JSON.parse(localStorage.getItem('timeRecords')) ? JSON.parse(localStorage.getItem('timeRecords')) : [];

  const saveTime = () => {
    const timestamp = Date.now();
    const savedTime = { timeId: timestamp, minutes, seconds, milliseconds };
    const newTimeRecord = [...timeRecordsFromLocal, savedTime];
    localStorage.setItem('timeRecords', JSON.stringify(newTimeRecord));
  };

  let timeRecords = [];


  // Timer (Countdown)
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
            <span style={{ color: "yellow" }}>{minutesDisplay}</span>
            &nbsp;:&nbsp;
            <span style={{ color: "yellow" }}>{secondsDisplay}</span>
            &nbsp;&nbsp;
            <span style={{ padding: "5px", border: "1px solid grey", fontSize: "30px", color: "grey" }}>{millisecondsDisplay}</span>
          </TimerInnerFrame>
        </TimerOuterFrame>
        <BtnContainer>
          <Btn onClick={isRunning ? pause : startStopwatch}>
            <BtnSpan>
              {isRunning ? "PAUSE" : "START"}
            </BtnSpan>
          </Btn>
          {isRunning ? <Btn onClick={resetTime}>
            <BtnSpan>
              RESET
            </BtnSpan>
          </Btn> : null}
          {milliseconds + seconds + minutes > 0 ? <Btn onClick={saveTime}>
            <BtnSpan>
              SAVE
            </BtnSpan>
          </Btn> : null}
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
        <div>
          {timeRecordsFromLocal ?
            <li>
              <span> {timeRecordsFromLocal.minutes} min &nbsp;&nbsp; {timeRecordsFromLocal.seconds} seconds &nbsp;&nbsp;
                {timeRecordsFromLocal.milliseconds} milliseconds </span>
            </li> : null}
        </div>
      </TimerContainer >
    </BasicContainer>
  );
}

export default Timer;