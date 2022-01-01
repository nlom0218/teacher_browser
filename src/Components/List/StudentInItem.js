import React, { useState } from 'react';
import styled from 'styled-components';
import { CardFadeIn } from '../../Animations/Fade';
import { AiOutlineEdit } from "react-icons/ai";
import { BsPerson, BsPersonDash } from "react-icons/bs";
import { customMedia } from '../../styles';
import useMedia from '../../Hooks/useMedia';

const Student = styled.div`
  position: relative;
  min-height: 120px;
  max-height: 120px;
  border: 1px solid ${props => props.theme.cardBorder};
  background-color: ${props => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 10px;
  padding: 0.625rem;
  opacity: ${props => props.hoverContainer ? 0.6 : 1};
  ${customMedia.greaterThan("tablet")`
    min-height: 120px;
    max-height: 120px;
  `}
  ${customMedia.greaterThan("desktop")`
    min-height: 160px;
    max-height: 160px;
  `}
`

const StudentName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
`

const HoverContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  ${customMedia.greaterThan("desktop")`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 1.875rem;
    padding-bottom: 30px;
    align-items: flex-end;
    background-color: ${props => props.theme.cardHoverBg};
    border-radius: 5px;
    border-radius: 0.3125rem;
    animation: ${CardFadeIn} 0.6s ease forwards;
    color: ${props => props.theme.bgColor};
  `}
`

const BasicInfo = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const FnBtn = styled.div`
  justify-self: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  padding: 0px 10px;
  padding: 0rem 0.625rem;
  .fnBtn_icon {
    display: flex;
    padding: 5px;
    padding: 0.3125rem;
    border-radius: 50%;
    border: 1px solid ${props => props.theme.fontColor};
    cursor: pointer;
    ${customMedia.greaterThan("desktop")`
      border: 1px solid ${props => props.theme.bgColor};
    `}
  }
`

const StudentInItem = ({ item }) => {
  const media = useMedia();
  console.log(media);
  const [hoverContainer, setHoverContainer] = useState(false)

  const onMouseEnter = () => {
    if (media === "Mobile") {
      return
    }
    setHoverContainer(true)
  }
  const onMouseLeave = () => {
    if (media === "Mobile") {
      return
    }
    setHoverContainer(false)
  }
  return (<Student onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
    <StudentName hoverContainer={hoverContainer}>{item.studentName}</StudentName>
    {media !== "Desktop" ? <HoverContainer>
      <FnBtn>
        <div className="fnBtn_icon"><AiOutlineEdit /></div>
        <div className="fnBtn_icon"><BsPerson /></div>
        <div className="fnBtn_icon"><BsPersonDash /></div>
      </FnBtn>
    </HoverContainer>
      : (
        hoverContainer && <HoverContainer>
          <FnBtn>
            <div className="fnBtn_icon"><AiOutlineEdit /></div>
            <div className="fnBtn_icon"><BsPerson /></div>
            <div className="fnBtn_icon"><BsPersonDash /></div>
          </FnBtn>
        </HoverContainer>
      )}
  </Student >);
}

export default StudentInItem;