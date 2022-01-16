import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { logOutUser, outPopup } from "../../../apollo";
import { CHANGE_PASSWORD_MUTATION } from "../../../Graphql/User/mutation";
import routes from "../../../routes";
import { customMedia } from "../../../styles";
import { useForm } from "react-hook-form";
import AccountForm from "../styled/AccountForm";
import InputLayout from "../styled/InputLayout";
import AccountInput from "../styled/AccountInput";
import { FaLock } from "react-icons/fa";
import PopupContainer from "../../Shared/PopupContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  ${customMedia.greaterThan("desktop")`
    justify-items: center;
  `}
  svg {
    color: ${props => props.theme.fontColor};
  }
  input {
    color: ${props => props.theme.fontColor};
    text-align: start;
  }
`;

const Btn = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  div {
    padding: 12px 40px;
    padding: 0.75rem 2.5rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    text-align: center;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const DelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
`;

const Pop_ChangePw = ({ userEmail }) => {
  const [errMsg, setErrMsg] = useState(null);

  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const { password, newPassword, newPasswordConfirm } = data;
    if (loading) {
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setErrMsg("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    changePw({ variables: { userEmail, password, newPassword } });
  };

  const navigate = useNavigate();

  const onCompleted = (result) => {
    console.log(result);
    const {
      changePw: { ok, error },
    } = result;
    if (ok) {
      outPopup();
      logOutUser();
      navigate(routes.login);
      window.location.reload();
      window.alert("비밀번호가 수정되었습니다.\n다시 로그인 해주세요.");
    } else {
      setErrMsg(error);
    }
  };

  const [changePw, { loading }] = useMutation(CHANGE_PASSWORD_MUTATION, { onCompleted });

  return (
    <PopupContainer>
      <Container>
        <AccountForm>
          <InputLayout>
            <FaLock />
            <AccountInput
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="기존 비밀번호를 입력해주세요."
              autoComplete="off"
            />
          </InputLayout>
          <InputLayout>
            <FaLock />
            <AccountInput
              {...register("newPassword", {
                required: true,
              })}
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              autoComplete="off"
            />
          </InputLayout>
          <InputLayout>
            <FaLock />
            <AccountInput
              {...register("newPasswordConfirm", {
                required: true,
              })}
              type="password"
              placeholder="새로운 비밀번호를 다시 입력해주세요."
              autoComplete="off"
            />
          </InputLayout>
          {errMsg && <Msg>{errMsg}</Msg>}
          <Btn>
            <DelBtn onClick={handleSubmit(onSubmit)}>수정하기</DelBtn>
            <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
          </Btn>
        </AccountForm>
      </Container>
    </PopupContainer>
  );
};

export default Pop_ChangePw;
