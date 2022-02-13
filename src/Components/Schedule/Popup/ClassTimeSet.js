import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import useMe, { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { outPopup } from "../../../apollo";
import DetailStartTime from "./DetailStartTime";

const RegisterForm = styled.form`
  width: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr;
  align-items: center;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`;
const ClassTimeSet = ({ timeSet, setTimeSet }) => {
  const me = useMe();

  const [preventSubmit, setPreventSubmit] = useState(false);

  const { register, handleSubmit, setValue, getValues } = useForm();
  const onSubmit = (data) => {
    const {} = data;
    setPreventSubmit(true);
    outPopup();
  };
  return (
    <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <DetailStartTime timeSet={timeSet} setTimeSet={setTimeSet} />
      </RegisterForm>
    </PopupContainer>
  );
};

export default ClassTimeSet;
