import React, { useEffect } from 'react';
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from 'styled-components';

const SSocialLogin = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const NaverLogin = styled.div`
  width: 100%;
  text-align: center;
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

  return (<SSocialLogin>
    <NaverLogin id="naverIdLogin"></NaverLogin>
  </SSocialLogin >);
}

export default SocialLogin;