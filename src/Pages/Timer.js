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

  const BtnComponent = (props) => {
    return (
      <div>
        <button onClick={props.start} className='stopwatch-btn'>START</button>
      </div>
    )
  };

  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  const start = () => {
    run(); setInterval(run, 10);
  }

  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
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

  return (<BasicContainer menuItem={true}>
    <div className="main-section">
      <div className='clock-holder'>
        <div className='stopwatch'>
          <DisplayComponent time={time} />
          <BtnComponent start={start} />
        </div>
      </div>
    </div>
  </BasicContainer>);
}

export default Timer;