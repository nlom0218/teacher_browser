import { useState } from "react";
import styled from "styled-components";
import SeletedDate from "./SeletedDate";
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
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  align-items: flex-start;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.girdBorderColor};
  transition: background-color 1s ease, border 1s ease;
`;

const AttendRegister = () => {
  const [seletedStudent, setSeletedStudent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new window.Date());
  const [endDate, setEndDate] = useState(new window.Date());
  console.log(seletedStudent, startDate, endDate);
  return (
    <Layout>
      <Title>출결등록</Title>
      <RegisterContainer>
        <StudentList seletedStudent={seletedStudent} setSeletedStudent={setSeletedStudent} />
        <SeletedDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </RegisterContainer>
    </Layout>
  );
};

export default AttendRegister;
