import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import styled from "styled-components";
import { CHECK_ROLE_DONE_MUTATION, UN_CHECK_ROLE_DONE_MUTATION } from "../../Graphql/Student/mutation";
import useMe from "../../Hooks/useMe";
import { IRoleHistory } from "./RolesMain";

interface IStudentName {
  isDone?: boolean;
}

const StudentName = styled.div<IStudentName>`
  opacity: ${(porps) => porps.isDone && "0.3"};
  margin: 0px 5px 5px 0px;
  margin: 0rem 0.3125rem 0.3125rem 0rem;
  cursor: pointer;
`;

interface IProps {
  studentName: string;
  studentId: string;
  roleHistories?: IRoleHistory[];
  setRoleHistories?: React.Dispatch<React.SetStateAction<IRoleHistory[] | undefined>>;
  doneRoleStudents?: undefined | string[];
  setDoneRoleStudents?: React.Dispatch<React.SetStateAction<undefined | string[]>>;
}

const MainRolesGraphContentStudents = ({
  studentName,
  studentId,
  roleHistories,
  setRoleHistories,
  doneRoleStudents,
  setDoneRoleStudents,
}: IProps) => {
  const me = useMe();
  const [checkRoleDone, { loading }] = useMutation(CHECK_ROLE_DONE_MUTATION, {
    onCompleted: (result: any) => {
      console.log(result);
    },
  });
  const [unCheckRoleDone, { loading: unCheckLoading }] = useMutation(UN_CHECK_ROLE_DONE_MUTATION);

  const onClickStudentName = () => {
    if (!setDoneRoleStudents) return;

    if (doneRoleStudents?.includes(studentId)) {
      setDoneRoleStudents((prev) => prev?.filter((item) => item !== studentId));
      unCheckRoleDone({
        variables: {
          teacherEmail: me?.email,
          data: [
            {
              dates: Number(format(new Date(), "yyMMdd")),
              id: studentId,
            },
          ],
        },
      });
    } else {
      setDoneRoleStudents((prev) => {
        if (prev) return [...prev, studentId];
      });
      checkRoleDone({
        variables: {
          teacherEmail: me?.email,
          data: [
            {
              dates: Number(format(new Date(), "yyMMdd")),
              id: studentId,
            },
          ],
        },
      });
    }
  };

  return (
    <StudentName isDone={doneRoleStudents?.includes(studentId)} onClick={onClickStudentName}>
      {studentName}
    </StudentName>
  );
};

export default MainRolesGraphContentStudents;
