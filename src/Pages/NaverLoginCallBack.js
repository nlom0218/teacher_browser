import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { logInUser } from "../apollo";
import { NAVER_LOGIN_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";

const NaverLoginCallBack = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
  const onCompleted = (result) => {
    const {
      naverLogin: { ok, error, token },
    } = result;
    if (error) {
      // setErrMsg(error)
    }
    if (ok) {
      logInUser(token);
      navigate(routes.home);
    }
  };
  const [naverLoginMutation, { loading }] = useMutation(NAVER_LOGIN_MUTATION, {
    onCompleted,
  });
  const inItNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "Gf04qU_FzIfDWz4a9_6Z",
      callbackUrl: `${window.location.protocol}//${window.location.host}/naverLogin`,
      isPopup: false,
      loginButton: { color: "green", type: 1, height: "50" },
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const { email } = naverLogin.user;
        setEmail(email);
      }
    });
    if (email) {
      if (loading) {
        return;
      }
      naverLoginMutation({
        variables: {
          email,
        },
      });
    }
  };
  useEffect(() => {
    inItNaverLogin();
  }, [email]);
  return (
    <div>
      <div id="naverIdLogin" style={{ position: "absolute", top: "-10000000000px" }}></div>
    </div>
  );
};

export default NaverLoginCallBack;
