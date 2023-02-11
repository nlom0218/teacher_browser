import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import GraphLayout from "./Register/GraphLayout";
import RolesGraphContents from "./RolesGraphContents";

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
  setRanderRolesExample?: React.Dispatch<React.SetStateAction<{ work: string; role: string; id: number }[]>>;
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
}

const RolesGraph = ({
  register = null,
  isAddStudent = false,
  roles,
  setMsg,
  randerRolesExample,
  setRanderRolesExample,
  savedRoles,
}: IProps) => {
  const [updateWork, setUpdateWork] = useState<null | { type: string; id?: number }>(null);

  useEffect(() => {
    if (!updateWork || !setRanderRolesExample || !randerRolesExample) return;
    const { type, id } = updateWork;
    if (type === "remove") setRanderRolesExample((prev) => prev.filter((role) => role.id !== id));
    if (type === "add") {
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
              <RolesGraphContents
                key={role._id}
                role={role.title}
                work={role.detail}
                id={role._id}
                isAddStudent={true}
                savedStudents={role.students}
              />
            );
          })}
      </GraphLayout>
    </Container>
  );
};

export default RolesGraph;
