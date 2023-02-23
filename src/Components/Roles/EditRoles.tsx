import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import EditStudents from "./EditStudents";
import GraphLayout from "./Register/GraphLayout";
import { TRecentRole } from "./RolesMain";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  text-align: center;
`;

interface IProps {
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
  setRecentRole: React.Dispatch<React.SetStateAction<undefined | TRecentRole[]>>;
  register?: UseFormRegister<FieldValues>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const EditRoles = ({ savedRoles, register, setRecentRole, setMsg }: IProps) => {
  return (
    <Container>
      <GraphLayout>
        {savedRoles &&
          savedRoles.map((role) => {
            return (
              <EditStudents
                key={role._id}
                role={role.title}
                work={role.detail}
                id={role._id}
                students={role.students.map((item) => `${item._id} ${item.studentName}`)}
                register={register}
                setRecentRole={setRecentRole}
                setMsg={setMsg}
              />
            );
          })}
      </GraphLayout>
    </Container>
  );
};

export default EditRoles;
