import { useMutation, useReactiveVar } from "@apollo/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import { ADD_NEW_ROLES, UPDATE_ROLES } from "../../Graphql/Roles/mutation";
import { SEE_ROLES_QUERY } from "../../Graphql/Roles/query";
import IcPrint from "../../icons/Print/IcPrint";
import routes from "../../routes";
import Loading from "../Shared/Loading";
import EditRoles from "./EditRoles";
import CreateNewRoles from "./Popup/CreateNewRoles";
import EditPeriod from "./Popup/EditPeriod";
import EditStudentsPopup from "./Popup/EditStudentsPopup";
import PrintRoles from "./PrintRoles";
import BtnContainer from "./Register/BtnContainer";
import Form from "./Register/Form";
import Title from "./Register/Title";
import RolesGraph from "./RolesGraph";

const RolesBtnLayout = styled.div`
  font-size: 1em;
  font-size: 1rem;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-end;
  svg {
    display: flex;
    font-size: 2em;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const CreateBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  transition: background-color 1s ease, color 1s ease;
`;

const EditBtnLayout = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  .cancel-btn {
    background-color: ${(props) => props.theme.redColor};
    color: ${(props) => props.theme.bgColor};
  }
`;

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

const Alert = styled.div`
  position: absolute;
  bottom: 10px;
  bottom: 0.625rem;
  left: 10px;
  left: 0.625rem;
  color: ${(props) => props.theme.redColor};
  font-weight: 700;
  transition: color 1s ease;
  letter-spacing: 0.5px;
