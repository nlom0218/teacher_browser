import React from 'react';
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from 'styled-components';

const SSoicalLogin = styled.div`
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


const SocialLogin = ({ text }) => {
  return (<SSoicalLogin>
    <LoginLayout
      bgColor="#FEE500"
      iconColor="#000000"
    >
      <RiKakaoTalkFill />
      <LoginText textColor="#000000">카카오 {text}</LoginText>
    </LoginLayout>
  </SSoicalLogin>);
}

export default SocialLogin;