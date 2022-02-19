import React from "react";
import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { ImBubble } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { KAKAO_LOGIN_MUTATION, GOOGLE_LOGIN_MUTATION } from "../../Graphql/User/mutation";
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
`;

const SocialLogin = () => {
  //
  // 카카오 로그인
  const kakao = window.Kakao;

  //
  // 구글 로그인
  const google = window.gapi;
  google.load("auth2", function () {
    google.auth2.init();
    const options = new google.auth2.SigninOptionsBuilder();
    // options.setPrompt("select_account");
    // 추가는 Oauth 승인 권한 추가 후 띄어쓰기 기준으로 추가
    // options.setScope("email");
    // 인스턴스의 함수 호출 - element에 로그인 기능 추가
    // GgCustomLogin은 li태그안에 있는 ID, 위에 설정한 options와 아래 성공,실패시 실행하는 함수들
    google.auth2.getAuthInstance().attachClickHandler("GoogleLogin", options, onSignIn, onSignInFailure);
  });

  function onSignIn(googleUser) {
    if (googleUser?.Ju?.zv) {
      if (googleLoginLoading) return;
      googleLoginMutation({ variables: { email: googleUser.Ju.zv } });
    }

    // $.ajax({
    //     // people api를 이용하여 프로필 및 생년월일에 대한 선택동의후 가져온다.
    //   url: 'https://people.googleapis.com/v1/people/me'
    //       // key에 자신의 API 키를 넣습니다.
    //   , data: {personFields:'birthdays', key:'AIzaSyBOdmeC4SOSzXmPGLEM2vZueqiBSWKg3wk', 'access_token': access_token}
    //   , method:'GET'
    // })
    // .done(function(e){
    //       //프로필을 가져온다.
    //   var profile = googleUser.getBasicProfile();
    //   console.log(profile)
    // })
    // .fail(function(e){
    //   console.log(e);
    // })
  }

  function onSignInFailure(t) {
    console.log(t);
  }

  const navigate = useNavigate();

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
      // setErrMsg(error)
    }
    if (ok) {
      logInUser(token);
      navigate(routes.home);
    }
  };

  const [kakaoLoginMutation, { loading: kakaoLoginLoading }] = useMutation(KAKAO_LOGIN_MUTATION, {
    onCompleted,
  });
  const [googleLoginMutation, { loading: googleLoginLoading }] = useMutation(GOOGLE_LOGIN_MUTATION, {
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
  const onClickGoogleLoginBtn = () => {};

  return (
    <SSocialLogin>
      <div id="naverIdLogin" style={{ position: "absolute", top: "-10000000000px" }}></div>
      <NaverLoginBtn onClick={onClickNaverLoginBtn}>
        <SiNaver />
        네이버 로그인
      </NaverLoginBtn>
      <KakaoLoginBtn onClick={onClickKakaoLoginBtn}>
        <ImBubble />
        카카오 로그인
      </KakaoLoginBtn>
      <GoogleLoginBtn onClick={onClickGoogleLoginBtn} id="GoogleLogin">
        <FcGoogle />
        구글 로그인
      </GoogleLoginBtn>
    </SSocialLogin>
  );
};

export default SocialLogin;
