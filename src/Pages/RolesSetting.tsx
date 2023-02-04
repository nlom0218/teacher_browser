import React, { useEffect, useState } from "react";
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
  const [lineNums, setLineNums] = useState(9);

  const [savedRoles, setSavedRoles] = useState<null | { work: string; role: string }[]>(
    JSON.parse(localStorage.getItem("roleDetails") || "{}").roles,
  );

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onClickLineBtn = (type: string) => {
    if (type === "add") return setLineNums((prev) => (prev += 1));
    if (lineNums === 0) return;
    setValue(`role${lineNums}`, "");
    setValue(`work${lineNums}`, "");
    return setLineNums((prev) => (prev -= 1));
  };

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

  const preventClose = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    if (savedRoles) {
      setLineNums(savedRoles.length - 1);
    }

    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  useEffect(() => {
    if (!savedRoles) return;
    if (savedRoles.length - 1 > lineNums) {
      console.log("제거해야 해!");
      const { startDate, endDate, roles } = JSON.parse(localStorage.getItem("roleDetails") || "{}");
      roles.pop();
      localStorage.setItem("roleDetails", JSON.stringify({ startDate, endDate, roles }));
      setSavedRoles(roles);
    }
  }, [lineNums]);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Title>1인 1역 - 역할, 하는 일 입력하기</Title>
      <BtnContainer>
        <div className="line-btn btn" onClick={() => onClickLineBtn("add")}>
          줄 추가
        </div>
        <div className="line-btn btn" onClick={() => onClickLineBtn("remove")}>
          줄 삭제
        </div>
        <span>1인 1역 역할을 작성후 저장해 주세요.</span>
        <input type="submit" value="저장" className="save-btn btn" />
      </BtnContainer>
      <RolesGraph lineNums={lineNums} register={register} savedRoles={savedRoles} />
    </Form>
  );
};

export default RolesSetting;
