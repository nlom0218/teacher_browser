import React from 'react';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountContainer from '../Components/Shared/AccountContainer';
import { FaUser, FaLock } from "react-icons/fa";
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';

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
    </AccountForm>
  </AccountContainer>);
}

export default Login;