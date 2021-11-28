import React, { useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import routes from '../routes';
import { useForm } from 'react-hook-form';
import BackBtn from '../Components/Account/BackBtn';
import { gql, useMutation } from '@apollo/client';

const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      ok
      token
      error
    }
}
`

const Login = () => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { state } = useLocation()
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      ...(state && {
        email: state.email,
        password: state.password
      }),
    }
  })
  const onCompleted = (result) => {
    const { loginUser: { ok, error, token } } = result
    if (error) {
      setErrMsg(error)
    }
  }
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted
  })
  const onSubmit = (data) => {
    const { email, password } = data
    if (loading) {
      return
    }
    loginUser({
      variables: {
        email,
        password
      }
    })
  }
  return (<AccountContainer>
    <BackBtn />
    <AccountTitle title="로그인" />
    <AccountForm onSubmit={handleSubmit(onSubmit)}>
      <InputLayout>
        <FaUser />
        <AccountInput
          {...register("email", {
            required: true
          })}
          type="email"
          placeholder="이메일을 입력해주세요."
          autoComplete="off"
        />
      </InputLayout>
      <InputLayout>
        <FaLock />
        <AccountInput
          {...register("password", {
            required: true
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="off"
        />
      </InputLayout>
      {errMsg && <div>{errMsg}</div>}
      <AccountSubmitInput
        type="submit"
        value="로그인"
        disabled={!isValid}
      />
      <DivideLine />
      <SocialLogin text="로그인" />
    </AccountForm>
    <LoginNavigation>
      <div>계정이 없으신가요? <Link to={routes.createAccount}>계정 만들기</Link></div>
      <div className="findNavigation">아이디/비밀번호를 잊으셨나요?</div>
    </LoginNavigation>
  </AccountContainer>);
}

export default Login;