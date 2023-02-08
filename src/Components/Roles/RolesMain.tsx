import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../routes";
import EditRoles from "./EditRoles";
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
  const location = useLocation();
  const navigate = useNavigate();

  const [pathname, setPathname] = useState(location.pathname);

  const onClickEditBtn = () => {
    if (pathname === "/roles") return navigate(`${routes.roles}/edit`);
    saveRoles();
  };

  const saveRoles = () => {
    console.log("촤라락 저장");
    navigate(routes.roles);
  };

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);
  return (
    <Form>
      <Title isMain={true}>
        <div>{pathname === "/roles" ? "1인 1역" : "1인 1역 수정"}</div>
        <div className="main-date">{`${format(new Date(startDate), "yy.MM.dd")} ~ ${format(
          new Date(endDate),
          "yy.MM.dd",
        )}`}</div>
      </Title>
      <BtnContainer isAddStudent={true}>
        {pathname === "/roles" && (
          <div className="today-date">{format(new Date(), "MM월 dd일 (eee)", { locale: ko })}</div>
        )}
        <div>
          {pathname === "/roles"
            ? "1인 1역 역할을 완료한 학생이름을 클릭하면 완료표시가 됩니다."
            : "역할, 하는 일, 학생, 기간을 수정한 후 저장버튼을 눌러주세요."}
        </div>
        {pathname !== "/roles" && <div></div>}
        <div onClick={onClickEditBtn} className="btn save-btn">
          {pathname === "/roles" ? "수정" : "저장"}
        </div>
      </BtnContainer>
      {pathname === "/roles" ? (
        <RolesGraph savedRoles={roles} isAddStudent={true} />
      ) : (
        <EditRoles savedRoles={roles} isAddStudent={true} />
      )}
    </Form>
  );
};

export default RolesMain;