`;

export type TRolesDate = {
  startDate: number;
  endDate: number;
  order: number;
};

export type TRole = {
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

type TRoleStudent = { studentName: string; _id: string; roleHistory?: number[] | [] };

export type IRoleHistory = {
  id: string;
  studentName: string;
  dates?: number[];
};

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
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);

  const [isIncludeDate, setIsInCludeDate] = useState("");
  const [recentDate, setRecentDate] = useState<undefined | TRolesDate>();
  const [recentRole, setRecentRole] = useState<undefined | TRecentRole[]>();
  const [roleHistories, setRoleHistories] = useState<undefined | IRoleHistory[]>();
  const [doneRoleStudents, setDoneRoleStudents] = useState<undefined | string[]>();

  const onCompleted = (result: { updateRoles: { ok: boolean } }) => {
    if (result.updateRoles.ok) {
      if (mode === "edit") setMsg("1인 1역이 수정되었습니다.😁");
      navigate(`${routes.roles}/${id}/detail`);
    }
  };

  const [updateRoles, { loading: updateRolesLoading }] = useMutation(UPDATE_ROLES, {
    onCompleted,
    refetchQueries: [{ query: SEE_ROLES_QUERY, variables: { userEmail, id } }],
  });
  const [addNewRoles, { loading: addNewRolesLoading }] = useMutation(ADD_NEW_ROLES, {
    onCompleted: (result: any) => {
      if (result.addNewDateRoles.ok) {
        setMsg("1인 1역이 생성되었습니다.😁");
        navigate(`${routes.roles}/${id}/detail`);
      }
    },
    refetchQueries: [{ query: SEE_ROLES_QUERY, variables: { userEmail, id } }],
  });

  const createDefaultValues = () => {
    if (!roles) return;
    const defaulValues: any = {};
    roles.forEach(({ detail, title, _id }) => {
      defaulValues[`role${_id}`] = title;
      defaulValues[`work${_id}`] = detail;
    });

    return defaulValues;
  };

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: createDefaultValues(),
  });

  const onClickPrint = () => {
    navigate(`${routes.roles}/${id}/print`);
  };

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/${id}/edit`);
  };

  const onClickCancelBtn = () => {
    navigate(`${routes.roles}/${id}/detail`);
  };

  const onClickCreateNewRoles = () => {
    inPopup("createNewRoles");
  };

  const onSubmit = () => {
    if (!recentDate || !recentRole) return;

    if (mode === "edit") {
      const needUpdateStudents = getNeedUpdateStudents();
      const needCreateRole = getNeedCreateRole();
      const needDeleteRole = getNeedDeleteRole();
      updateRoles({
        variables: {
          userEmail,
          order: recentDate?.order,
          startDate: new Date(recentDate?.startDate).valueOf(),
          endDate: new Date(recentDate?.endDate).valueOf(),
          data: needUpdateStudents?.length !== 0 ? needUpdateStudents : undefined,
          addRole: needCreateRole?.length !== 0 ? needCreateRole : undefined,
          deleteRole: needDeleteRole?.length !== 0 ? needDeleteRole : undefined,
        },
      });
    }

    if (mode === "create") {
      const needCreateRole = getNeedCreateRole();
      const needDeleteRole = getNeedDeleteRole();
      updateRoles({
        variables: {
          userEmail,
          order: recentDate?.order,
          addRole: needCreateRole?.length !== 0 ? needCreateRole : undefined,
          deleteRole: needDeleteRole?.length !== 0 ? needDeleteRole : undefined,
        },
      });
      addNewRoles({
        variables: {
          userEmail,
          startDate: new Date(recentDate?.startDate).valueOf(),
          endDate: new Date(recentDate?.endDate).valueOf(),
          data: recentRole.map((role) => {
            return {
              id: role._id,
              students: role.students.map((student) => student._id),
            };
          }),
        },
      });
    }
  };

  const getNeedDeleteRole = () => {
    if (!recentRole) return;
    const deleteRole: string[] = [];
    const tempRoles = [...recentRole?.filter((role) => !role._id.match(/new/)).map((item) => item._id)];

    roles
      .map((item) => item._id)
      .forEach((id) => {
        if (tempRoles.includes(id)) return;
        deleteRole.push(id);
      });

    return deleteRole;
  };

  const getNeedCreateRole = () => {
    if (!recentRole) return;
    const roles: { detail: string; students: string[]; title: string }[] = [];
    recentRole
      .filter((role) => role._id.match(/new/))
      .forEach((role) => {
        roles.push({
          title: role.title,
          detail: role.detail,
          students: role.students.map((student) => student._id),
        });
      });

    return roles;
  };

  const getNeedUpdateStudents = () => {
    if (!recentRole) return;
    const students: { id: string; students: string[] }[] = [];
    recentRole
      ?.filter((role) => !role._id.match(/new/))
      .forEach((role) => {
        const roleId = role._id;
        const thisRole = roles.filter((role) => role._id === roleId)[0];
        const changedStudents = role.students;
        const prevStudents = thisRole.students[thisRole.students.length - 1].students;

        if (changedStudents.length !== prevStudents.length) {
          students.push({ id: roleId, students: changedStudents.map((item) => item._id) });
        } else if (new Set([...changedStudents, ...prevStudents]).size !== changedStudents.length) {
          students.push({ id: roleId, students: changedStudents.map((item) => item._id) });
        }
      });

    return students;
  };

  const onClickEditPeriodBtn = () => {
    inPopup("editPeriod");
  };

  useEffect(() => {
    if (!dates || !roles) return;
    setRecentDate(() => {
      return dates[dates.length - 1];
    });
    setRecentRole(() => {
      return roles.map((item) => {
        return {
          detail: item.detail,
          title: item.title,
          _id: item._id,
          students: mode !== "create" ? item.students[item.students.length - 1].students : [],
        };
      });
    });
    setRoleHistories(() => {
      return roles.flatMap(({ students }) => {
        return students[0].students.map((student) => {
          return {
            id: student._id,
            studentName: student.studentName,
            dates: student.roleHistory,
          };
        });
      });
    });
  }, [dates, roles, mode]);

  useEffect(() => {
    if (!roleHistories) return;
    const today = Number(format(new Date(), "yyMMdd"));

    setDoneRoleStudents(() => {
      return roleHistories
        .filter((roleHistory) => roleHistory.dates?.includes(today))
        .map((roleHistory) => roleHistory.id);
    });
  }, [roleHistories]);

  useEffect(() => {
    if (!recentDate) return;
    const startDate = Number(format(new Date(recentDate.startDate), "yyMMdd"));
    const endDate = Number(format(new Date(recentDate.endDate), "yyMMdd"));
    const today = Number(format(new Date(), "yyMMdd"));

    setIsInCludeDate(
      startDate > today
        ? "1인 1역 시작일이 오늘 보다 앞에 있습니다."
        : endDate < today
        ? "1인 1역 기간이 지났습니다. 새로운 1인 1역을 생성해주세요."
        : "",
    );
  }, [recentDate]);

  if (updateRolesLoading || addNewRolesLoading) {
    return <Loading page="center" />;
  }

  return mode === "print" ? (
    <PrintRoles roles={recentRole} date={recentDate}></PrintRoles>
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title isMain={true} isDetail={mode === "detail"}>
        <div>{mode === "detail" ? "1인 1역" : "1인 1역 수정"}</div>
        {recentDate && (
          <RolesDate className="main-date">
            {`${format(new Date(recentDate?.startDate), "yy.MM.dd")} ~ ${format(
              new Date(recentDate?.endDate),
              "yy.MM.dd",
            )}`}
            {mode !== "detail" && (
              <EditPeriodBtn onClick={onClickEditPeriodBtn}>
                {mode === "edit" ? "기간 수정하기" : "기간 설정하기"}
              </EditPeriodBtn>
            )}
          </RolesDate>
        )}
        {mode === "detail" && (
          <RolesBtnLayout>
            <div onClick={onClickPrint}>
              <IcPrint />
            </div>
            <CreateBtn onClick={onClickCreateNewRoles}>새로 만들기</CreateBtn>
          </RolesBtnLayout>
        )}
      </Title>
      <BtnContainer isAddStudent={true}>
        {mode === "detail" && <div className="today-date">{format(new Date(), "MM월 dd일 (eee)", { locale: ko })}</div>}
        <div>
          {mode === "detail"
            ? "1인 1역 역할을 완료한 학생이름을 클릭하면 완료표시가 됩니다."
            : mode === "edit"
            ? "학생, 기간을 수정한 후 저장버튼을 눌러주세요."
            : "새로운 기간을 설정하고 학생을 추가한 후 저장버튼을 눌러주세요."}
        </div>
        {mode !== "detail" && <div></div>}
        {mode === "detail" ? (
          <div onClick={onClickEditBtn} className="btn save-btn">
            수정
          </div>
        ) : (
          <EditBtnLayout>
            <input
              type="submit"
              value={`${mode === "edit" ? "수정" : "생성"}`}
              className="btn save-btn"
              onClick={onSubmit}
            />
            <div onClick={onClickCancelBtn} className="btn cancel-btn">
              {mode === "edit" ? "취소" : "생성 취소하기"}
            </div>
          </EditBtnLayout>
        )}
      </BtnContainer>
      {mode === "detail" ? (
        <RolesGraph
          savedRoles={recentRole}
          isAddStudent={true}
          roleHistories={roleHistories}
          setRoleHistories={setRoleHistories}
          doneRoleStudents={doneRoleStudents}
          setDoneRoleStudents={setDoneRoleStudents}
          setMsg={setMsg}
          recentDate={recentDate}
        />
      ) : (
        <EditRoles
          savedRoles={recentRole}
          setRecentRole={setRecentRole}
          register={register}
          setMsg={setMsg}
          setErrMsg={setErrMsg}
        />
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
          prevDate={dates}
          prevStudents={roles}
        />
      )}
      {mode === "detail" && isIncludeDate !== "" && <Alert>{isIncludeDate}</Alert>}
      {isPopup === "createNewRoles" && <CreateNewRoles />}
    </Form>
  );
};

export default RolesMain;
