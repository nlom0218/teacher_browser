import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logInUser } from "../apollo";
import Loading from "../Components/Shared/Loading";
import { KAKAO_LOGIN_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";

const KakaoLoginCallBack = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();

  const onCompleted = (result) => {
    const {
      kakaoLogin: { ok, error, token },
    } = result;
    const redirectURL = localStorage.getItem("redirectURL");
    if (ok) {
      logInUser(token);
      if (redirectURL) {
        navigate(redirectURL);
      } else navigate(routes.home);
    } else {
      setErrMsg(error);
      navigate(routes.home);
    }
  };

  const [kakaoLoginMutation, { loading, error }] = useMutation(KAKAO_LOGIN_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const uri = `${protocol}//${host}/kakaoLogin`;
    const query = new URLSearchParams(window.location.search);

    const code = query.get("code");

    if (code) kakaoLoginMutation({ variables: { uri, code } });
    else navigate(routes.login);
  }, [kakaoLoginMutation, navigate]);

  if (loading) return <Loading page="mainPage" />;
  if (error) return <>{error.message}</>;

  return <>{errMsg}</>;
};

export default KakaoLoginCallBack;
