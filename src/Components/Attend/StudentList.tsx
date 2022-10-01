import { useQuery } from "@apollo/client";
import { BsFillPersonFill } from "react-icons/bs";
import styled from "styled-components";
import { SEE_ALL_STUDENT_QUERY } from "../../Graphql/Student/query";
import { Icon } from "../Calendar/Popup/PopupLayout";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const SStudentList = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.originBgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  display: flex;
  flex-wrap: wrap;
  div {
    font-size: 0.875em;
    font-size: 0.875rem;
    padding: 5px;
    padding: 0.3125rem;
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
`;

interface IData {
  seeAllStudent: IStudentData[];
}

interface IStudentData {
  studentName: string;
  index: number;
}

const StudentList = () => {
  const { data, loading } = useQuery<IData>(SEE_ALL_STUDENT_QUERY, {
    variables: { sort: "name", trash: false },
  });
  return (
    <Container>
      <Icon>
        <BsFillPersonFill />
      </Icon>
      <SStudentList>
        {data?.seeAllStudent.map((item, index) => {
          return <div key={index}>{item.studentName}</div>;
        })}
      </SStudentList>
    </Container>
  );
};

export default StudentList;
