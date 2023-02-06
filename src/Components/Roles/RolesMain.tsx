interface IProps {
  startDate: number;
  endDate: number;
  roles: { detail: string; title: string; students: { studentName: string; _id: string }[] }[];
}

const RolesMain = ({ startDate, endDate, roles }: IProps) => {
  return <div></div>;
};

export default RolesMain;
