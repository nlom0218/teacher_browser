import { useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { Route, useParams } from "react-router-dom";
import { isPopupVar } from "../apollo";
import AddRoles from "../Components/Roles/AddRoles";
import SetPeriod from "../Components/Roles/Popup/SetPeriod";
import SetStudent from "../Components/Roles/Popup/SetStudent";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import useMe from "../Hooks/useMe";
import RolesAddStudents from "./RolesAddStudents";

const RolesSetting = () => {
  const me = useMe();
  const isPopup = useReactiveVar(isPopupVar);
  const { mode } = useParams();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <BasicContainer menuItem={true}>
      {mode === "add-roles" ? <AddRoles setErrMsg={setErrMsg} /> : <div></div>}

      {/* <Route path="setting" element={<RolesSetting setErrMsg={setErrMsg} />} />
      <Route
        path="add-students"
        element={<RolesAddStudents setErrMsg={setErrMsg} setMsg={setMsg} isPopup={isPopup} />}
      /> */}

      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
      {isPopup === "rolesPeriod" && <SetPeriod setErrMsg={setErrMsg} />}
      {isPopup === "rolesSeleteStudent" && <SetStudent setErrMsg={setErrMsg} setMsg={setMsg} />}
    </BasicContainer>
  );
};

export default RolesSetting;
