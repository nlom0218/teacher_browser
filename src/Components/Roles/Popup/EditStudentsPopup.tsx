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
import { outPopup } from "../../../apollo";
import { TRecentRole } from "../RolesMain";

const Layout = styled.div`
  min-height: 100%;
  max-height: 100%;
  padding: 30px 10px;
  padding: 1.875rem 0.625rem;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
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

const GuideText = styled.div`
  text-align: center;
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.6;
`;

type IStudent = {
  studentName: string;
  _id: string;
};

type IRoles = {
  role: string;
  work: string;
  students: string[];
};

interface IProps {
  recentRole: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
  setRecentRole: React.Dispatch<React.SetStateAction<undefined | TRecentRole[]>>;
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const EditStudentsPopup = ({ setErrMsg, setMsg, recentRole, setRecentRole }: IProps) => {
  const me = useMe();
  const [selectedStudent, setSelectedStudent] = useState<string[]>([]);

  const [roleObj, setRoleObj] = useState(
    recentRole.filter((role) => role._id === localStorage.getItem("editRoleId"))[0],
  );

  const completedStudent = recentRole?.flatMap((role) => {
    return role.students.map((student) => student._id);
  });

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  const onClickCompleteBtn = () => {
    if (selectedStudent.length === 0) return setErrMsg("선택된 학생이 없습니다.😓");

    setRecentRole((prev) => {
      console.log(prev);
      return prev?.map((role) => {
        if (role._id === roleObj._id) {
          return {
            ...role,
            students: selectedStudent.map((string) => {
              const [_id, studentName] = string.split(" ");
              return {
                _id,
                studentName,
              };
            }),
          };
        }
        return role;
      });
    });

    setMsg(`${roleObj.title} 역할에 ${selectedStudent.length}명의 학생이 추가되었습니다.😁`);
    localStorage.removeItem("editRoleId");
    outPopup();
  };

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
          <Title>
            <div>{roleObj.title}</div>
            <div>학생 선택하기 ✅</div>
          </Title>
          <StudentList>
            {data?.seeStudentList[0].students
              .filter((item: { trash: boolean }) => !item.trash)
              .filter(({ _id }: { _id: string }) => !completedStudent.includes(_id))
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
          <CompletedBtn onClick={onClickCompleteBtn}>선택완료</CompletedBtn>
          <GuideText>이미 역할이 부여된 학생은 보이지 않습니다.</GuideText>
        </Layout>
      )}
    </PopupContainer>
  );
};

export default EditStudentsPopup;
