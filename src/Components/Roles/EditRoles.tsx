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
  isAddStudent: boolean;
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
  register: UseFormRegister<FieldValues> | null;
}

const EditRoles = ({ isAddStudent, savedRoles, register }: IProps) => {
  return (
    <Container>
      <GraphLayout isAddStudent={isAddStudent}>
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
                register={register}
              />
            );
          })}
      </GraphLayout>
    </Container>
  );
};

export default EditRoles;
