import React, { useEffect } from 'react';
import styled from 'styled-components';
import { SiNaver } from "react-icons/si";

const SSocialLogin = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const NaverLoginBtn = styled.div`
  background-color: #03C75A;
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
`

const SocialLogin = () => {
  const inItNaverLogin = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "Gf04qU_FzIfDWz4a9_6Z",
      callbackUrl: "http://localhost:3000/naverLogin",
      isPopup: false,
      loginButton: { color: 'green', type: 1, height: '50' },
      callbackHandle: true
    })
    naverLogin.init()
  }

  useEffect(() => {
    inItNaverLogin()
  }, [])

  const onClickNaverLoginBtn = () => {
    if (
      document &&
      document.querySelector("#naverIdLogin")?.firstChild &&
      window !== undefined
    ) {
      const loginBtn = document.getElementById("naverIdLogin")?.firstChild
      loginBtn.click();
    }
  }

  return (<SSocialLogin>
    <div id="naverIdLogin" style={{ position: "absolute", top: "-10000000000px" }}></div>
    <NaverLoginBtn onClick={onClickNaverLoginBtn}><SiNaver />네이버 로그인</NaverLoginBtn>
  </SSocialLogin >);
}

export default SocialLogin;