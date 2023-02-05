import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { inPopup } from "../apollo";
import BtnContainer from "../Components/Roles/Register/BtnContainer";
import Form from "../Components/Roles/Register/Form";
import Title from "../Components/Roles/Register/Title";
import RolesGraph from "../Components/Roles/RolesGraph";

interface IProps {
  setErrMsg: React.Dispatch<React.SetStateAction<null | string>>;
}

type RoleObj = {
  role: string;
  work: string;
  students: [] | [string];
};

const RolesSetting = ({ setErrMsg }: IProps) => {
  const [savedRoles, setSavedRoles] = useState<null | { work: string; role: string }[]>(
    JSON.parse(localStorage.getItem("roleDetails") || "{}").roles,
  );

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    const roles: [string, string][] = Object.entries(data);
    const rolesDetails: RoleObj[] = [];
    let roleObj: RoleObj = { role: "", work: "", students: [] };
    roles.forEach(([type, contents]) => {
      if (contents === "") return;
      if (/role/.test(type)) return (roleObj.role = contents);
      roleObj.work = contents;
      rolesDetails.push(roleObj);
      roleObj = { role: "", work: "", students: [] };
    });

    localStorage.setItem("roleDetails", JSON.stringify({ roles: rolesDetails }));
    inPopup("rolesPeriod");
  };

  const onError = (error: any) => {
    if (error) setErrMsg("빈 칸이 존재합니다. 😓");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
      <BtnContainer>
        <span>1인 1역 역할 작성 후 저장해 주세요.</span>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph register={register} savedRoles={savedRoles} />
    </Form>
  );
};

export default RolesSetting;
