import React from "react";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { AiOutlineEdit } from "react-icons/ai";

const Container = styled.div`
`;


const RegisterClassOneBtn = styled.div`
  justify-self: center;
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
`;

const RegisterScheduleOne = ({ num, item, color, tag }) => {
  const onClickRegisterClassOne = () => {
    inPopup("registerClass");
  };

  return (
    <Container>
      <RegisterClassOneBtn num={num} onClick={onClickRegisterClassOne}>
        <AiOutlineEdit />
      </RegisterClassOneBtn>
    </Container>
  );
};

export default RegisterScheduleOne;
