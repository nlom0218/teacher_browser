import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { isPopupVar } from "../apollo";
import SetPeriod from "../Components/Roles/Popup/SetPeriod";
import SetStudent from "../Components/Roles/Popup/SetStudent";
import RolesMain from "../Components/Roles/RolesMain";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import { SEE_ROLES } from "../Graphql/Roles/query";
import useMe from "../Hooks/useMe";
import RolesAddStudents from "./RolesAddStudents";
import RolesSetting from "./RolesSetting";

const Roles = () => {
  const me = useMe();
  const isPopup = useReactiveVar(isPopupVar);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const { data, loading } = useQuery(SEE_ROLES, {
    variables: {
      userEmail: me?.email,
    },
    skip: !me,
  });

  if (loading) {
    return <Loading page="mainPage" />;
  }
  return (
    <BasicContainer menuItem={true}>
      <Routes>
        {data && <Route path="" element={<RolesMain {...data?.roles[0]} />} />}
        {data && <Route path="/edit" element={<RolesMain {...data?.roles[0]} userEmail={me?.email} />} />}
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
