import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SEE_MY_PAGE_LINK_QUERY,
  SEE_PAGE_LINK_QUERY,
} from "../../../Graphql/PageLink/query";
import PopupContainer from "../../Shared/PopupContainer";
import { BsPencil } from "react-icons/bs";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";
import { MdOutlineDescription } from "react-icons/md";
import { EDIT_PAGE_LINK_MEMO_MUTATION } from "../../../Graphql/PageLink/mutation";
import { FiLink } from "react-icons/fi";
import { SETTING_LINK_MUTATION } from "../../../Graphql/User/mutation";
import { ME_QUERY } from "../../../Hooks/useMe";
import { outPopup } from "../../../apollo";

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
const Title = styled.div`
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
const SubmitInput = styled.input`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const PageURLLayout = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const PageURL = styled.div`
  padding: 20px;
  padding: 1.25rem;
  background-color: #ffffff;
  border-radius: 40px;
  border-radius: 2.5rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 120%;
  word-break: break-all;
  cursor: pointer;
`;

const DelBtn = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const DetailPageLink = ({ link, userEmail }) => {
  const pageTitle = localStorage.getItem("addBookmark");
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });

  const { data, loading } = useQuery(SEE_PAGE_LINK_QUERY, {
    variables: {
      pageTitle,
    },
  });
  const onCompleted = (result) => {
    const {
      editPageLinkMemo: { ok },
    } = result;
    if (ok) {
      setIsEdit(false);
    }
  };

  const [editPageLINKMemo, { loading: editLoading }] = useMutation(
    EDIT_PAGE_LINK_MEMO_MUTATION,
    {
      onCompleted,
    }
  );

  const onCompletedDel = (result) => {
    const {
      settingLink: { ok },
    } = result;
    if (ok) {
      outPopup();
    }
  };

  const [settingLink, { loading: settingLoading }] = useMutation(
    SETTING_LINK_MUTATION,
    {
      onCompleted: onCompletedDel,
      refetchQueries: [
        { query: SEE_MY_PAGE_LINK_QUERY, variables: { userEmail } },
        { query: ME_QUERY },
      ],
    }
  );

  const onSubmit = (data) => {
    const { memo } = data;
    editPageLINKMemo({
      variables: {
        userEmail,
        memo,
        pageTitle,
      },
    });
  };

  const onClickPageURL = () => {
    window.open(data?.seePageLink[0].pageURL, "_blank");
  };
  const onClickDelBtn = () => {
    settingLink({
      variables: {
        userEmail,
        siteName: pageTitle,
      },
    });
  };
  useEffect(() => {
    if (link) {
      const myMemo = link
        ? link.filter((item) => item.siteName === pageTitle)[0].memo
        : undefined;
      if (myMemo) {
        setValue("memo", myMemo);
      }
    }
  }, [link]);

  return (
    <PopupContainer>
      {data && (
        <Container onSubmit={handleSubmit(onSubmit)}>
          <Title>{pageTitle}</Title>
          <Layout>
            <Icon>
              <BsPencil />
            </Icon>
            <TextareaAutosize
              {...register("memo", {
                onChange: () => setIsEdit(true),
              })}
              minRows={5}
              maxRows={5}
              placeholder={`${pageTitle}에 대한 메모를 남겨주세요.`}
            ></TextareaAutosize>
          </Layout>
          {isEdit && <SubmitInput type="submit" valuse="수정하기" />}
          <Layout>
            <Icon>
              <MdOutlineDescription />
            </Icon>
            <TextareaAutosize
              minRows={5}
              maxRows={5}
              readOnly={true}
              value={data?.seePageLink[0]?.pageDescription}
            ></TextareaAutosize>
          </Layout>
          <PageURLLayout>
            <Icon>
              <FiLink />
            </Icon>
            <PageURL onClick={onClickPageURL}>
              {data?.seePageLink[0].pageURL}
            </PageURL>
          </PageURLLayout>
          <DelBtn onClick={onClickDelBtn}>즐겨찾기 목록에서 제거</DelBtn>
        </Container>
      )}
    </PopupContainer>
  );
};
export default DetailPageLink;
