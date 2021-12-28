import { useState } from "react";
import styled from 'styled-components';

const SCountDownDisplay = styled.div`
  font-size: 2rem;
  color: white;
  border: 1px solid yellow;
`;

const CountDownDisplay = ({ time }) => {
  return (
    <SCountDownDisplay>
      <span>{(time.h >= 10) ? time.h : "0" + time.h}</span>&nbsp;:&nbsp;
      <span>{(time.m >= 10) ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
      <span>{(time.s >= 10) ? time.s : "0" + time.s}</span>
    </SCountDownDisplay>
  )
};

export default CountDownDisplay;