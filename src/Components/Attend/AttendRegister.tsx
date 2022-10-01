import styled from "styled-components";
import StudentList from "./StudentList";

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Title = styled.div`
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  justify-self: flex-end;
`;

const RegisterContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.girdBorderColor};
`;

const AttendRegister = () => {
  return (
    <Layout>
      <Title>출결등록</Title>
      <RegisterContainer>
        <StudentList />
      </RegisterContainer>
    </Layout>
  );
};

export default AttendRegister;
