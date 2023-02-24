import { FieldValues, UseFormRegister } from "react-hook-form";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import EditStudents from "./EditStudents";
import GraphLayout from "./Register/GraphLayout";
import { TRecentRole } from "./RolesMain";

const Container = styled.div`
  max-height: 100%;
  min-height: 100%;
  text-align: center;
`;

const AddRoleBtn = styled.div`
  margin-top: 20px;
  font-size: 2em;
  font-size: 2rem;
  color: ${(props) => props.theme.btnBgColor};
  transition: color 1s ease;
  cursor: pointer;
`;

interface IProps {
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
  setRecentRole: React.Dispatch<React.SetStateAction<undefined | TRecentRole[]>>;
  register?: UseFormRegister<FieldValues>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const EditRoles = ({ savedRoles, register, setRecentRole, setMsg }: IProps) => {
  const onClickAddRoleBtn = () => {
    setRecentRole((prev) => {
      if (!prev) return prev;
      return [...prev, { detail: "", title: "", _id: `new${String(Date.now())}`, students: [] }];
    });
  };

  return (
    <Container>
      <GraphLayout isAddStudent={true}>
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
      <AddRoleBtn onClick={onClickAddRoleBtn}>
        <AiFillPlusCircle />
      </AddRoleBtn>
    </Container>
  );
};

export default EditRoles;
