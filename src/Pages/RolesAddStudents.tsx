import { useForm } from "react-hook-form";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesAddStudents = ({ setErrMsg }: IProps) => {
  const { roles } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const { register } = useForm({
    mode: "onChange",
  });
  return (
    <Form>
      <Title>1인 1역 - 학생 입력하기</Title>
      <BtnContainer isAddStudent={true}>
        <div className="line-btn btn">역할 수정</div>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph register={register} isAddStudent={true} roles={roles} />
    </Form>
  );
};

export default RolesAddStudents;
