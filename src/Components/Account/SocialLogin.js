import React from "react";
import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { ImBubble } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { KAKAO_LOGIN_MUTATION } from "../../Graphql/User/mutation";
import { logInUser } from "../../apollo";
import { useNavigate } from "react-router";
import routes from "../../routes";
import { useMutation } from "@apollo/client";
import { color } from "../../styles";

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
  background-color: #fee500;
  padding: 15px;
  padding: 0.9375rem;
  color: rgba(0, 0, 0, 0, 0.85);
  border-radius: 10px;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: "#000000";
    margin-right: 10px;
    margin-right: 0.625rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
  color: ${props => color.black};
`;
const GoogleLoginBtn = styled.div`
  background-color: white;
  padding: 15px;
  padding: 0.9375rem;
  color: rgba(0, 0, 0, 0, 0.85);
  border-radius: 10px;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: "#000000";
    margin-right: 10px;
    margin-right: 0.625rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
  color: ${props => color.black};
`;

const SocialLogin = () => {
  const navigate = useNavigate();

  //
  // 카카오 로그인
  const kakao = window.Kakao;

  //
  // 뮤테이션 complete 실행 함수
  const onCompleted = (result) => {
    let ok, error, token;
    if (result.kakaoLogin) {
      ok = result.kakaoLogin.ok;
      error = result.kakaoLogin.error;
      token = result.kakaoLogin.token;
    } else if (result.googleLogin) {
      ok = result.googleLogin.ok;
      error = result.googleLogin.error;
      token = result.googleLogin.token;
    }
    if (error) {
      return <>{error.message}</>;
    }
    if (ok) {
      logInUser(token);
      navigate(routes.home);
    }
  };

  const [kakaoLoginMutation, { loading: kakaoLoginLoading }] = useMutation(KAKAO_LOGIN_MUTATION, {
    onCompleted,
  });

  // 네이버 버튼 클릭 핸들
  const onClickNaverLoginBtn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${protocol}//${host}/naverLogin&state=a`;
  };

  // 카카오 버튼 클릭 핸들
  const onClickKakaoLoginBtn = () => {
    kakao.Auth.login({
      scope: "account_email",
      success: () => {
        kakao.API.request({
          url: "/v2/user/me",
          success: ({ kakao_account }) => {
            if (kakao_account.email) {
              const email = kakao_account.email;
              if (kakaoLoginLoading) return;
              kakaoLoginMutation({ variables: { email } });
            } else {
              alert("정상적으로 가입되었습니다.\n다시 로그인 후 이메일 정보를 제공해주세요.");
            }
          },
          fail: (err) => console.log(err),
        });
      },
      fail: (err) => {
        console.log(err);
      },
    });
  };

  // 구글 버튼 클릭 핸들
  const onClickGoogleLoginBtn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    const scope = "https://www.googleapis.com/auth/userinfo.email";
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${protocol}//${host}/googleLogin&response_type=token&scope=${scope}`;
  };

  return (
    <SSocialLogin>
      <NaverLoginBtn onClick={onClickNaverLoginBtn}>
        <SiNaver />
        네이버 로그인
      </NaverLoginBtn>
      <KakaoLoginBtn onClick={onClickKakaoLoginBtn}>
        <ImBubble />
        카카오 로그인
      </KakaoLoginBtn>
      <GoogleLoginBtn onClick={onClickGoogleLoginBtn}>
        <FcGoogle />
        구글 로그인
      </GoogleLoginBtn>
    </SSocialLogin>
  );
};

export default SocialLogin;
