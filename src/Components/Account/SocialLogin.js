import React from 'react';
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from 'styled-components';

const SSoicalLogin = styled.div`
  width: 100%;
`

const LoginLayout = styled.div`
  background: #FEE500;
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
    color: #000000;
  }
`

const LoginText = styled.div`
  color: #000000;
  opacity: 0.85;
`

const SocialLogin = () => {
  return (<SSoicalLogin>
    <LoginLayout>
      <RiKakaoTalkFill />
      <LoginText>카카오 로그인</LoginText>
    </LoginLayout>
  </SSoicalLogin>);
}

export default SocialLogin;