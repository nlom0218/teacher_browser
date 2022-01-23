import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AccountTitle from "../Components/Account/AccountTitle";
import BackBtn from "../Components/Account/BackBtn";
import DivideLine from "../Components/Account/DivideLine";
import SocialLogin from "../Components/Account/SocialLogin";
import AccountForm from "../Components/Account/styled/AccountForm";
import AccountInput from "../Components/Account/styled/AccountInput";
import AccountSubmitInput from "../Components/Account/styled/AccountSubmitInput";
import ErrMsg from "../Components/Account/styled/ErrMsg";
import InputLayout from "../Components/Account/styled/InputLayout";
import LoginNavigation from "../Components/Account/styled/LoginNavigation";
import AccountContainer from "../Components/Shared/AccountContainer";
import { CREATE_USER_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";
import styled from "styled-components";

const Tooltip = styled.div`
  position: relative;
  background: #88b7d5;
  border: 4px solid #c2e1f5;
  text-align: center;
  padding: 10px;
  color: #ddf8c6;

  &:after,
  &:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  &:after {
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #88b7d5;
    border-width: 10px;
    margin-left: -10px;
  }
  &:before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: #c2e1f5;
    border-width: 16px;
    margin-left: -16px;
  }
`;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(undefined);
  const [checkEmail, setCheckEmail] = useState(false);
  const {
    register,
    formState: { isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { email, password, passwordConfirm } = data;
    if (loading) {
      return;
    }
    if (password !== passwordConfirm) {
      setErrMsg("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    createUser({
      variables: {
        email,
        password,
        passwordConfirm,
      },
    });
  };
  const onChangeInput = () => setErrMsg(undefined);
  const onCompleted = (result) => {
    const {
      createUser: { ok, error },
    } = result;
    if (ok) {
      navigate(routes.login, {
        state: {
          email: getValues("email"),
          password: getValues("password"),
        },
      });
    } else {
      setErrMsg(error);
    }
  };
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted,
  });
  return (
    <AccountContainer>
      <BackBtn />
      <AccountTitle title="회원가입" />
      <AccountForm onSubmit={handleSubmit(onSubmit)}>
        {checkEmail && <Tooltip>반드시 사용 중인 이메일을 입력해주세요.</Tooltip>}
        <InputLayout>
          <FaUser />
          <AccountInput
            {...register("email", {
              required: true,
              onChange: onChangeInput,
            })}
            type="email"
            onFocus={() => {
              setErrMsg(undefined);
              setCheckEmail(true);
            }}
            onBlur={() => setCheckEmail(false)}
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
            onFocus={() => setErrMsg(undefined)}
            placeholder="비밀번호를 입력해주세요."
            autoComplete="off"
          />
        </InputLayout>
        <InputLayout>
          <FaLock />
          <AccountInput
            {...register("passwordConfirm", {
              required: true,
              onChange: onChangeInput,
            })}
            type="password"
            onFocus={() => setErrMsg(undefined)}
            placeholder="비밀번호를 확인해주세요."
            autoComplete="off"
          />
        </InputLayout>
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        <AccountSubmitInput type="submit" value="회원가입" disabled={!isValid} />
        <DivideLine />
        <SocialLogin />
      </AccountForm>
      <LoginNavigation>
        <div>
          계정이 있으신가요? <Link to={routes.login}>로그인</Link>
        </div>
      </LoginNavigation>
    </AccountContainer>
  );
};

export default CreateAccount;
