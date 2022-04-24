import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const Box = styled.div`
  height: 40px;
  height: 2.5rem;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  border-radius: 0.625rem;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const ColorBox = ({ color, bgColor, setBgColor }) => {
  const onClickBox = () => {
    setBgColor(color);
  };
  return (
    <Box color={color} onClick={onClickBox}>
      {bgColor === color && <FaCheck />}
    </Box>
  );
};

export default ColorBox;
