import React, { useState } from "react";
import AccountTitle from "../Components/Account/AccountTitle";
import AccountForm from "../Components/Account/styled/AccountForm";
import AccountInput from "../Components/Account/styled/AccountInput";
import AccountSubmitInput from "../Components/Account/styled/AccountSubmitInput";
import SocialLogin from "../Components/Account/SocialLogin";
import { FaUser, FaLock } from "react-icons/fa";
import LoginNavigation from "../Components/Account/styled/LoginNavigation";
import AccountContainer from "../Components/Shared/AccountContainer";
import InputLayout from "../Components/Account/styled/InputLayout";
import DivideLine from "../Components/Account/DivideLine";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "../routes";
import { useForm } from "react-hook-form";
import BackBtn from "../Components/Account/BackBtn";
import { useMutation } from "@apollo/client";
import { logInUser } from "../apollo";
import ErrMsg from "../Components/Account/styled/ErrMsg";
import { LOGIN_USER_MUTATION } from "../Graphql/User/mutation";
import useTitle from "../Hooks/useTitle";

const FakeLogin = () => {
  const titleUpdataer = useTitle("티처캔 | 로그인")
  const [errMsg, setErrMsg] = useState(undefined);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ...(state && {
        email: state.email,
        password: state.password,
      }),
    },
  });
  const onCompleted = (result) => {
    const {
      loginUser: { ok, error, token },
    } = result;
    if (error) {
      setErrMsg(error);
    }
    if (ok) {
      logInUser(token);
      navigate(routes.home);
    }
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    onCompleted,
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    if (loading) {
      return;
    }
    loginUser({
      variables: {
        email,
        password,
      },
    });
  };
  const onChangeInput = () => setErrMsg(undefined);
  return (
    <AccountContainer>
      <BackBtn />
      <AccountTitle title="로그인" />
      <AccountForm onSubmit={handleSubmit(onSubmit)}>
        <InputLayout>
          <FaUser />
          <AccountInput
            {...register("email", {
              required: true,
              onChange: onChangeInput,
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
              onChange: onChangeInput,
            })}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="off"
          />
        </InputLayout>
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        <AccountSubmitInput type="submit" value="로그인" disabled={!isValid} />
        <DivideLine />
        <SocialLogin />
      </AccountForm>
      <LoginNavigation>
        <div>
          계정이 없으신가요? <Link to={routes.createAccount}>계정 만들기</Link>
        </div>
        <div>
          <Link className="findNavigation" to={routes.findPassword}>
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </LoginNavigation>
    </AccountContainer>
  );
};

export default FakeLogin;
