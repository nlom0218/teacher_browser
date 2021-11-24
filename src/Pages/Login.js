import React from 'react';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import AccountContainer from '../Components/Shared/AccountContainer';
import { FaUser, FaLock } from "react-icons/fa";

const Layout = styled.div`
  display: grid;
  row-gap: 60px;
  row-gap: 3.75rem;
  justify-items: center;
  padding: 40px;
  padding: 2.5rem;
`

const AccountForm = styled.form`
  width: 100%;
  display: grid;
  row-gap: 40px;
`

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

const AccountInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.contentBgColor};
  transition: background-color 1s ease;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
  }
  ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
  }
`

const SubmitInput = styled.input`
  width: 100%;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 10px;
  letter-spacing: 0.625rem;
`


const Login = () => {
  return (<AccountContainer>
    <Layout>
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
        <SubmitInput
          type="submit"
          value="로그인"
        />
      </AccountForm>
    </Layout>
  </AccountContainer>);
}

export default Login;