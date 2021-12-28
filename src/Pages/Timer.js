import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import CountUpDisplay from '../Components/Timer/CountUpStopwatch/CountUpDisplay';
import CountDownDisplay from '../Components/Timer/CountDownTimer/CountDownDisplay';
import BtnStartCountUp from '../Components/Timer/CountUpStopwatch/BtnStartCountUp';
import BtnStartCountDown from '../Components/Timer/CountDownTimer/BtnStartCountDown';
import ClockBackground from '../Components/Timer/ClockBackground';
import ClockContainer from '../Components/Timer/ClockContainer';
import CountUp from '../Components/Timer/CountUpStopwatch/CountUp';
import CountDownTitle from '../Components/Timer/CountDownTimer/CountDownTitle';

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