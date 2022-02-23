import React from "react";
import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { ImBubble } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
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
  // 네이버 버튼 클릭 핸들
  const onClickNaverLoginBtn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${protocol}//${host}/naverLogin&state=a`;
  };

  // 카카오 버튼 클릭 핸들
  const onClickKakaoLoginBtn = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${protocol}//${host}/kakaoLogin&scope=account_email`;
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
