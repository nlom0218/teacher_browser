import styled from "styled-components";

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
`;

const SetStudentNumbers = () => {
  return (
    <Container>
      <div>학생 수를 입력하세요.</div>
      <Form>
        <NumberInput type="number" />
        <SubmitInput type="submit" value="완료" />
      </Form>
    </Container>
  );
};

export default SetStudentNumbers;
