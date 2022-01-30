import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import { Btn, BtnContainer, BtnSpan } from '../Components/Timer/Btn';
import { TimerContainer, TimerInnerFrame, TimerOuterFrame } from '../Components/Timer/TimeDisplay';

const Timer = () => {
  // Basic Setting
  let [isRunning, setIsRunning] = useState(false);
  let [isCountdownTimer, setIsCountdownTimer] = useState(false);
  let [intervalId, setIntervalId] = useState(null);

  // Stopwatch
  let [milliseconds, setMilliseconds] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let newMilliseconds = milliseconds;
  let newSeconds = seconds;
  let newMinutes = minutes;

  useEffect(() => {
    if (!isCountdownTimer && isRunning) {
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
    setIsRunning(false);
  };

  const startStopwatch = () => {
    setIsRunning(true);
    setIsCountdownTimer(false);
  };

  const resetTime = () => {
    setMilliseconds(() => 0);
    setSeconds(() => 0);
    setMinutes(() => 0);
    setMillisecondsLeft(() => 0);
    setSecondsLeft(() => 0);
    setMinutesLeft(() => 0);
    setIsRunning(false);
  };

  const timeRecordsFromLocal = JSON.parse(localStorage.getItem('timeRecords')) ? JSON.parse(localStorage.getItem('timeRecords')) : [];

  const saveTime = () => {
    const timestamp = Date.now();
    const savedTime = { timeId: timestamp, minutes, seconds, milliseconds };
    const newTimeRecords = [...timeRecordsFromLocal, savedTime];
    localStorage.setItem('timeRecords', JSON.stringify(newTimeRecords));
  };

  let timeRecords = [];

  // CountdownTimer
  let [millisecondsLeft, setMillisecondsLeft] = useState(0);
  let [secondsLeft, setSecondsLeft] = useState(10);
  let [minutesLeft, setMinutesLeft] = useState(1);
  let newMillisecondsLeft = millisecondsLeft;
  let newSecondsLeft = secondsLeft;
  let newMinutesLeft = minutesLeft;

  useEffect(() => {
    if (isCountdownTimer && isRunning) {
      const id = setInterval(() => {
        if (millisecondsLeft > 0) {
          newMillisecondsLeft = millisecondsLeft--;
          setMillisecondsLeft(millisecondsLeft => newMillisecondsLeft);
        } else {
          setMillisecondsLeft(millisecondsLeft => 100);
          newSecondsLeft = secondsLeft--;
          setMillisecondsLeft(millisecondsLeft => newSecondsLeft);
          setSeconds(secondsLeft => newSecondsLeft);
        }
        if (secondsLeft <= 0) {
          newMinutesLeft = minutesLeft--;
          setSecondsLeft(() => newMinutesLeft);
          setMinutesLeft(minutesLeft => newMinutesLeft);
        }
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const startCountdown = () => {
    setIsRunning(true);
    setIsCountdownTimer(true);
  }

  // For display

  let millisecondsDisplay = String(milliseconds).padStart(2, '0');
  let secondsDisplay = String(seconds).padStart(2, '0');
  let minutesDisplay = String(minutes).padStart(2, '0');

  let millisecondsLeftDisplay = String(millisecondsLeft).padStart(2, '0');
  let secondsLeftDisplay = String(secondsLeft).padStart(2, '0');
  let minutesLeftDisplay = String(minutesLeft).padStart(2, '0');

  return (
    <BasicContainer menuItem={true}>
      <TimerContainer>
        <TimerOuterFrame gauge={seconds}>
          {!isCountdownTimer ?
            // 1. Stopwatch Display
            <TimerInnerFrame>
              <span style={{ color: "white" }}>{minutesDisplay}</span>
              &nbsp;:&nbsp;
              <span style={{ color: "white" }}>{secondsDisplay}</span>
              &nbsp;&nbsp;
              <span style={{ padding: "5px", border: "1px solid grey", fontSize: "30px", color: "white" }}>{millisecondsDisplay}</span>
            </TimerInnerFrame> :
            // 2. CountdownTimer Display
            <TimerInnerFrame>
              <span style={{ color: "yellow" }}>{minutesLeftDisplay}</span>
              &nbsp;:&nbsp;
              <span style={{ color: "yellow" }}>{secondsLeftDisplay}</span>
              &nbsp;&nbsp;
              <span style={{ padding: "5px", border: "1px solid grey", fontSize: "30px", color: "white" }}>{millisecondsLeftDisplay}</span>
            </TimerInnerFrame>
          }
        </TimerOuterFrame>
        <BtnContainer>
          <Btn onClick={isRunning ? pause : startStopwatch}>
            <BtnSpan>
              {isRunning ? "PAUSE" : "START"}
            </BtnSpan>
          </Btn>
          {<Btn onClick={resetTime}>
            <BtnSpan>
              RESET
            </BtnSpan>
          </Btn>}
          {milliseconds + seconds + minutes > 0 ? <Btn onClick={saveTime}>
            <BtnSpan>
              SAVE
            </BtnSpan>
          </Btn> : null}
        </BtnContainer>
        <BtnContainer style={{ width: "80%" }}>
          <Btn onClick={startCountdown}>
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
          {/* {timeRecordsFromLocal ?
            <li>
              <span> {timeRecordsFromLocal[0].minutes} m &nbsp;&nbsp; {timeRecordsFromLocal[0].seconds} s &nbsp;&nbsp;
                {timeRecordsFromLocal[0].milliseconds} ms
              </span>
            </li> : null} */}
        </div>
      </TimerContainer >
    </BasicContainer>
  );
}

export default Timer;