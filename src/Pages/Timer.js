import React, { useState, useEffect } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';

const Timer = () => {
  const DisplayComponent = (props) => {
    return (
      <div>
        <span>{(props.time.h >= 10) ? props.time.h : "0" + props.time.h}</span>&nbsp;:&nbsp;
        <span>{(props.time.m >= 10) ? props.time.m : "0" + props.time.m}</span>&nbsp;:&nbsp;
        <span>{(props.time.s >= 10) ? props.time.s : "0" + props.time.s}</span>&nbsp;:&nbsp;
        <span>{(props.time.ms >= 10) ? props.time.ms : "0" + props.time.ms}</span>
      </div>
    )
  };

  // COUNT UP

  const BtnStartCountUpComponent = (props) => {
    return (
      <div>
        <button onClick={props.start} className='stopwatch-btn'>Count Up</button>
      </div>
    )
  };

  const BtnStartCountDownComponent = (props) => {
    return (
      <div>
        <button onClick={props.start}>{props.text}</button>
      </div>
    )
  }

  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  const startCountUp = () => {
    countUp();
    setInterval(countUp, 10);
  }

  const startCountDown = () => {
    countDown();
    setInterval(countDown, 10);
  }

  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const countUp = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    };
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    };
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    };
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  // COUNT DOWN

  let [timeLeft, setTimeLeft] = useState({ ms: 0, s: 10, m: 0, h: 0 });

  const countDown = () => {

    console.log('COUNT DOWN');
    if (updatedM === 0 && updatedS === 0 && updatedMs === 0) {
      updatedH--;
      updatedM = 60;
    };
    if (updatedS === 0 && updatedMs === 0) {
      updatedM--;
      updatedS = 60;
    };
    if (updatedMs === 0) {
      updatedS--;
      updatedMs = 100;
    };
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  return (<BasicContainer menuItem={true}>
    <div className='main-section'>
      <div className='clock-holder'>
        <div className='stopwatch'>
          <DisplayComponent time={time} />
          <BtnStartCountUpComponent start={startCountUp} />
        </div>
      </div>
      <div className='count-downs'>
        <BtnStartCountDownComponent time={time} text={'10초'} onClick={() => startCountDown} />
        <BtnStartCountDownComponent time={time} text={'30초'} />
        <BtnStartCountDownComponent time={time} text={'1분'} />
        <BtnStartCountDownComponent time={time} text={'5분'} />
        <BtnStartCountDownComponent time={time} text={'10분'} />
        <BtnStartCountDownComponent time={time} text={'30분'} />
      </div>
    </div>
  </BasicContainer>);
}

export default Timer;