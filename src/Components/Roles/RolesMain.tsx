import { useMutation, useReactiveVar } from "@apollo/client";
import { compareDesc, format } from "date-fns";
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
import EditStudentsPopup from "./Popup/EditStudentsPopup";
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

export type TRolesDate = {
  startDate: number;
  endDate: number;
  order: number;
};

type TRole = {
  detail: string;
  title: string;
  _id: string;
  students: { order: number; students: TRoleStudent[]; _id: string }[];
};

export type TRecentRole = {
  detail: string;
  title: string;
  _id: string;
  students: TRoleStudent[] | [];
};

type TRoleStudent = { studentName: string; _id: string };

interface IProps {
  dates: TRolesDate[];
  roles: TRole[];
  userEmail: string;
  id: string;
  mode: string;
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
  setMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

const RolesMain = ({ dates, roles, setErrMsg, userEmail, id, mode, setMsg }: IProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);

  const [recentDate, setRecentDate] = useState<undefined | TRolesDate>();
  const [recentRole, setRecentRole] = useState<undefined | TRecentRole[]>();

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

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/${id}/edit`);
  };

  const saveRoles = () => {
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

    // if (isUpdateDate()) {
    //   updateRoles({
    //     variables: {
    //       userEmail,
    //       id,
    //       // startDate: new Date(editStartDate).valueOf(),
    //       // endDate: new Date(editEndDate).valueOf(),
    //     },
    //   });
    // }
  };

  const isUpdateDate = () => {
    // return new Date(editStartDate).valueOf() !== startDate || new Date(editEndDate).valueOf() !== endDate;
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
    if (!dates || !roles) return;
    setRecentDate(() => {
      return dates.sort((a, b) => (a["order"] < b["order"] ? 1 : a["order"] > b["order"] ? -1 : 0))[0];
    });
    setRecentRole(() => {
      return roles.map((item) => {
        return {
          detail: item.detail,
          title: item.title,
          _id: item._id,
          students: item.students.sort((a, b) => (a["order"] < b["order"] ? 1 : a["order"] > b["order"] ? -1 : 0))[0]
            .students,
        };
      });
    });
  }, [dates]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title isMain={true}>
        <div>{mode === "detail" ? "1인 1역" : "1인 1역 수정"}</div>
        {recentDate && (
          <RolesDate className="main-date">
            {`${format(new Date(recentDate?.startDate), "yy.MM.dd")} ~ ${format(
              new Date(recentDate?.endDate),
              "yy.MM.dd",
            )}`}
            {mode === "edit" && <EditPeriodBtn onClick={onClickEditPeriodBtn}>기간 수정하기</EditPeriodBtn>}
          </RolesDate>
        )}
      </Title>
      <BtnContainer isAddStudent={true}>
        {mode !== "edit" && <div className="today-date">{format(new Date(), "MM월 dd일 (eee)", { locale: ko })}</div>}
        <div>
          {mode === "edit"
            ? "1인 1역 역할을 완료한 학생이름을 클릭하면 완료표시가 됩니다."
            : "학생, 기간을 수정한 후 저장버튼을 눌러주세요."}
        </div>
        {mode === "edit" && <div></div>}
        {mode !== "edit" ? (
          <div onClick={onClickEditBtn} className="btn save-btn">
            수정
          </div>
        ) : (
          <input type="submit" value="저장" className="btn save-btn" />
        )}
      </BtnContainer>
      {mode !== "edit" ? (
        <RolesGraph savedRoles={recentRole} isAddStudent={true} />
      ) : (
        <EditRoles savedRoles={recentRole} setRecentRole={setRecentRole} register={register} setMsg={setMsg} />
      )}
      {recentDate && isPopup === "editPeriod" && (
        <EditPeriod setErrMsg={setErrMsg} recentDate={recentDate} setRecentDate={setRecentDate} />
      )}
      {recentRole && isPopup === "editRoleStudent" && (
        <EditStudentsPopup
          setErrMsg={setErrMsg}
          setMsg={setMsg}
          recentRole={recentRole}
          setRecentRole={setRecentRole}
        />
      )}
    </Form>
  );
};

export default RolesMain;
