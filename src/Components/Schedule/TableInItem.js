import React, { useState } from 'react';
import styled from 'styled-components';
import { CardFadeIn } from '../../Animations/Fade';


const TableItem = styled.div`
  position: relative;
  height: 100%;
  border: 1px solid ${props => props.theme.cardBorder};
  background-color: ${props => props.theme.cardBg};
  //background-color: ${props => props.color};
  

  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr;
  opacity: ${props => props.hoverContainer ? 0.6 : 1};
`

const SubjectName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
  line-height: 250%;
`

const HoverContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
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
  
`



const TableInItem = ({ item, index, color, tag}) => {


  const [hoverContainer, setHoverContainer] = useState(false)

  const onMouseEnter = () => {
    setHoverContainer(true)
  }
  const onMouseLeave = () => {
    setHoverContainer(false)
  }

  return (<TableItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} index={index} color={color}>
    <SubjectName onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >{item}
    {hoverContainer===true ? <HoverContainer>{index}{tag}</HoverContainer>:null}
  
    </SubjectName>

  


    
  </TableItem >);
}

export default TableInItem;

