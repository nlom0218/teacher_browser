import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AttendDetail from "./AttendDetail";
import AttendType from "./AttendType";
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

interface IForm {
  contents: string | undefined;
}

const AttendRegister = () => {
  const [seletedStudent, setSeletedStudent] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new window.Date());
  const [endDate, setEndDate] = useState(new window.Date());
  const [type, setType] = useState<string>("");
  const { register, getValues, watch } = useForm<IForm>({
    mode: "onChange",
  });
  return (
    <Layout>
      <Title>출결등록</Title>
      <RegisterContainer>
        <StudentList seletedStudent={seletedStudent} setSeletedStudent={setSeletedStudent} />
        <SeletedDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <AttendDetail register={register("contents")} />
        <AttendType type={type} setType={setType} />
      </RegisterContainer>
    </Layout>
  );
};

export default AttendRegister;
