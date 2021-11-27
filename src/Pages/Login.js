import React from 'react';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountContainer from '../Components/Shared/AccountContainer';
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';
import SocialLogin from '../Components/Account/SocialLogin';
import { FaUser, FaLock } from "react-icons/fa";
import LoginNavigation from '../Components/Account/styled/LoginNavigation';

const InputLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    font-size: 24px;
    font-size: 1.5rem;
  }
`

const DivideLine = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  font-size: 14px;
  font-size: 0.875rem;
  font-weight: 500;
  div {
    height: 1px;
    height: 0.0625rem;
    background: ${props => props.theme.fontColor};
    transition: background 1s ease;
  }
`

const Login = () => {
  return (<AccountContainer>
    <AccountTitle title="로그인" />
    <AccountForm>
      <InputLayout>
        <FaUser />
        <AccountInput
          type="text"
          placeholder="이메일을 입력해주세요."
        />
      </InputLayout>
      <InputLayout>
        <FaLock />
        <AccountInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
      </InputLayout>
      <AccountSubmitInput
        type="submit"
        value="로그인"
      />
      <DivideLine><div></div>또는<div></div></DivideLine>
      <SocialLogin />
    </AccountForm>
    <LoginNavigation>
      <div>계정이 없으신가요? <span>계정 만들기</span></div>
      <div className="findNavigation">아이디/비밀번호를 잊으셨나요?</div>
    </LoginNavigation>
  </AccountContainer>);
}

export default Login;