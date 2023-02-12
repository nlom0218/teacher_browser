import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  console.log(roles);
  const location = useLocation();
  const navigate = useNavigate();

  const createDefaultValues = () => {
    const defaulValues: any = {};
    roles.forEach(({ detail, title, _id }) => {
      defaulValues[`role${_id}`] = title;
      defaulValues[`work${_id}`] = detail;
    });

    return defaulValues;
  };

  const { register, handleSubmit } = useForm<any>({
    mode: "onChange",
    defaultValues: createDefaultValues(),
  });

  const [pathname, setPathname] = useState(location.pathname);
  const [students, setStudents] = useState(roles.map((role) => role.students));

  const onClickEditBtn = () => {
    if (pathname === "/roles") return navigate(`${routes.roles}/edit`);
    saveRoles();
  };

  const saveRoles = () => {
    if (pathname !== "/roles") return;
    // console.log("촤라락 저장");
    // navigate(routes.roles);
  };

  const onSubmit = (data: any) => {
    const rolesObj = createRolesObj(data);
    console.log(rolesObj);
  };

  const createRolesObj = (data: any) => {
    const roles = Object.entries(data);
    const rolesObj: any = {};
    roles.forEach(([typeId, contents]) => {
      const type = typeId.slice(0, 4);
      const id = typeId.slice(5);
      if (!rolesObj[id]) rolesObj[id] = { role: null, work: null };
      rolesObj[id][type] = contents;
    });

    return rolesObj;
  };

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        {pathname === "/roles" ? (
          <div onClick={onClickEditBtn} className="btn save-btn">
            수정
          </div>
        ) : (
          <input type="submit" value="저장" className="btn save-btn" />
        )}
      </BtnContainer>
      {pathname === "/roles" ? (
        <RolesGraph savedRoles={roles} isAddStudent={true} />
      ) : (
        <EditRoles savedRoles={roles} isAddStudent={true} register={register} />
      )}
    </Form>
  );
};

export default RolesMain;
