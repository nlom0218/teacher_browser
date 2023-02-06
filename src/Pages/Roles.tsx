import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { isPopupVar } from "../apollo";
import SetPeriod from "../Components/Roles/Popup/SetPeriod";
import SetStudent from "../Components/Roles/Popup/SetStudent";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import { SEE_ROLES } from "../Graphql/Roles/query";
import useMe from "../Hooks/useMe";
import RolesAddStudents from "./RolesAddStudents";
import RolesSetting from "./RolesSetting";

const Roles = () => {
  const me = useMe();
  const navigate = useNavigate();
  const isPopup = useReactiveVar(isPopupVar);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const { data } = useQuery(SEE_ROLES, {
    variables: {
      userEmail: me?.email,
    },
    skip: !me,
  });

  console.log(data);

  useEffect(() => {
    navigate("/roles/setting", { replace: true });
  }, []);
  return (
    <BasicContainer menuItem={true}>
      <Routes>
        <Route path=":id" element={<div>디테일</div>} />
        <Route path="setting" element={<RolesSetting setErrMsg={setErrMsg} />} />
        <Route
          path="add-students"
          element={<RolesAddStudents setErrMsg={setErrMsg} setMsg={setMsg} isPopup={isPopup} />}
        />
      </Routes>
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
      {isPopup === "rolesPeriod" && <SetPeriod setErrMsg={setErrMsg} />}
      {isPopup === "rolesSeleteStudent" && <SetStudent setErrMsg={setErrMsg} setMsg={setMsg} />}
    </BasicContainer>
  );
};

export default Roles;
