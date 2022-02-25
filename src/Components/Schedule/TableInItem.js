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
  text-align: center;
  align-self: center;
  overflow: hidden;
  font-size: 73%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0px 10px;
  padding: 0px 0.625rem;
  ${customMedia.greaterThan("tablet")`
    font-size: ${(props) => props.fontSize}em;
    font-size: ${(props) => props.fontSize}rem;
  `}
`;
const Span = styled.span`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const HoverContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding: 0px 10px;
  padding: 0rem 0.625rem;
  column-gap: 5px;
  column-gap: 0.3125rem;
`;

const Memo = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  justify-self: flex-start;
`

const TableInItem = ({ num, subName, index, color, memo, fontSize }) => {
  const [hoverContainer, setHoverContainer] = useState(false);
  const [itemPick, setItemPick] = useState(undefined);

  const onMouseEnter = () => {
    setHoverContainer(true);
  };
  const onMouseLeave = () => {
    setHoverContainer(false);
  };

  const onClickItem = (item) => {
    setItemPick(item);
    localStorage.setItem("classPick", item);
  };

  return (
    <TableItem
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      index={index}
      color={color}
    >
      <SubjectName
        subName={subName}
        color={color}
        fontSize={fontSize}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={() => onClickItem(num)}
      >
        <Span color={color}>{subName}</Span>
        {hoverContainer ? (
          <HoverContainer memo={memo}>
            <RegisterScheduleOne
              num={num}
              subName={subName}
              color={color}
            />
            {memo && <Memo>{memo}</Memo>}
          </HoverContainer>
        ) : null}
      </SubjectName>
    </TableItem>
  );
};

export default TableInItem;
