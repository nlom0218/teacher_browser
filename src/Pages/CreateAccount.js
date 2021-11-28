import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AccountTitle from '../Components/Account/AccountTitle';
import DivideLine from '../Components/Account/DivideLine';
import SocialLogin from '../Components/Account/SocialLogin';
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';
import InputLayout from '../Components/Account/styled/InputLayout';
import LoginNavigation from '../Components/Account/styled/LoginNavigation';
import AccountContainer from '../Components/Shared/AccountContainer';
import routes from '../routes';
import { color } from '../styles';

const ErrMsg = styled.div`
  text-align: center;
  color: ${color.red};
  font-weight: 600;
`

const CreateAccount = () => {
  const [errMsg, setErrMsg] = useState(undefined)
  const { register, formState: { isValid, error }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    const { email, password, passwordConfirm } = data
    if (password !== passwordConfirm) {
      setErrMsg("비밀번호가 서로 일치하지 않습니다.")
      return
    }
    console.log(email, password, passwordConfirm);
  }
  const onChangeInput = () => setErrMsg(undefined)
  return (<AccountContainer>
    <AccountTitle title="회원가입" />
    <AccountForm onSubmit={handleSubmit(onSubmit)}>
      <InputLayout>
        <FaUser />
        <AccountInput
          {...register("email", {
            required: true,
            onChange: onChangeInput
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
            required: true,
            onChange: onChangeInput
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="off"
        />
      </InputLayout>
      <InputLayout>
        <FaLock />
        <AccountInput
          {...register("passwordConfirm", {
            required: true,
            onChange: onChangeInput
          })}
          type="password"
          placeholder="비밀번호를 확인해주세요."
          autoComplete="off"
        />
      </InputLayout>
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
      <AccountSubmitInput
        type="submit"
        value="회원가입"
        disabled={!isValid}
      />
      <DivideLine />
      <SocialLogin text="회원가입" />
    </AccountForm>
    <LoginNavigation>
      <div>계정이 있으신가요? <Link to={routes.login}>로그인</Link></div>
    </LoginNavigation>
  </AccountContainer>);
}

export default CreateAccount;