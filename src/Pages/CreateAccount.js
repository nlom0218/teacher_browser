import React from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import AccountTitle from '../Components/Account/AccountTitle';
import DivideLine from '../Components/Account/DivideLine';
import SocialLogin from '../Components/Account/SocialLogin';
import AccountForm from '../Components/Account/styled/AccountForm';
import AccountInput from '../Components/Account/styled/AccountInput';
import AccountSubmitInput from '../Components/Account/styled/AccountSubmitInput';
import InputLayout from '../Components/Account/styled/InputLayout';
import LoginNavigation from '../Components/Account/styled/LoginNavigation';
import AccountContainer from '../Components/Shared/AccountContainer';

const CreateAccount = () => {
  return (<AccountContainer>
    <AccountTitle title="회원가입" />
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
      <InputLayout>
        <FaLock />
        <AccountInput
          type="password"
          placeholder="비밀번호를 확인해주세요."
        />
      </InputLayout>
      <AccountSubmitInput
        type="submit"
        value="회원가입"
      />
      <DivideLine />
      <SocialLogin text="회원가입" />
    </AccountForm>
    <LoginNavigation>
      <div>계정이 있으신가요? <span>로그인</span></div>
    </LoginNavigation>
  </AccountContainer>);
}

export default CreateAccount;