import React from 'react';
import { useState } from 'react/cjs/react.development';
import styled, { keyframes } from 'styled-components';

const StudentItem = styled.div`
  grid-column : ${props => props.pickNum === 1 && "2 / 3"};
  min-height : 160px;
  min-height : 10rem;
  display : flex;
  justify-content : center;
  align-items : center;
  border : 1px solid ${props => props.theme.fontColor};
  transition : border 1s ease;
  border-radius : 5px;
  border-radius : 0.3125rem;
  font-size : ${props => props.fontSize +1}em;
  font-size : ${props => props.fontSize +1}rem;
  position : relative;
`

const hideBoxHoverAni = keyframes`
  0% {
    top : 0;
    bottom : 0;
  }
  50% {
    top : -20px;
    top : -1.25rem;
    bottom : 20px;
    bottom : 1.25rem;
  }
  100% {
    top : 0;
    bottom : 0;
  }

`

const hideBoxClickAni = keyframes`
  from { 
    top : 0;
    bottom : 0;
    opacity : 1;
  }
  to {
    top : -100%;
    bottom : 100%;
    opacity : 0;
    z-index : -10;
  }
`


const HideBox = styled.div`
  cursor : pointer;
  font-size : 1.25em;
  font-size : 1.25rem;
  position : absolute;
  color : ${props => props.theme.bgColor};
  background-color : ${props => props.theme.btnBgColor};
  transition : background-color 1s ease, color 1s ease;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0;
  display : flex;
  justify-content : center;
  align-items : center;
  animation : ${props => !props.seeHideBox && hideBoxClickAni} 1s ease forwards;
`

const SeeSelectedStudentItem = ( {item, fontSizeAll, pickNum, pickType} ) => {
    const [seeHideBox, setSeeHideBox ] = useState(true)

    const onClickHideBox = () => setSeeHideBox(false)

    return (<StudentItem pickNum={pickNum} fontSize={fontSizeAll}>
    {item}
    {pickType === "hide" && 
    <HideBox 
    seeHideBox={seeHideBox} 
    onClick={onClickHideBox}
    > 
    
    클릭하여 확인 </HideBox>}
    </StudentItem>);
}

export default SeeSelectedStudentItem;