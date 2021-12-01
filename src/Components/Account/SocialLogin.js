import React, { useEffect } from 'react';
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from 'styled-components';

const SSocialLogin = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const LoginLayout = styled.div`
  background: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  padding: 0.75rem;
  border-radius: 12px;
  border-radius: 0.75rem;
  cursor: pointer;
  svg {
    margin-right: 10px;
    margin-right: 0.625rem;
    font-size: 24px;
    font-size: 1.5rem;
    color: ${props => props.iconColor};
  }
`

const LoginText = styled.div`
  color: ${props => props.textColor};
  opacity: 0.85;
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