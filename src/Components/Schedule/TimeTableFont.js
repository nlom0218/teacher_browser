import React from "react";
import styled from "styled-components";
import { AiFillPlusSquare, AiFillMinusSquare } from "react-icons/ai";
import useMedia from "../../Hooks/useMedia";

const Container = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  svg {
    cursor: pointer;
    font-size: 2em;
    font-size: 2rem;
  }
`;

const TimeTableFont = ({ setFontSize, fontSize }) => {
  const media = useMedia();
  const onClickSizeBtn = (type) => {
    if (type === "plus") {
      setFontSize((prev) => prev + 0.0625);
    }
    if (type === "minus" && fontSize > 1) {
      setFontSize((prev) => prev - 0.0625);
    }
  };

  return (
    <Container>
      <div> 글씨크기조절 </div>
      <AiFillMinusSquare onClick={() => onClickSizeBtn("minus")} />
      <AiFillPlusSquare onClick={() => onClickSizeBtn("plus")} />
    </Container>
  );
};

export default TimeTableFont;
