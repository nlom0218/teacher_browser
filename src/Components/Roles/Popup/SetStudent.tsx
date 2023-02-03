import { useQuery } from "@apollo/client";
import useMe from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import Loading from "../../Shared/Loading";
import GuideDefaultList from "./GuideDefaultList";
import GuideStudents from "./GuideStudents";
import styled from "styled-components";
import StudentItem from "./StudentItem";
import { useState } from "react";

const Layout = styled.div`
  min-height: 100%;
  max-height: 100%;
  padding: 30px 10px;
  padding: 1.875rem 0.625rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  grid-column: 1 / -1;
  justify-self: flex-end;
  font-weight: 700;
`;

const StudentList = styled.div`
  max-height: 100%;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: scroll;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 10px;
  column-gap: 0.625rem;
`;

const CompletedBtn = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.bgColor};
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

type IStudent = {
  studentName: string;
  _id: string;
};

const SetStudent = () => {
  const me = useMe();
  //   console.log(me?.defaultStudentListId);
  //   console.log(me?.email);

  const [selectedStudent, setSelectedStudent] = useState<string[]>([]);

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer maxHeight={true}>
      {!me?.defaultStudentListId && <GuideDefaultList />}
      {data?.seeStudentList[0].students.filter((item: { trash: boolean }) => !item.trash).length === 0 ? (
        <GuideStudents />
      ) : (
        <Layout>
          <Title>학생 선택하기 ✅</Title>
          <StudentList>
            {data?.seeStudentList[0].students
              .filter((item: { trash: boolean }) => !item.trash)
              .map((student: IStudent, idx: number) => {
                return (
                  <StudentItem
                    key={idx}
                    {...student}
                    setSelectedStudent={setSelectedStudent}
                    selectedStudent={selectedStudent}
                  />
                );
              })}
          </StudentList>
          <CompletedBtn>선택완료</CompletedBtn>
        </Layout>
      )}
    </PopupContainer>
  );
};

export default SetStudent;
