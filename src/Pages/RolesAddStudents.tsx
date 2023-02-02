import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";
import routes from "../routes";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesAddStudents = ({ setErrMsg }: IProps) => {
  const navigate = useNavigate();
  const { roles, startDate, endDate } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const { register } = useForm({
    mode: "onChange",
  });

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/setting`);
  };

  return (
    <Form>
      <Title>1인 1역 - 학생 입력하기</Title>
      <BtnContainer isAddStudent={true}>
        <div className="line-btn btn" onClick={onClickEditBtn}>
          역할 수정
        </div>
        <div>{`${format(new Date(startDate), "yy.MM.dd")} ~ ${format(new Date(endDate), "yy.MM.dd")}`}</div>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph register={register} isAddStudent={true} roles={roles} />
    </Form>
  );
};

export default RolesAddStudents;
