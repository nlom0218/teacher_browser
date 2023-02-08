interface IProps {
  isAddStudent: boolean;
  savedRoles?: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
}

const EditRoles = ({ isAddStudent, savedRoles }: IProps) => {
  return <div></div>;
};

export default EditRoles;
