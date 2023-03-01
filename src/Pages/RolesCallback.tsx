import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { outPopup } from "../apollo";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
import { HAS_ROLES } from "../Graphql/Roles/query";
import useMe from "../Hooks/useMe";
import routes from "../routes";

const Container = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  text-align: center;
  line-height: 120%;
`;

const LoginBtn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.green};
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.bgColor};
  transition: 1s ease color, 1s ease background-color;
  cursor: pointer;
`;

const CancelBtn = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.bgColor};
  transition: 1s ease color, 1s ease background-color;
  cursor: pointer;
`;

const RolesCallback = () => {
  const me = useMe();
  const navigate = useNavigate();

  const { data, loading } = useQuery(HAS_ROLES, {
    variables: {
      userEmail: me?.email,
    },

    skip: !me,
  });

  const onClickBackground = () => {
    navigate(routes.menu);
  };
  const onClickLogin = () => {
    navigate(routes.login);
    outPopup();
  };

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
      <Container>
        <Layout>
          <div>해당 기능은 로그인 후 가능합니다.</div>
          <LoginBtn onClick={onClickLogin}>로그인하기</LoginBtn>
          <CancelBtn onClick={onClickBackground}>돌아가기</CancelBtn>
        </Layout>
      </Container>
    </BasicContainer>
  );
};

export default RolesCallback;
