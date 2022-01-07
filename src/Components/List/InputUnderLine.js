import React from 'react';
import styled from 'styled-components';
import { inputLine } from '../../Animations/InputLine';

const SInputUnderLine = styled.div``

const LineBox = styled.div`
  position: relative;
`

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`


const InputUnderLine = ({ children, isEdit }) => {
  return (<SInputUnderLine>
    {children}
    {isEdit && <LineBox>
      <Line></Line>
    </LineBox>}
  </SInputUnderLine >);
}

export default InputUnderLine;