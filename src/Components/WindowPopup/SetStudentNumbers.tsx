import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setLocalNumbers } from "../../apollo";
import routes from "../../routes";
import AlertMessage from "../Shared/AlertMessage";

const Container = styled.div`
  margin-top: 40px;
  margin-top: 2.5rem;
  display: grid;
  justify-items: center;
  row-gap: 40px;
  row-gap: 2.5rem;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const Form = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.5rem;
`;

const NumberInput = styled.input`
  background-color: ${(props) => props.theme.cardBg};
  padding: 20px;
  padding: 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
`;

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  text-align: center;
  border-radius: 10px;
  border-radius: 0.625rem;
  font-size: 1em;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
`;

interface IForm {
  numbers: number;
}

const SetStudentNumbers = () => {
  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const { register, handleSubmit } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = ({ numbers }: IForm) => {
    if (numbers < 2 || numbers > 30) {
      setErrorMsg("2이상 30이하의 숫자를 입력해 주세요.");
      return;
    }

    navigate(`${routes.order}/local?popup=popup`);
    setLocalNumbers(numbers);
  };

  return (
    <Container>
      <div>학생 수를 입력하세요.</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <NumberInput {...register("numbers")} type="number" />
        <SubmitInput type="submit" value="완료" />
      </Form>
      <AlertMessage msg={errorMsg} setMsg={setErrorMsg} type="error" time={3000} />
    </Container>
  );
};

export default SetStudentNumbers;
