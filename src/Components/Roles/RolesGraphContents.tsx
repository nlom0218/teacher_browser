import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2px;
  column-gap: 0.126rem;
  input {
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
    padding: 14px;
    padding: 0.875rem;
    ::placeholder {
      opacity: 0.8;
    }
  }
`;

interface IProps {
  role?: string;
  work?: string;
  idx: number;
  register: UseFormRegister<FieldValues>;
}

const RolesGraphContents = ({ role, work, idx, register }: IProps) => {
  return (
    <Container>
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
    </Container>
  );
};

export default RolesGraphContents;
