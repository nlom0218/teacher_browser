import React from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";

const SBackMenuBtn = styled.div`
  position: absolute;
  left: 10px;
  left: 0.625rem;
  top: 10px;
  top: 0.625rem;
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  transition: color 1s ease;
  z-index: 1;
`;

const PreviousPageBtn = () => {
  const navigate = useNavigate();
  const onClickBackBtn = () => {
    navigate(-1);
  };
  return (
    <SBackMenuBtn onClick={onClickBackBtn}>
      <IoArrowBackSharp />
    </SBackMenuBtn>
  );
};

export default PreviousPageBtn;
