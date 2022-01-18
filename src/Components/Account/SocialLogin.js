import React, { useEffect } from "react";
import styled from "styled-components";
import { SiNaver, SiKakaotalk } from "react-icons/si";
import { NAVER_LOGIN_MUTATION } from "../../Graphql/User/mutation";
import { logInUser } from "../../apollo";
import { useNavigate } from "react-router";
import routes from "../../routes";
import { useMutation } from "@apollo/client";

const SSocialLogin = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const NaverLoginBtn = styled.div`
  background-color: #03c75a;
  padding: 15px;
  padding: 0.9375rem;
  color: white;
  border-radius: 10px;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 10px;
    margin-right: 0.625rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;
const KakaoLoginBtn = styled.div`
  background-color: yellow;
  padding: 15px;
  padding: 0.9375rem;
  color: brown;
  border-radius: 10px;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 10px;
    margin-right: 0.625rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const SocialLogin = () => {
  //
  // 네이버 로그인 초기화
  const inItNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "Gf04qU_FzIfDWz4a9_6Z",
      callbackUrl: "http://localhost:3000/naverLogin",
      isPopup: false,
      loginButton: { color: "green", type: 1, height: "50" },
      callbackHandle: true,
    });
    naverLogin.init();
  };
  //
  // 카카오 로그인
  const kakao = window.Kakao;

  useEffect(() => {
    inItNaverLogin();
  }, []);

  const navigate = useNavigate();
  //
  // 뮤테이션 complete 실행 함수
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

  const onClickNaverLoginBtn = () => {
    if (document && document.querySelector("#naverIdLogin")?.firstChild && window !== undefined) {
      const loginBtn = document.getElementById("naverIdLogin")?.firstChild;
      loginBtn.click();
    }
  };

  const onClickKakaoLoginBtn = () => {
    kakao.Auth.login({
      scope: "account_email",
      success: () => {
        kakao.API.request({
          url: "/v2/user/me",
          success: ({ kakao_account }) => {
            const email = kakao_account.email;
            if (loading) return;
            naverLoginMutation({ variables: { email } });
          },
          fail: (err) => console.log(err),
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <SSocialLogin>
      <div id="naverIdLogin" style={{ position: "absolute", top: "-10000000000px" }}></div>
      <NaverLoginBtn onClick={onClickNaverLoginBtn}>
        <SiNaver />
        네이버 로그인
      </NaverLoginBtn>
      <KakaoLoginBtn onClick={onClickKakaoLoginBtn}>
        <SiKakaotalk />
        카카오 로그인
      </KakaoLoginBtn>
    </SSocialLogin>
  );
};

export default SocialLogin;
