import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import { HAS_ROLES } from "../Graphql/Roles/query";
import useMe from "../Hooks/useMe";
import routes from "../routes";

const RolesCallback = () => {
  const me = useMe();
  const navigate = useNavigate();

  const { data, loading } = useQuery(HAS_ROLES, {
    variables: {
      userEmail: me?.email,
    },

    skip: !me,
  });

  useEffect(() => {
    if (!data) return;
    if (!data.roles) navigate(`${routes.rolesSetting}/add-roles`);
    else navigate(`${routes.roles}/${data.roles._id}/detail`);
  }, [data]);

  if (loading) {
    return <Loading page="mainPage" />;
  }

  return (
    <BasicContainer menuItem={true}>
      <div></div>
    </BasicContainer>
  );
};

export default RolesCallback;
