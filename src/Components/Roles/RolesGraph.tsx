import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import MainRolesGraphContents from "./MainRolesGraphContents";
import GraphLayout from "./Register/GraphLayout";
import RolesGraphContents from "./RolesGraphContents";
import { IRoleHistory, TRolesDate } from "./RolesMain";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  text-align: center;
`;

interface IProps {
  isAddStudent?: boolean;
  roles?: { work: string; role: string; id: number }[];
  randerRolesExample?: { work: string; role: string; id: number }[];
  register?: UseFormRegister<FieldValues> | null;
  setMsg?: React.Dispatch<React.SetStateAction<null | string>>;
  setErrMsg?: React.Dispatch<React.SetStateAction<null | string>>;
  setRanderRolesExample?: React.Dispatch<React.SetStateAction<{ work: string; role: string; id: number }[]>>;
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];

  recentDate?: undefined | TRolesDate;

  roleHistories?: IRoleHistory[];
  setRoleHistories?: React.Dispatch<React.SetStateAction<IRoleHistory[] | undefined>>;
  doneRoleStudents?: undefined | string[];
  setDoneRoleStudents?: React.Dispatch<React.SetStateAction<undefined | string[]>>;
}

const RolesGraph = ({
  register = null,
  isAddStudent = false,
  roles,
  setMsg,
  setErrMsg,
  randerRolesExample,
  setRanderRolesExample,
  savedRoles,
  roleHistories,
  setRoleHistories,
  doneRoleStudents,
  setDoneRoleStudents,
  recentDate,
}: IProps) => {
  const [updateWork, setUpdateWork] = useState<null | { type: string; id?: number }>(null);

  useEffect(() => {
    if (!updateWork || !setRanderRolesExample || !randerRolesExample || !setErrMsg) return;
    const { type, id } = updateWork;
    if (type === "remove") setRanderRolesExample((prev) => prev.filter((role) => role.id !== id));
    if (type === "add") {
      if (randerRolesExample.length === 25) return setErrMsg("생성 가능한 역할은 최대 25개입니다.");
      const idx = randerRolesExample.findIndex((role) => role.id === id);
      const copyRoles = [...randerRolesExample];
      copyRoles.splice(idx + 1, 0, { role: "", work: "", id: Date.now() });
      setRanderRolesExample(copyRoles);
    }
  }, [updateWork]);

  return (
    <Container>
      <GraphLayout isAddStudent={isAddStudent}>
        {register &&
          !isAddStudent &&
          randerRolesExample?.map((role) => {
            return <RolesGraphContents key={role.id} {...role} register={register} setUpdateWork={setUpdateWork} />;
          })}
        {register &&
          isAddStudent &&
          roles?.map((role) => {
            return (
              <RolesGraphContents
                register={register}
                key={role.id}
                {...role}
                isAddStudent={isAddStudent}
                setMsg={setMsg}
              />
            );
          })}
        {savedRoles &&
          savedRoles.map((role) => {
            return (
              <MainRolesGraphContents
                key={role._id}
                role={role.title}
                work={role.detail}
                id={role._id}
                savedStudents={role.students}
                roleHistories={roleHistories}
                setRoleHistories={setRoleHistories}
                doneRoleStudents={doneRoleStudents}
                setDoneRoleStudents={setDoneRoleStudents}
                recentDate={recentDate}
              />
            );
          })}
      </GraphLayout>
    </Container>
  );
};

export default RolesGraph;
