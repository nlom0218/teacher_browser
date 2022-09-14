import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { logOutUser, outPopup } from "../../../apollo";
import { CHANGE_PASSWORD_MUTATION, UPDATE_USER_MUTATION } from "../../../Graphql/User/mutation";
import routes from "../../../routes";
import { customMedia } from "../../../styles";
import { useForm } from "react-hook-form";
import AccountForm from "../styled/AccountForm";
import InputLayout from "../styled/InputLayout";
import AccountInput from "../styled/AccountInput";
import { FaLock } from "react-icons/fa";
import PopupContainer from "../../Shared/PopupContainer";
import { ME_QUERY } from "../../../Hooks/useMe";
import { BsPersonCircle } from "react-icons/bs";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  ${customMedia.greaterThan("desktop")`
    justify-items: center;
  `}
  svg {
    color: ${(props) => props.theme.fontColor};
  }
  /* input {
    color: ${(props) => props.theme.fontColor};
    text-align: start;
  } */
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

const DelBtn = styled.input`
  padding: 12px 40px;
  padding: 0.75rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
  color: ${(props) => props.theme.redColor};
  color: red;
`;

const Pop_ChangeNickname = ({ userEmail, nickname }) => {
  const [errMsg, setErrMsg] = useState(null);

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = (data) => {
    const { nickname } = data;
    changeNickname({ variables: { userEmail, nickname } });
  };

  const navigate = useNavigate();

  const onCompleted = (result) => {
    const {
      // 오류 3. result 객체 내의 프로퍼티 수정
      updateUser: { ok, error },
    } = result;
    if (ok) {
      outPopup();
    } else {
      setErrMsg(error);
    }
  };

  const [changeNickname, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted,
    // 개선 1. 닉네임이 변경되면 내 데이터를 다시 불러와 최신으로 유지하기
    refetchQueries: [{ query: ME_QUERY }],
  });

  return (
    <PopupContainer>
      <Container>
        <AccountForm onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            {/* 개선 2. 아이콘을 자물쇠에서 사람 모양으로 바꿈 */}
            <BsPersonCircle />
            <AccountInput
              {...register("nickname", {
                required: true,
                onChange: () => setErrMsg(undefined),
              })}
              type="text"
              placeholder="닉네임을 입력해 주세요"
              autoComplete="off"
            />
          </InputLayout>
          <Btn>
            <DelBtn type="submit" value="등록하기" />
            <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
          </Btn>
        </AccountForm>
      </Container>
    </PopupContainer>
  );
};

export default Pop_ChangeNickname;
