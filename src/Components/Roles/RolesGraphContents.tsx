import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface IContainer {
  isAddStudent?: boolean;
}

const Container = styled.div<IContainer>`
  display: grid;
  grid-template-columns: ${(props) => (props.isAddStudent ? "1fr 3fr 1fr" : "1fr 3fr")};
  column-gap: 2px;
  column-gap: 0.126rem;
  input,
  .selected-box {
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
    ::placeholder {
      opacity: 0.8;
    }
  }
  .selected-box {
    cursor: pointer;
    color: ${(props) => props.theme.blurFontColor};
    transition: background-color 1s ease, color 1s ease;
  }
`;

interface IProps {
  role?: string;
  work?: string;
  idx: number;
  isAddStudent?: boolean;
  register: UseFormRegister<FieldValues>;
}

const RolesGraphContents = ({ role, work, idx, register, isAddStudent = false }: IProps) => {
  return (
    <Container isAddStudent={isAddStudent}>
      {!isAddStudent && (
        <React.Fragment>
          <input
            type="text"
            {...register(`role${idx}`, { required: true })}
            placeholder={role || "역할을 입력하세요."}
            autoComplete="off"
          />
          <input
            type="text"
            {...register(`work${idx}`, { required: true })}
            placeholder={work || "하는 일을 입력하세요."}
            autoComplete="off"
          />
        </React.Fragment>
      )}
      {isAddStudent && (
        <React.Fragment>
          <input value={role} readOnly />
          <input value={work} readOnly />
          <div
            className="selected-box"
            {...register(`student${idx}`, { required: true })}
            placeholder="클릭하여 학생을 선택하세요."
          >
            클릭하여 학생을 선택하세요.
          </div>
        </React.Fragment>
      )}
    </Container>
  );
};

export default RolesGraphContents;
