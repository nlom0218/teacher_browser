import React from "react";
import { BsPencil } from "react-icons/bs";
import styled from "styled-components";
import PopupContainer from "../../Shared/PopupContainer";
import TextareaAutosize from "react-textarea-autosize";
import { useMutation } from "@apollo/client";
import { SETTING_LINK_MUTATION } from "../../../Graphql/User/mutation";
import { outPopup } from "../../../apollo";
import { ME_QUERY } from "../../../Hooks/useMe";
import { useForm } from "react-hook-form";
import { GrHomeRounded } from "react-icons/gr";
import { SEE_MY_PAGE_LINK_QUERY } from "../../../Graphql/PageLink/query";
import Loading from "../../Shared/Loading";

const Container = styled.form`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  textarea {
    all: unset;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: #ffffff;
    transition: border 1s ease, background-color 1s ease;
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;
const PopupTitle = styled.div`
  justify-self: flex-end;
  font-size: 1.25rem;
  font-size: 1.25em;
`;
const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-start;
`;
const Icon = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  font-size: 1.5rem;
  font-size: 1.5em;
  svg {
    display: flex;
  }
`;
const Title = styled.div`
  background-color: #ffffff;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const SubmitInput = styled.input`
  padding: 10px;
  padding: 0.625rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`;

const AddBookmark = ({ userEmail, setMsg }) => {
  const title = localStorage.getItem("addBookmark");
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onCompleted = (result) => {
    const {
      settingLink: { ok },
    } = result;
    if (ok) {
      outPopup();
      localStorage.removeItem("addBookmark")
      setMsg(`즐겨찾기에 등록되었습니다. 😀`)
    }
  };

  const [settingLink, { loading }] = useMutation(SETTING_LINK_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: ME_QUERY },
      { query: SEE_MY_PAGE_LINK_QUERY, variables: { userEmail } },
    ],
  });

  const onSubmit = (data) => {
    const { memo } = data;
    settingLink({
      variables: {
        userEmail,
        siteName: title,
        memo,
      },
    });
  };

  if (loading) {
    return <Loading page="popupPage" />
  }

  return (
    <PopupContainer>
      <Container onSubmit={handleSubmit(onSubmit)}>
        <PopupTitle>즐겨찾기 추가하기</PopupTitle>
        <Layout>
          <Icon>
            <GrHomeRounded />
          </Icon>
          <Title>{title}</Title>
        </Layout>
        <Layout>
          <Icon>
            <BsPencil />
          </Icon>
          <TextareaAutosize
            {...register("memo")}
            minRows={5}
            maxRows={5}
            placeholder={`${title}에 대한 메모를 남겨주세요.`}
          ></TextareaAutosize>
        </Layout>
        <SubmitInput type="submit" value="즐겨찾기 추가하기" />
      </Container>
    </PopupContainer>
  );
};
export default AddBookmark;
