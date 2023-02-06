import { format } from "date-fns";
import { ko } from "date-fns/locale";
import BtnContainer from "./Register/BtnContainer";
import Form from "./Register/Form";
import Title from "./Register/Title";
import RolesGraph from "./RolesGraph";

interface IProps {
  startDate: number;
  endDate: number;
  roles: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
}

const RolesMain = ({ startDate, endDate, roles }: IProps) => {
  console.log(startDate, endDate);
  return (
    <Form>
      <Title isMain={true}>
        <div>1인 1역</div>
        <div className="main-date">{`${format(new Date(startDate), "yy.MM.dd")} ~ ${format(
          new Date(endDate),
          "yy.MM.dd",
        )}`}</div>
      </Title>
      <BtnContainer isAddStudent={true}>
        <div className="today-date">{format(new Date(), "MM월 dd일 (eee)", { locale: ko })}</div>
        <div>1인 1역 역할을 완료한 학생이름을 클릭하면 완료표시가 됩니다.</div>
      </BtnContainer>
      <RolesGraph savedRoles={roles} isAddStudent={true} />
    </Form>
  );
};

export default RolesMain;
