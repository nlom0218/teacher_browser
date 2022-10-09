import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logInUser } from "../apollo";
import Loading from "../Components/Shared/Loading";
import { GOOGLE_LOGIN_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";

const GoogleLoginCallBack = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();

  const onCompleted = (result) => {
    const {
      googleLogin: { ok, error, token },
    } = result;
    if (ok) {
      logInUser(token);
      navigate(-3);
    } else {
      setErrMsg(error);
      navigate(-3);
    }
  };

  const [googleLoginMutation, { loading, error }] = useMutation(GOOGLE_LOGIN_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.hash.replace("#access_token", "?access_token"));
    const accessToken = query.get("access_token");
    if (accessToken) googleLoginMutation({ variables: { accessToken } });
    else navigate(routes.login);
  }, [googleLoginMutation, navigate]);

  if (loading) return <Loading page="mainPage" />;
  if (error) return <>{error.message}</>;

  return <>{errMsg}</>;
};

export default GoogleLoginCallBack;
