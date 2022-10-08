import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logInUser } from "../apollo";
import Loading from "../Components/Shared/Loading";
import { NAVER_LOGIN_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";

const NaverLoginCallBack = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();

  const onCompleted = (result) => {
    const {
      naverLogin: { ok, error, token },
    } = result;
    if (error) {
      setErrMsg(error);
    }
    if (ok) {
      logInUser(token);
      navigate(-3);
    }
  };

  const [naverLoginMutation, { loading }] = useMutation(NAVER_LOGIN_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const state = query.get("state");
    const error = query.get("error");
    const errorDescription = query.get("error_description");
    naverLoginMutation({ variables: { code, state, error, errorDescription } });
  }, [naverLoginMutation]);

  if (loading) return <Loading page="mainPage" />;

  return <>{errMsg}</>;
};

export default NaverLoginCallBack;
