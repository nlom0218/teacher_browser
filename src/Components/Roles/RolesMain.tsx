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
import Loading from "../Shared/Loading";
import EditRoles from "./EditRoles";
import EditPeriod from "./Popup/EditPeriod";
import EditStudentsPopup from "./Popup/EditStudentsPopup";
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
      setMsg("1인 1역이 수정되었습니다.😁");
      navigate(`${routes.roles}/${id}/detail`);
    }
  };

  const [updateRole, { loading }] = useMutation(UPDATE_ROLE);
  const [updateRoles, { loading: updateRolesLoading }] = useMutation(UPDATE_ROLES, {
    onCompleted,
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

  const onClickEditBtn = () => {
    navigate(`${routes.roles}/${id}/edit`);
  };

  const onClickCancelBtn = () => {
    navigate(`${routes.roles}/${id}/detail`);
  };

  const saveRoles = () => {
    // console.log("촤라락 저장");
    // navigate(routes.roles);
  };

  const onSubmit = () => {
    if (!recentDate) return;
    const needUpdateStudents = getNeedUpdateStudents();
    updateRoles({
      variables: {
        userEmail,
        order: recentDate?.order,
        startDate: isUpdateDate() ? new Date(recentDate?.startDate).valueOf() : undefined,
        endDate: isUpdateDate() ? new Date(recentDate?.endDate).valueOf() : undefined,
        data: needUpdateStudents?.length !== 0 ? needUpdateStudents : undefined,
      },
    });
    // const { needUpdateRoles, needCreateRoles } = needUpdateOrCreateRoles(rolesArray);
    // if (needUpdateRoles) {
    //   needUpdateRoles.forEach((role) => {
    //     updateRole({
    //       variables: {
    //         userEmail,
    //         id: role.id,
    //         title: role.role,
    //         detail: role.work,
    //       },
    //     });
    //   });
    // }
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
    if (!recentDate) return;
    return (
      new Date(recentDate?.startDate).valueOf() !== biggestOrder(dates).startDate ||
      new Date(recentDate?.endDate).valueOf() !== biggestOrder(dates).endDate
    );
  };

  const getNeedUpdateStudents = () => {
    if (!recentRole) return;
    // recentRole, roles
    const students: { id: string; students: string[] }[] = [];
    recentRole?.forEach((role) => {
      const roleId = role._id;
      const thisRole = roles.filter((role) => role._id === roleId)[0];
      const changedStudents = role.students;
      const prevStudents = biggestOrder(thisRole.students).students;

      if (changedStudents.length !== prevStudents.length) {
        students.push({ id: roleId, students: changedStudents.map((item) => item._id) });
      }

      if (new Set([...changedStudents, ...prevStudents]).size !== changedStudents.length) {
        students.push({ id: roleId, students: changedStudents.map((item) => item._id) });
      }
    });

    return students;
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

  const biggestOrder = (array: any[]) => {
    return array.sort((a, b) => (a["order"] < b["order"] ? 1 : a["order"] > b["order"] ? -1 : 0))[0];
  };

  useEffect(() => {
    if (!dates || !roles) return;
    setRecentDate(() => {
      return biggestOrder(dates);
    });
    setRecentRole(() => {
      return roles.map((item) => {
        return {
          detail: item.detail,
          title: item.title,
          _id: item._id,
          students: biggestOrder(item.students).students,
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
  }, [dates, roles]);

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

  if (updateRolesLoading) {
    return <Loading page="center" />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title isMain={true} isDetail={mode === "detail"}>
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
        {mode === "detail" && (
          <RolesBtnLayout>
            <div>인쇄</div>
            <CreateBtn>새로 만들기</CreateBtn>
          </RolesBtnLayout>
        )}
      </Title>
      <BtnContainer isAddStudent={true}>
        {mode !== "edit" && <div className="today-date">{format(new Date(), "MM월 dd일 (eee)", { locale: ko })}</div>}
        <div>
          {mode !== "edit"
            ? "1인 1역 역할을 완료한 학생이름을 클릭하면 완료표시가 됩니다."
            : "학생, 기간을 수정한 후 저장버튼을 눌러주세요."}
        </div>
        {mode === "edit" && <div></div>}
        {mode !== "edit" ? (
          <div onClick={onClickEditBtn} className="btn save-btn">
            수정
          </div>
        ) : (
          <EditBtnLayout>
            <input type="submit" value="저장" className="btn save-btn" onClick={onSubmit} />
            <div onClick={onClickCancelBtn} className="btn cancel-btn">
              취소
            </div>
          </EditBtnLayout>
        )}
      </BtnContainer>
      {mode !== "edit" ? (
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
      {mode === "detail" && isIncludeDate !== "" && <Alert>{isIncludeDate}</Alert>}
    </Form>
  );
};

export default RolesMain;
