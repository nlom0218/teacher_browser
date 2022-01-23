import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { NEW_PASSWORD_MUTATION } from "../Graphql/User/mutation";
import routes from "../routes";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import AccountTitle from "../Components/Account/AccountTitle";
import BackBtn from "../Components/Account/BackBtn";
import AccountForm from "../Components/Account/styled/AccountForm";
import AccountInput from "../Components/Account/styled/AccountInput";
import AccountSubmitInput from "../Components/Account/styled/AccountSubmitInput";
import ErrMsg from "../Components/Account/styled/ErrMsg";
import InputLayout from "../Components/Account/styled/InputLayout";
import LoginNavigation from "../Components/Account/styled/LoginNavigation";
import AccountContainer from "../Components/Shared/AccountContainer";

const FindPassword = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  const [isSendedMail, setIsSendedMail] = useState(false);

  const onChangeInput = () => setErrMsg(undefined);

  // useForm1 부분
  const sendEmail = ({ email }) => {
    if (loading) return;
    setValue2("email2", email);
    newPw({ variables: { userEmail: email } });
  };

  const {
    register: register1,
    formState: { isValid: isValid1 },
    handleSubmit: handleSubmit1,
    getValues: getValues1,
  } = useForm({ mode: "onChange" });

  // useForm2 부분
  const changePw = (data) => {
    if (loading) return;
    const { email } = getValues1();
    const { certificate, password, passwordConfirm } = data;
    if (password !== passwordConfirm) {
      setErrMsg("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    newPw({ variables: { userEmail: email, certificate, password } });
  };

  const {
    register: register2,
    formState: { isValid: isValid2 },
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    setValue: setValue2,
  } = useForm({
    mode: "onChange",
  });

  // useMutaion 부분
  const onCompleted = (result) => {
    const {
      newPw: { ok, error },
    } = result;
    if (ok) {
      if (!getValues2("password")) {
        setIsSendedMail(true);
      } else {
        navigate(routes.login, {
          state: {
            email: getValues1("email"),
            password: getValues2("password"),
          },
        });
      }
    } else {
      setErrMsg(error);
    }
  };
  const [newPw, { loading }] = useMutation(NEW_PASSWORD_MUTATION, {
    onCompleted,
  });

  return (
    <AccountContainer>
      <BackBtn />
      <AccountTitle title="비밀번호 찾기" />

      <AccountForm onSubmit={handleSubmit1(sendEmail)} hidden={isSendedMail}>
        <InputLayout>
          <FaUser />
          <AccountInput
            {...register1("email", {
              required: true,
              onChange: onChangeInput,
            })}
            type="email"
            onFocus={() => {
              setErrMsg(undefined);
            }}
            placeholder="이메일을 입력해주세요."
            autoComplete="off"
          />
        </InputLayout>
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        <AccountSubmitInput type="submit" value="인증번호 발송" disabled={!isValid1} />
      </AccountForm>

      <AccountForm onSubmit={handleSubmit2(changePw)} hidden={!isSendedMail}>
        <InputLayout>
          <FaUser />
          <AccountInput
            {...register2("email2", {
              required: true,
              onChange: onChangeInput,
            })}
            type="email"
            onFocus={() => setErrMsg(undefined)}
            placeholder="이메일을 입력해주세요."
            autoComplete="off"
            disabled={true}
          />
        </InputLayout>
        <InputLayout>
          <FaUser />
          <AccountInput
            {...register2("certificate", {
              required: true,
              onChange: onChangeInput,
            })}
            type="password"
            onFocus={() => setErrMsg(undefined)}
            placeholder="인증번호를 입력해주세요."
            autoComplete="off"
          />
        </InputLayout>
        <InputLayout>
          <FaLock />
          <AccountInput
            {...register2("password", {
              required: true,
              onChange: onChangeInput,
            })}
            type="password"
            onFocus={() => setErrMsg(undefined)}
            placeholder="새로운 비밀번호를 입력해주세요."
            autoComplete="off"
          />
        </InputLayout>
        <InputLayout>
          <FaLock />
          <AccountInput
            {...register2("passwordConfirm", {
              required: true,
              onChange: onChangeInput,
            })}
            type="password"
            onFocus={() => setErrMsg(undefined)}
            placeholder="새로운 비밀번호를 확인해주세요."
            autoComplete="off"
          />
        </InputLayout>
        {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        <AccountSubmitInput type="submit" value="비밀번호 변경" disabled={!isValid2} />
        <AccountSubmitInput
          type="button"
          value="인증번호 재발송"
          onClick={() => {
            setIsSendedMail(false);
            setValue2("password", null);
          }}
        />
      </AccountForm>
      <LoginNavigation>
        <div>
          계정이 있으신가요? <Link to={routes.login}>로그인</Link>
        </div>
      </LoginNavigation>
    </AccountContainer>
  );
};

export default FindPassword;
