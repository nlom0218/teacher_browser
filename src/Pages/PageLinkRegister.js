import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import FolderItem from "../Components/PageLinkRegister/FolderItem";
import TypeItem from "../Components/PageLinkRegister/TypeItem";
import { CREATE_PAGE_LINK_MUTATION } from "../Graphql/PageLink/mutation";

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  position: absolute;
  top: 3%;
  bottom: 3%;
  right: 3%;
  left: 3%;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  overflow: ${(props) => (props.notScroll ? "scroll" : "scroll")};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;

const BasicLayout = styled.div`
  max-width: 100%;
  max-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const PageTitle = styled.div`
  justify-self: flex-end;
  font-size: 2em;
  font-size: 2rem;
`;

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  textarea {
    all: unset;
    resize: none;
    padding: 20px 40px;
    padding: 1.25rem 2.5rem;
    box-sizing: border-box;
    border-radius: 20px;
    border-radius: 1.25rem;
    border: 1px solid ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.contentBgColor};
    line-height: 160%;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const InputLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  input {
    background-color: ${(props) => props.theme.contentBgColor};
    padding: 20px 40px;
    padding: 1.25rem 2.5rem;
    border-radius: 20px;
    border-radius: 1.25rem;
    border: 1px solid ${(props) => props.theme.fontColor};
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
    }
  }
`;

const InputTitle = styled.div`
  padding: 0px 20px;
  padding: 0rem 1.25rem;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const Folder = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  border: 1px solid ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.contentBgColor};
`;

const SubmitInput = styled.input`
  padding: 20px;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  text-align: center;
  margin-bottom: 20px;
  margin-bottom: 1.25rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  cursor: pointer;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const PageLinkRegister = () => {
  const folder = [
    "????????????",
    "????????????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "??????",
    "????????????",
    "?????????",
    "?????????",
    "????????????",
    "??????????????????",
    "?????????",
    "?????????",
    "??????/??????",
    "????????????",
  ];
  const pageType = ["?????????", "?????????"];
  const [submitFolder, setSubmitFolder] = useState([]);
  const [submitType, setSubmitType] = useState(undefined);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onCompleted = (result) => {
    const {
      createPageLink: { ok, error },
    } = result;
    if (!ok) {
      window.alert(error);
    } else {
      window.alert("?????? ???????????? ?????????????????????.");
      setValue("pageTitle", "");
      setValue("pageDescription", "");
      setValue("pageURL", "");
      setSubmitFolder([]);
      setSubmitType(undefined);
    }
  };

  const [createPageLink, { loading }] = useMutation(CREATE_PAGE_LINK_MUTATION, {
    onCompleted,
  });

  const onSubmit = (data) => {
    const { pageTitle, pageDescription, pageURL } = data;
    if (submitFolder.length === 0) {
      window.alert("????????? ???????????????.");
      return;
    }
    createPageLink({
      variables: {
        pageTitle,
        pageDescription,
        pageURL,
        folder: submitFolder,
        ...(submitType && { type: submitType }),
      },
    });
  };
  return (
    <Container>
      <BasicLayout>
        <PageTitle>?????? ????????? ??????</PageTitle>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <InputTitle>?????? ????????? ??????(?????? ?????????): ??????</InputTitle>
            <input
              {...register("pageTitle", { required: true })}
              placeholder="?????? ????????? ????????? ????????????."
              autoComplete="off"
            />
          </InputLayout>
          <InputLayout>
            <InputTitle>?????? ????????? URL: ??????</InputTitle>
            <input
              {...register("pageURL", { required: true })}
              autoComplete="off"
              placeholder="?????? ???????????? ????????? ????????????. ex) https://www.teacher-can.com (https:// => ??????!!!)"
            />
          </InputLayout>
          <InputLayout>
            <InputTitle>?????? ????????? ??????: ??????</InputTitle>
            <TextareaAutosize
              {...register("pageDescription", { required: true })}
              minRows="8"
              maxRows="8"
              placeholder="?????? ????????? ????????? ????????????. ???????????? ???????????????."
            ></TextareaAutosize>
          </InputLayout>
          <InputLayout>
            <InputTitle>?????? ??????(?????? ??????): ??????</InputTitle>
            <Folder>
              {folder.map((item, index) => {
                return (
                  <FolderItem
                    key={index}
                    item={item}
                    setSubmitFolder={setSubmitFolder}
                    submitFolder={submitFolder}
                  />
                );
              })}
            </Folder>
          </InputLayout>
          <InputLayout>
            <InputTitle>?????? ????????? ??????(?????? ?????????): ?????? ??????</InputTitle>
            <Folder>
              {pageType.map((item, index) => {
                return (
                  <TypeItem
                    key={index}
                    item={item}
                    setSubmitType={setSubmitType}
                    submitType={submitType}
                  />
                );
              })}
            </Folder>
          </InputLayout>
          <SubmitInput type="submit" value="????????????" />
        </FormContainer>
      </BasicLayout>
    </Container>
  );
};

export default PageLinkRegister;
