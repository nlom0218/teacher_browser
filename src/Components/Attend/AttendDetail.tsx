import { FieldValues, RegisterOptions, UseFormRegister, UseFormRegisterReturn, UseFormReturn } from "react-hook-form";
import { CgNotes } from "react-icons/cg";
import ReactTextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import { Icon } from "../Calendar/Popup/PopupLayout";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    background-color: ${(props) => props.theme.originBgColor};
    line-height: 160%;
    transition: background-color 1s ease;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

interface IProps {
  register: UseFormRegisterReturn;
}

const AttendDetail = ({ register }: IProps) => {
  return (
    <Container>
      <Icon>
        <CgNotes />
      </Icon>
      <ReactTextareaAutosize {...register} minRows={5} placeholder="결석사유를 입력해주세요." />
    </Container>
  );
};

export default AttendDetail;
