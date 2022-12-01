import React, { useState } from "react";
import PopupContainer from "../../Shared/PopupContainer";
import { DetailTitle } from "../../List/styled/DetailStudent";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import Loading from "../../Shared/Loading";
import AlertMessage from "../../Shared/AlertMessage";
import { useMutation } from "@apollo/client";
import { CREATE_XMAS_MSG_MUTATION } from "../../../Graphql/XmasTree/mutation";
import { XMAS_MSG_QUERY } from "../../../Graphql/XmasTree/query";
import { outPopup } from "../../../apollo";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";

//수정뮤테이션이랑 생성뮤테이션이랑 동일하게 이 컴포넌트 사용해도 될까???

const FormContainer = styled.form`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  padding: 20px 0px;
  padding: 1.25rem 0rem;

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
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const TitleName = styled.div`
  font-weight: 600;
`;

const InputNick = styled.input`
  padding: 10px;
  padding: 0.625rem;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const Submit = styled.input`
  justify-self: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  margin-top: 20px;
  margin-top: 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 5px 20px;
  padding: 0.3125rem 1.25rem;
  text-align: center;
  width: 100%;
  height: 40px;
  cursor: pointer;
`;

const InputWish = ({ me, nickname, pretext }) => {
  const [author, setAuthor] = useState(nickname);
  const [msg, setMsg] = useState(undefined);
  const [text, setText] = useState(pretext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { author, text } = data;
    setAuthor(author);
    setText(text);
    createXmasMsg({
      variables: {
        userEmail: me?.email,
        author: author,
        text: text,
      },
    });
  };

  const onCompleted = (result) => {
    const {
      createXmasMsg: { ok },
    } = result;
    if (ok) {
      setMsg("소원이 저장되었습니다. 😀");
      outPopup();
      navigate(routes.wishCard);
    }
  };

  const [createXmasMsg, { loading }] = useMutation(CREATE_XMAS_MSG_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: XMAS_MSG_QUERY, variables: { userEmail: me?.email } }],
  });
  if (loading) {
    return <Loading page="popupPage" />;
  }

  return (
    <PopupContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <TitleName>닉네임</TitleName>
        <InputNick
          {...register("author", {
            required: true,
          })}
          type="string"
          autoComplete="off"
          maxLength="15"
          defaultValue={me?.nickname}
        />
        <TitleName>소원쓰기</TitleName>
        <TextareaAutosize
          {...register("text", {
            required: true,
          })}
          minRows={5}
          placeholder="(예)방학 동안 건강하게 푹 쉴 수 있도록 해 주세요."
        ></TextareaAutosize>
        <Submit type="submit" value="소원 저장" />
      </FormContainer>
      <AlertMessage msg={msg} time={3000} setMsg={setMsg} type="success" />
    </PopupContainer>
  );
};

export default InputWish;
