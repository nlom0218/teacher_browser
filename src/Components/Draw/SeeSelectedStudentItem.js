import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useMe from '../../Hooks/useMe';
import { customMedia } from '../../styles';
import bg1 from "../../image/DrawRandomImg/drawImage1.png"
import bg2 from "../../image/DrawRandomImg/drawImage2.png"
import bg3 from "../../image/DrawRandomImg/drawImage3.png"
import bg4 from "../../image/DrawRandomImg/drawImage4.png"
import bg5 from "../../image/DrawRandomImg/drawImage5.png"
import bg6 from "../../image/DrawRandomImg/drawImage6.png"

const StudentItem = styled.div`
  min-height : 160px;
  min-height : 10rem;
  display : flex;
  justify-content : center;
  align-items : center;
  border: 1px solid ${props => props.theme.cardBorder};
  background-color: ${props => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
  border-radius : 5px;
  border-radius : 0.3125rem;
  font-size : ${props => props.fontSize + 1}em;
  font-size : ${props => props.fontSize + 1}rem;
  position : relative;
  text-align: center;
  ${customMedia.greaterThan("desktop")`
    grid-column : ${props => props.pickNum === 1 && "2 / 3"};
  `}
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

const seeNameAni = keyframes`
  from { 
    opacity : 0;
  }
  to {
    opacity : 1;
  }
`

const Name = styled.div`
  opacity: ${props => props.pickType === "hide" && 0};
  animation : ${props => !props.seeHideBox && seeNameAni} 1s ease forwards;
`


const HideBox = styled.div`
  cursor : pointer;
  font-size : 1.25em;
  font-size : 1.25rem;
  position : absolute;
  color : ${props => props.theme.bgColor};
  background: ${props => `url(${props.randomImg})`};
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

const SeeSelectedStudentItem = ({ item, fontSize, pickNum, pickType }) => {
  const [randomImg, setRandomImg] = useState(bg1)
  const me = useMe()

  const [seeHideBox, setSeeHideBox] = useState(true)

  const onClickHideBox = () => setSeeHideBox(false)

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 6) + 1
    if (randomNum === 1) {
      setRandomImg(bg1)
    } else if (randomNum === 2) {
      setRandomImg(bg2)
    } else if (randomNum === 3) {
      setRandomImg(bg3)
    } else if (randomNum === 4) {
      setRandomImg(bg4)
    } else if (randomNum === 5) {
      setRandomImg(bg5)
    } else if (randomNum === 6) {
      setRandomImg(bg6)
    }
  }, [])

  return (<StudentItem pickNum={pickNum} fontSize={fontSize} bgTheme={me?.bgTheme}>
    <Name pickType={pickType} seeHideBox={seeHideBox}>{item}</Name>
    {pickType === "hide" &&
      <HideBox
        randomImg={randomImg}
        seeHideBox={seeHideBox}
        onClick={onClickHideBox}
      ></HideBox>
    }
  </StudentItem>);
}

export default SeeSelectedStudentItem;