import React from 'react';
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
import { Link } from 'react-router-dom';
import routes from '../routes';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { register, formState: { isValid }, handleSubmit } = useForm({
    mode: "onChange"
  })
  const onSubmit = (data) => {
    // 로그인
  }
  return (<AccountContainer>
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