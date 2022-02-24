import React, { useState } from "react";
import styled from "styled-components";
import { CardFadeIn } from "../../Animations/Fade";

const TableItem = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid ${(props) => props.theme.cardBorder};
  background-color: lightblue;
  transition: border 1s ease, background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: grid;
  opacity: ${(props) => (props.hoverContainer ? 0.6 : 1)};
`;

const SubjectName = styled.div`
  text-align: center;
  align-self: center;
  overflow: hidden;
  font-size: ${(props) => props.fontSize}em;
  font-size: ${(props) => props.fontSize}rem;
`;

const HoverContainer = styled.div`
  display: grid;
  text-align: center;
  align-items: center;
  font-size: 0.8rem;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.cardHoverBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${CardFadeIn} 0.6s ease forwards;
  color: ${(props) => props.theme.bgColor};
`;

const TableOutItem = ({ item, index, color, tag, fontSize, setFontSize }) => {
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        fontSize={fontSize}
        setFontSize={setFontSize}
      >
        {item}
        {hoverContainer === true ? (
          <HoverContainer>{tag}</HoverContainer>
        ) : null}
      </SubjectName>
    </TableItem>
  );
};

export default TableOutItem;
