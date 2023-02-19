import { useMutation, useReactiveVar } from "@apollo/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import { UPDATE_ROLE, UPDATE_ROLES } from "../../Graphql/Roles/mutation";
import routes from "../../routes";
import EditRoles from "./EditRoles";
import EditPeriod from "./Popup/EditPeriod";
import BtnContainer from "./Register/BtnContainer";
import Form from "./Register/Form";
import Title from "./Register/Title";
import RolesGraph from "./RolesGraph";

const RolesDate = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-end;
`;

const EditPeriodBtn = styled.div`
  justify-self: flex-start;
  cursor: pointer;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

interface IProps {
  startDate: number;
  endDate: number;
  userEmail: string;
  rolesId: string;
  roles: { detail: string; title: string; _id: string; students: { studentName: string; _id: string }[] }[];
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesMain = ({ startDate, endDate, roles, userEmail, rolesId, setErrMsg }: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);

  const [editStartDate, setEditStartDate] = useState(startDate);
  const [editEndDate, setEditEndDate] = useState(endDate);

  const [updateRole, { loading }] = useMutation(UPDATE_ROLE);
  const [updateRoles, { loading: updateRolesLoading }] = useMutation(UPDATE_ROLES);

  const createDefaultValues = () => {
    if (!roles) return;
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
    const rolesArray = createRolesArray(data);
    const { needUpdateRoles, needCreateRoles } = needUpdateOrCreateRoles(rolesArray);
    if (needUpdateRoles) {
      needUpdateRoles.forEach((role) => {
        updateRole({
          variables: {
            userEmail,
            id: role.id,
            title: role.role,
            detail: role.work,
          },
        });
      });
    }

    if (isUpdateDate()) {
      updateRoles({
        variables: {
          userEmail,
          id: rolesId,
          startDate: new Date(editStartDate).valueOf(),
          endDate: new Date(editEndDate).valueOf(),
        },
      });
    }
  };

  const isUpdateDate = () => {
    return new Date(editStartDate).valueOf() !== startDate || new Date(editEndDate).valueOf() !== endDate;
  };

  const needUpdateOrCreateRoles = (rolesArray: { id: string; role: string; work: string }[]) => {
    const needUpdateRoles: { id: string; role: string; work: string }[] = [];
    const needCreateRoles: { id: string; role: string; work: string }[] = [];
    rolesArray.forEach((inputRole) => {
      const role = roles.filter((role) => {
        return role._id === inputRole.id;
      })[0];
      if (!role) return needCreateRoles.push(inputRole);
      if (role.title !== inputRole.role || role.detail !== inputRole.work) {
        return needUpdateRoles.push(inputRole);
      }
    });

    return { needUpdateRoles, needCreateRoles };
  };

  const createRolesArray = (data: any) => {
    const roles = Object.entries(data);

    const rolesObj: any = {};
    roles.forEach(([typeId, contents]) => {
      const type = typeId.slice(0, 4);
      const id = typeId.slice(4);
      if (!rolesObj[id]) rolesObj[id] = { role: null, work: null };
      rolesObj[id][type] = contents;
    });

    const rolesArray: { id: string; role: string; work: string }[] = [];
    for (let key in rolesObj) {
      rolesArray.push({ id: key, role: rolesObj[key].role, work: rolesObj[key].work });
    }

    return rolesArray;
  };

  const onClickEditPeriodBtn = () => {
    inPopup("editPeriod");
  };

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title isMain={true}>
        <div>{pathname === "/roles" ? "1인 1역" : "1인 1역 수정"}</div>
        <RolesDate className="main-date">
          {`${format(new Date(editStartDate), "yy.MM.dd")} ~ ${format(new Date(editEndDate), "yy.MM.dd")}`}
          {pathname !== "/roles" && <EditPeriodBtn onClick={onClickEditPeriodBtn}>기간 수정하기</EditPeriodBtn>}
        </RolesDate>
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
      {isPopup === "editPeriod" && (
        <EditPeriod
          setErrMsg={setErrMsg}
          editStartDate={editStartDate}
          editEndDate={editEndDate}
          setEditStartDate={setEditStartDate}
          setEditEndDate={setEditEndDate}
        />
      )}
    </Form>
  );
};

export default RolesMain;
