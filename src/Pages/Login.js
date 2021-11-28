import React from 'react';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';
import SocialLogin from '../Components/Account/SocialLogin';
import { FaUser, FaLock } from "react-icons/fa";
import LoginNavigation from '../Components/Account/styled/LoginNavigation';
import AccountContainer from '../Components/Shared/AccountContainer';
import InputLayout from '../Components/Account/styled/InputLayout';
import DivideLine from '../Components/Account/DivideLine';

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
      <SocialLogin text="로그인" />
    </AccountForm>
    <DivideLine />
    <LoginNavigation>
      <div>계정이 없으신가요? <span>계정 만들기</span></div>
      <div className="findNavigation">아이디/비밀번호를 잊으셨나요?</div>
    </LoginNavigation>
  </AccountContainer>);
}

export default Login;