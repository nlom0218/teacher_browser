import React, { useEffect } from "react";
import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { ImBubble } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
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
      if (loading) return;
      naverLoginMutation({ variables: { email: googleUser.Ju.zv } });
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
            if (kakao_account.email) {
              const email = kakao_account.email;
              if (loading) return;
              naverLoginMutation({ variables: { email } });
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
