import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import AccountContainer from "../Components/Shared/AccountContainer";
import { agreePolicyOne, agreePolicyTwo } from "../Text/agreePolicy";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import AlertMessage from "../Components/Shared/AlertMessage";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_MUTATION } from "../Graphql/User/mutation";
import useMe from "../Hooks/useMe";
import { useNavigate } from "react-router";
import routes from "../routes";
import Loading from "../Components/Shared/Loading";

const Container = styled.div`
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 15px 20px;
    padding: 0.9375rem 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: ${(props) => props.theme.originBgColor};
    transition: background-color 1s ease;
    line-height: 160%;
    white-space: pre-line;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const MsgLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Msg = styled.div`
  text-align: center;
  line-height: 160%;
`;

const AgreeLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const Text = styled.div`
  font-weight: 600;
`;

const AgreeText = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
  font-size: 18px;
`;

const NextBtn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  text-align: center;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const AgreePolicy = () => {
  const me = useMe();

  const navigate = useNavigate();
  const [agreeOne, setAgreeOne] = useState(false);
  const [agreeTwo, setAgreeTwo] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);
  const [errMsg, setErrMsg] = useState(undefined);

  const { register, setValue } = useForm();

  const onCompleted = (result) => {
    const {
      updateUser: { ok },
    } = result;
    if (ok) {
      navigate(routes.home);
    }
  };

  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted,
  });

  const onClickNextBtn = () => {
    if (!agreeOne || !agreeTwo) {
      setErrMsg("이용약관 및 개인정보 처리방침에 동의 후 가능합니다. 😅");
      return;
    }
    updateUser({
      variables: {
        userEmail: me?.email,
        agreePolicy: true,
      },
    });
  };

  const onClickAgreeAll = () => {
    if (agreeAll) {
      setAgreeOne(false);
      setAgreeTwo(false);
      setAgreeAll(false);
    } else {
      setAgreeOne(true);
      setAgreeTwo(true);
      setAgreeAll(true);
    }
  };

  useEffect(() => {
    setValue("agree1", agreePolicyOne);
    setValue("agree2", agreePolicyTwo);
  }, []);

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <AccountContainer agreePage={true}>
      <Container>
        <MsgLayout>
          <Msg>티처캔 회원가입을 환영합니다!</Msg>
          <Msg>티처캔의 이용약관, 개인정보 처리방침에 동의 후 티처캔을 이용해주세요. 😊</Msg>
        </MsgLayout>
        <AgreeText onClick={onClickAgreeAll}>
          {agreeAll ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>티처캔 이용약관, 개인정보 처리방침에 모두 동의합니다.</div>
        </AgreeText>
        <AgreeLayout>
          <Text>이용약관</Text>
          <TextareaAutosize {...register("agree1")} readOnly={true} minRows={10} maxRows={10}></TextareaAutosize>
          <AgreeText onClick={() => setAgreeOne((prev) => !prev)}>
            {agreeOne ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>이용약관에 동의합니다.</div>
          </AgreeText>
        </AgreeLayout>
        <AgreeLayout>
          <Text>개인정보 처리방침</Text>
          <TextareaAutosize {...register("agree2")} readOnly={true} minRows={10} maxRows={10}></TextareaAutosize>
          <AgreeText onClick={() => setAgreeTwo((prev) => !prev)}>
            {agreeTwo ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
            <div>개인정보 처리방침에 동의합니다.</div>
          </AgreeText>
        </AgreeLayout>
        <NextBtn onClick={onClickNextBtn}>티처캔 시작하기</NextBtn>
        {errMsg && <AlertMessage msg={errMsg} type="error" setMsg={setErrMsg} time={3000} />}
      </Container>
    </AccountContainer>
  );
};

export default AgreePolicy;
