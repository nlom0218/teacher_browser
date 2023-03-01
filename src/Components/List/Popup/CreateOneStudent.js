import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { customMedia } from "../../../styles";
import ErrMsg from "./ErrMsg";
import GenderBtnContainer from "./GenderBtnContainer";

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: auto 1fr;
  `}
`;

const NameInput = styled.input`
  grid-column: 1 / -1;
  padding: 12px 20px;
  padding: 0.75rem 1.25rem;
  background-color: ${(props) => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    color: ${(props) => props.theme.fontColor};
    opacity: 0.8;
  }
`;

const SubmitInput = styled.input`
  text-align: center;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.6s ease;
  ${customMedia.greaterThan("tablet")`
    justify-self: flex-end;
  `}
`;

const CreateOneStudent = ({ createStudent, loading, email, existStudentArray, setErrorMsg }) => {
  const [errNameMsg, setErrNameMsg] = useState(undefined);
  const [gender, setGender] = useState(undefined);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    if (!gender) {
      setErrorMsg("성별 선택을 완료해 주세요. 😅");
      return;
    }
    if (loading) {
      return;
    }
    const { name } = data;
    createStudent({
      variables: {
        teacherEmail: email,
        studentString: [{ name, gender }],
      },
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <NameInput
        {...register("name", {
          required: true,
          onChange: () => setErrNameMsg(undefined),

          // 기존 생성된 학생들의 이름과 중복되면 errMsg생성
          validate: (name) => {
            const isExistName = existStudentArray.includes(name);
            if (isExistName) {
              setErrNameMsg(`${name}의 이름이 이미 존재합니다.`);
              return false;
            } else {
              return true;
            }
          },
        })}
        type="text"
        autoComplete="off"
        placeholder="학생 이름을 입력하세요."
        maxLength="12"
      />
      <GenderBtnContainer gender={gender} setGender={setGender} />
      <SubmitInput type="submit" value="생성" disabled={!isValid} />
      {errNameMsg && <ErrMsg errMsg={errNameMsg} />}
    </Form>
  );
};

export default CreateOneStudent;
