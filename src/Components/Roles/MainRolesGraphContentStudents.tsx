import { useMutation } from "@apollo/client";
import { format } from "date-fns";
import React, { useState } from "react";
import styled from "styled-components";
import { CHECK_ROLE_DONE_MUTATION, UN_CHECK_ROLE_DONE_MUTATION } from "../../Graphql/Student/mutation";
import useMe from "../../Hooks/useMe";
import AlertMessage from "../Shared/AlertMessage";
import { IRoleHistory, TRolesDate } from "./RolesMain";

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
  recentDate?: undefined | TRolesDate;
}

const MainRolesGraphContentStudents = ({
  studentName,
  studentId,
  roleHistories,
  setRoleHistories,
  doneRoleStudents,
  setDoneRoleStudents,
  recentDate,
}: IProps) => {
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const me = useMe();
  const [checkRoleDone] = useMutation(CHECK_ROLE_DONE_MUTATION, {
    onCompleted: (result: any) => {
      console.log(result);
    },
  });
  const [unCheckRoleDone] = useMutation(UN_CHECK_ROLE_DONE_MUTATION);

  const onClickStudentName = () => {
    if (!setDoneRoleStudents || !recentDate) return;

    const startDate = Number(format(new Date(recentDate.startDate), "yyMMdd"));
    const endDate = Number(format(new Date(recentDate.endDate), "yyMMdd"));
    const today = Number(format(new Date(), "yyMMdd"));

    if (startDate > today || endDate < today) {
      return setErrMsg("현재 날짜가 1인 1역 기간에 포함되지 않습니다.😭");
    }

    if (doneRoleStudents?.includes(studentId)) {
      setDoneRoleStudents((prev) => prev?.filter((item) => item !== studentId));
      unCheckRoleDone({
        variables: {
          teacherEmail: me?.email,
          data: [
            {
              dates: today,
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
    <React.Fragment>
      <StudentName isDone={doneRoleStudents?.includes(studentId)} onClick={onClickStudentName}>
        {studentName}
      </StudentName>
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
    </React.Fragment>
  );
};

export default MainRolesGraphContentStudents;
