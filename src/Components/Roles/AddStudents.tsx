import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inPopup } from "../../apollo";
import ComfirmRolesSave from "./Popup/ComfirmRolesSave";
import BtnContainer from "./Register/BtnContainer";
import Form from "./Register/Form";
import Title from "./Register/Title";
import RolesGraph from "./RolesGraph";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";
import useMe from "../../Hooks/useMe";
import routes from "../../routes";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
  isPopup: string | null;
}

const AddStudents = ({ setErrMsg, setMsg, isPopup }: IProps) => {
  const me = useMe();
  const navigate = useNavigate();

  const [studentVaild, setStudentVaild] = useState(true);
  const [rolesVaild, setRolesVaild] = useState(true);

  const { roles, startDate, endDate } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const { handleSubmit } = useForm({ mode: "onChange" });

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  const { register } = useForm({
    mode: "onChange",
  });

  const onClickEditBtn = () => {
    navigate(`${routes.rolesSetting}/add-roles`);
  };

  const onClickSaveBtn = () => {
    if (loading) return setErrMsg("잠시 후 다시 시도해주세요.");
    const existStudentLength = data?.seeStudentList[0].students.filter(
      ({ trash }: { trash: boolean }) => !trash,
    ).length;
    const registerStudentLength = roles.reduce((acc: number, { students }: { students: string[] }) => {
      return acc + students.length;
    }, 0);
    if (existStudentLength !== registerStudentLength) {
      setStudentVaild(false);
    } else {
      setStudentVaild(true);
    }

    const isAllRolesRegister = roles.every(({ students }: { students: string[] }) => {
      return students.length !== 0;
    });
    if (!isAllRolesRegister) {
      setRolesVaild(false);
    } else {
      setRolesVaild(true);
    }

    inPopup("comfirmRolesSave");
  };

  // 1인 1역을 생성할 때 설정해 둔 역할들이 사라졌기 때문에 아래의 내용에서 다른 페이지로 이동해야 한다는 메시지 작성하기
  if (!localStorage.getItem("roleDetails")) return <div></div>;

  return (
    <Form onSubmit={handleSubmit(onClickSaveBtn)}>
      <Title>1인 1역 - 학생 입력하기</Title>
      <BtnContainer isAddStudent={true}>
        <div className="line-btn btn" onClick={onClickEditBtn}>
          역할 수정
        </div>
        <div>{`${format(new Date(startDate), "yy.MM.dd")} ~ ${format(new Date(endDate), "yy.MM.dd")}`}</div>
        <input type="submit" value="저장" className="save-btn btn" onClick={onClickSaveBtn} />
      </BtnContainer>
      <RolesGraph register={register} isAddStudent={true} roles={roles} setMsg={setMsg} />
      {isPopup === "comfirmRolesSave" && (
        <ComfirmRolesSave studentVaild={studentVaild} rolesVaild={rolesVaild} setErrMsg={setErrMsg} />
      )}
    </Form>
  );
};

export default AddStudents;
