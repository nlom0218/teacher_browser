import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { inPopup } from "../apollo";
import ComfirmRolesSave from "../Components/Roles/Popup/ComfirmRolesSave";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../Graphql/StudentList/query";
import useMe from "../Hooks/useMe";
import routes from "../routes";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
  isPopup: string | null;
}

const RolesAddStudents = ({ setErrMsg, setMsg, isPopup }: IProps) => {
  const me = useMe();
  const navigate = useNavigate();

  const [studentVaild, setStudentVaild] = useState(true);
  const [rolesVaild, setRolesVaild] = useState(true);

  const { handleSubmit } = useForm({ mode: "onChange" });

  const { roles, startDate, endDate } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const { data, loading } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: { listId: me?.defaultStudentListId },
  });

  const { register } = useForm({
    mode: "onChange",
  });

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/setting`);
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

    if (existStudentLength !== registerStudentLength || !isAllRolesRegister) {
      inPopup("comfirmRolesSave");
    }
  };

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
      {isPopup === "comfirmRolesSave" && <ComfirmRolesSave studentVaild={studentVaild} rolesVaild={rolesVaild} />}
    </Form>
  );
};

export default RolesAddStudents;
