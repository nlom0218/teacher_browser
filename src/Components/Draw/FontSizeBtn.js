import React from "react";
import styled from "styled-components";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";

const Container = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  svg {
    font-size: 2em;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const FontSizeBtn = ({ setFontSizeAll, fontSizeAll }) => {
  const onClickSizeBtn = (type) => {
    if (type === "plus") {
      setFontSizeAll((prev) => prev + 0.0625 * 2);
    }
    if (type === "minus" && fontSizeAll > 1) {
      setFontSizeAll((prev) => prev - 0.0625 * 2);
    }
  };
  return (
    <Container>
      <div> 글씨크기 조절 </div>
      <AiFillMinusSquare onClick={() => onClickSizeBtn("minus")} />
      <AiFillPlusSquare onClick={() => onClickSizeBtn("plus")} />
    </Container>
  );
};

export default FontSizeBtn;
