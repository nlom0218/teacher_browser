import { useState } from "react";
import styled from 'styled-components';

const SCountUpDisplay = styled.div``

export const CountUpDisplay = (props) => {
  return (
    <SCountUpDisplay>
      <span>{(props.time.h >= 10) ? props.time.h : "0" + props.time.h}</span>&nbsp;:&nbsp;
      <span>{(props.time.m >= 10) ? props.time.m : "0" + props.time.m}</span>&nbsp;:&nbsp;
      <span>{(props.time.s >= 10) ? props.time.s : "0" + props.time.s}</span>
    </SCountUpDisplay>)
};

export const CountDownDisplay = (props) => {
  return (
    <div>
      <span>{(props.time.h >= 10) ? props.time.h : "0" + props.time.h}</span>&nbsp;:&nbsp;
      <span>{(props.time.m >= 10) ? props.time.m : "0" + props.time.m}</span>&nbsp;:&nbsp;
      <span>{(props.time.s >= 10) ? props.time.s : "0" + props.time.s}</span>
    </div>
  )
};

export const BtnStartCountUp = (props) => {
  return (
    <div>
      <button onClick={props.start} className='stopwatch-btn'>시작</button>
    </div>
  )
};

export const BtnStartCountDown = (props) => {
  return (
    <div>
      <button onClick={props.start}>{props.text}</button>
    </div>
  )
}
