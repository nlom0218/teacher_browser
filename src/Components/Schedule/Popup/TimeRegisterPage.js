import React, { useState } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import useMe, { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { outPopup } from "../../../apollo";
import { UPDATE_USER_MUTATION } from "../../../Graphql/User/mutation";
import { DetailTitle } from "../../List/styled/DetailStudent";
const RegisterForm = styled.form`
  width: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`;
const LayOut = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 5px;
  row-gap: 0.3125rem;
  font-size: 1.2em;
  font-size: 1.2rem;
  text-align: center;
  justify-items: center;
`;
const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 70%;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  background-color: tomato;
`;
const AddTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const BtnFrame = styled.div`
  width: 50%;
  justify-self: center;
  padding: 20px;
  padding: 1.25rem;
`;

const TimeRegisterPage = () => {
  const me = useMe();

  const { register, handleSubmit, setValue, getValues } = useForm();
  const onSubmit = (data) => {};
  const onCompleted = () => {
    onChangeInput();
    outPopup();
  };

  const onChangeInput = () => {};

  return (
    <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <LayOut>
          <div></div>
          <DetailTitle>시작시간</DetailTitle>
          <DetailTitle>종료시간</DetailTitle>
          <DetailTitle>1교시</DetailTitle>
          <InputLayout datatype="HH:mm"></InputLayout>
          <InputLayout datatype="HH:mm"></InputLayout>

          <DetailTitle>2교시</DetailTitle>
          <InputLayout></InputLayout>
          <InputLayout></InputLayout>
          <DetailTitle>3교시</DetailTitle>
          <InputLayout></InputLayout>
          <InputLayout></InputLayout>
          <DetailTitle>4교시</DetailTitle>
          <InputLayout></InputLayout>
          <InputLayout></InputLayout>
          <DetailTitle>5교시</DetailTitle>
          <InputLayout></InputLayout>
          <InputLayout></InputLayout>
          <DetailTitle>6교시</DetailTitle>
          <InputLayout></InputLayout>
          <InputLayout></InputLayout>
        </LayOut>
        <BtnFrame>
          {" "}
          <AddTagBtn onClick={onCompleted}>완료</AddTagBtn>
        </BtnFrame>
      </RegisterForm>
    </PopupContainer>
  );
};

export default TimeRegisterPage;
