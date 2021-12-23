import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import { CountUpDisplay, CountDownDisplay, BtnStartCountUp, BtnStartCountDown } from '../Components/Timer/TimeSet';
import styled from 'styled-components';

const ClockBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 600px;
  background-color: white;
  border-radius: 300px;
`;

const CountUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: 500px;
  height: 500px;
  border-radius: 500px;
  background-color: black;
  padding: 50px;
  color: lime;
  font-size: 4.5rem;
`;

const CountDownTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: 'white';
  border: 1px solid red;
`

const Timer = () => {

  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });

  const [timeLeft, setTimeLeft] = useState({ s: 10, m: 0, h: 0 });

  const startCountUp = () => {
    countUp();
    setInterval(countUp, 1000);
  }

  const startCountDown = () => {
    countDown();
    setInterval(countDown, 1000);
  }

  let updatedS = time.s, updatedM = time.m, updatedH = time.h;

  let updatedSLeft = timeLeft.s, updatedMLeft = timeLeft.m, updatedHLeft = timeLeft.h;

  const countUp = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    };
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    };
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const countDown = () => {

    if (updatedSLeft === 0) {
      updatedMLeft--;
      updatedSLeft += 60;
    };
    if (updatedMLeft === 0 && updatedSLeft === 0) {
      updatedHLeft--;
    };

    return setTimeLeft({ s: updatedSLeft, m: updatedMLeft, h: updatedHLeft });
  };

  return (<BasicContainer menuItem={true}>
    <ClockBackground>
      <ClockContainer>
        <CountUp>
          <CountUpDisplay time={time} />
          <BtnStartCountUp start={startCountUp} />
        </CountUp>
      </ClockContainer>
      <div className='count-downs'>
        <CountDownTitle>
          <span>카운트 다운</span>
        </CountDownTitle>
        <CountDownDisplay time={timeLeft} />
        <BtnStartCountDown time={timeLeft} text={'10초'} start={startCountDown} />
        <BtnStartCountDown time={timeLeft} text={'30초'} />
        <BtnStartCountDown time={timeLeft} text={'1분'} />
        <BtnStartCountDown time={timeLeft} text={'5분'} />
        <BtnStartCountDown time={timeLeft} text={'10분'} />
        <BtnStartCountDown time={timeLeft} text={'30분'} />
      </div>
    </ClockBackground>
  </BasicContainer>);
}

export default Timer;