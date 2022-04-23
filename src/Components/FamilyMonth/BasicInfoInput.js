import React from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
  input {
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
`;

const BasicInfoInput = ({ register, userEmail }) => {
  console.log(userEmail);
  return (
    <Container>
      {!userEmail && (
        <InputLayout>
          <FaUserAlt />
          <input
            placeholder="로그인을 하지 않았습니다. 작성자의 닉네임을 입력하세요.😃"
            {...register("email")}
          />
        </InputLayout>
      )}
      <InputLayout>
        <BsFillPencilFill />
        <input
          placeholder="제목을 입력하세요.😃(최대 40자)"
          {...register("title")}
        />
      </InputLayout>
    </Container>
  );
};

export default BasicInfoInput;
