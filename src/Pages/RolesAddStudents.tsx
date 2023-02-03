import { format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";
import routes from "../routes";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesAddStudents = ({ setErrMsg, setMsg }: IProps) => {
  const navigate = useNavigate();
  const { roles, startDate, endDate } = JSON.parse(localStorage.getItem("roleDetails") || "{}");

  const { register } = useForm({
    mode: "onChange",
  });

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/setting`);
  };

  const onClickSaveBtn = () => {
    // 어디까지 허용할것인가?
    // 역할이 비어있는 경우 허용?
    // 역할 부여가 안된 학생이 있는 경우 허용?
    // 유효성 검사 이후, DB에 로컬스토리지 내용 저장
    // DB에 저장이후 로컬스토리지 삭제
    // 메인 페이지로 이동 후 DB에 있는 정보 가져오기(현재 날짜에 따른 1인 1역)
  };

  const preventClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <Form>
      <Title>1인 1역 - 학생 입력하기</Title>
      <BtnContainer isAddStudent={true}>
        <div className="line-btn btn" onClick={onClickEditBtn}>
          역할 수정
        </div>
        <div>{`${format(new Date(startDate), "yy.MM.dd")} ~ ${format(new Date(endDate), "yy.MM.dd")}`}</div>
        <input type="submit" value="저장" className="save-btn btn" onClick={onClickSaveBtn} />
      </BtnContainer>
      <RolesGraph register={register} isAddStudent={true} roles={roles} setMsg={setMsg} />
    </Form>
  );
};

export default RolesAddStudents;