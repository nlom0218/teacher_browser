import React from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";

const SBackBtn = styled.div`
  position: absolute;
  left: 10px;
  left: 0.625rem;
  top: 10px;
  top: 0.625rem;
  cursor: pointer;
  svg {
    font-size: 24px;
    font-size: 1.5rem;
  }
`;

const BackBtn = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <SBackBtn onClick={onClickBtn}>
      <IoArrowBackSharp />
    </SBackBtn>
  );
};

export default BackBtn;
