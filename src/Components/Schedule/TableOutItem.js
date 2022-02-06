import React, { useState } from "react";
import styled from "styled-components";
import { CardFadeIn } from "../../Animations/Fade";

const TableItem = styled.div`
  position: relative;
  height: 100%;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: lightblue;
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  grid-template-rows: 1fr;
  opacity: ${(props) => (props.hoverContainer ? 0.6 : 1)};
`;
const TimeUp = styled.div`
  position: absolute;
  left: 5%;
  top: 5%;
  padding: 5px;
  padding: 0.3125rem;
  font-size: 0.6rem;
  font-size: 0.6em;
  opacity: 0.6;
`;
const TimeDown = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
  padding: 5px;
  padding: 0.3125rem;
  font-size: 0.6rem;
  font-size: 0.6em;
  opacity: 0.6;
`;

const SubjectName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
  line-height: 300%;
  font-size: ${(props) => props.fontSize}em;
  font-size: ${(props) => props.fontSize}rem;
`;

const HoverContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  font-size: 0.8rem;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-bottom: 1.875rem;
  padding-bottom: 30px;
  align-items: flex-end;
  background-color: ${(props) => props.theme.cardHoverBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${CardFadeIn} 0.6s ease forwards;
  color: ${(props) => props.theme.bgColor};
`;

const TableOutItem = ({
  item,
  index,
  color,
  tag,
  fontSize,
  setFontSize,
  viewTime,
  setViewTime,
}) => {
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
      {viewTime === true ? (
        <React.Fragment>
          <TimeUp>{tag[0]}</TimeUp>
          <TimeDown>{tag[1]}</TimeDown>
        </React.Fragment>
      ) : null}

      <SubjectName
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        fontSize={fontSize}
        setFontSize={setFontSize}
      >
        {item}
        {hoverContainer === true ? (
          <HoverContainer>{tag[0]}</HoverContainer>
        ) : null}
      </SubjectName>
    </TableItem>
  );
};

export default TableOutItem;
