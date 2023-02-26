import { useQuery, useReactiveVar } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { isPopupVar } from "../apollo";
import SetPeriod from "../Components/Roles/Popup/SetPeriod";
import SetStudent from "../Components/Roles/Popup/SetStudent";
import RolesMain from "../Components/Roles/RolesMain";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import useMe from "../Hooks/useMe";
import { SEE_ROLES_QUERY } from "../Graphql/Roles/query";

const Roles = () => {
  const me = useMe();
  const { id, mode } = useParams();
  const isPopup = useReactiveVar(isPopupVar);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const { data, loading } = useQuery(SEE_ROLES_QUERY, {
    variables: {
      userEmail: me?.email,
      id,
    },
    skip: !me,
  });

  if (loading) {
    return <Loading page="mainPage" />;
  }
  return (
    <BasicContainer menuItem={true}>
      {data && mode === "detail" ? (
        <RolesMain {...data?.roles} userEmail={me?.email} id={id} mode={mode}></RolesMain>
      ) : (
        <RolesMain {...data?.roles} userEmail={me?.email} id={id} mode={mode} setErrMsg={setErrMsg} setMsg={setMsg} />
      )}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
      {isPopup === "rolesPeriod" && <SetPeriod setErrMsg={setErrMsg} />}
    </BasicContainer>
  );
};

export default Roles;
