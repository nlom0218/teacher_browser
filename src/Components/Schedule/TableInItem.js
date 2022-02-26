import React, { useState } from "react";
import styled from "styled-components";
import { CardFadeIn } from "../../Animations/Fade";
import RegisterScheduleOne from "./RegisterScheduleOne";
import { customMedia } from "../../styles";

const TableItem = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: ${(props) => props.theme.cardBg};
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr;
  opacity: ${(props) => (props.hoverContainer ? 0.6 : 1)};
`;

const SubjectName = styled.div`
  align-self: center;
  justify-self: center;
  font-size: 73%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 10px;
  margin: 0px 0.625rem;
  background-color: ${props => props.color};
  ${customMedia.greaterThan("tablet")`
    font-size: ${(props) => props.fontSize}em;
    font-size: ${(props) => props.fontSize}rem;
  `}
  position: relative;
`;

const Span = styled.span`
`;

const Color = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 5px;
  border-radius: 0.3125rem;
  width: 100%;
  height: ${props => props.fontSize / 2 * 16}px;
  height: ${props => props.fontSize / 2}rem;
  background-color: ${props => props.color};
`

const HoverContainer = styled.div`
position: absolute;
font-size: 0.8rem;
font-size: 0.8em;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: ${(props) => props.theme.cardHoverBg};
border-radius: 5px;
border-radius: 0.3125rem;
animation: ${CardFadeIn} 0.6s ease forwards;
color: ${(props) => props.theme.bgColor};
display: grid;
grid-template-columns: ${props => props.memo ? "auto 1fr" : "auto"};
justify-items: ${props => !props.memo && "center"};
align-items: center;
padding: 0px 10px;
padding: 0rem 0.625rem;
column-gap: 5px;
column-gap: 0.3125rem;
svg {
  display: flex;
}
`;

const Memo = styled.div`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
justify-self: flex-start;
`

const TableInItem = ({ num, subName, index, color, memo, fontSize }) => {
  const [hoverContainer, setHoverContainer] = useState(false);

  const onMouseEnter = () => {
    setHoverContainer(true);
  };
  const onMouseLeave = () => {
    setHoverContainer(false);
  };

  return (
    <TableItem
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      index={index}
      color={color}
    >
      <SubjectName
        fontSize={fontSize}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Span>{subName}</Span>
        <Color color={color} fontSize={fontSize}></Color>
      </SubjectName>
      {hoverContainer ? (
        <HoverContainer memo={memo}>
          <RegisterScheduleOne num={num} />
          {memo && <Memo>{memo}</Memo>}
        </HoverContainer>
      ) : null}
    </TableItem>
  );
};

export default TableInItem;
