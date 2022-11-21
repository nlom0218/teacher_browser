import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import { DetailTitle } from "../../List/styled/DetailStudent";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`;
const InputNick = styled.input`
  padding: 10px;
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;
const InputWishbox = styled.input`
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  height: 100px;
`;

const InputWish = ({}) => {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {};
  return (
    <PopupContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <DetailTitle>닉네임</DetailTitle>
        <InputNick
          {...register("nickname", {
            required: true,
          })}
          type="string"
          defaultValue=""
        />{" "}
        <DetailTitle>소원쓰기</DetailTitle>
        <InputWishbox></InputWishbox>
      </FormContainer>
    </PopupContainer>
  );
};

export default InputWish;
