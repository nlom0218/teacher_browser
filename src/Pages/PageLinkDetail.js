import { useMutation, useQuery } from "@apollo/client";
import getOverlappingDaysInIntervals from "date-fns/esm/fp/getOverlappingDaysInIntervals/index.js";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react/cjs/react.development";
import styled from "styled-components";
import FolderItem from "../Components/PageLinkRegister/FolderItem";
import TypeItem from "../Components/PageLinkRegister/TypeItem";
import {
  DELETE_PAGE_LINK_MUTATION,
  UPDATE_PAGE_LINK_MUTATION,
} from "../Graphql/PageLink/mutation";
import { SEE_PAGE_LINK_QUERY } from "../Graphql/PageLink/query";
import routes from "../routes";

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
  border-radius: 20px;
  border-radius: 1.25rem;
  cursor: pointer;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const DelBtn = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.redColor};
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

const PageLinkDetail = () => {
  const { pageTitle } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery(SEE_PAGE_LINK_QUERY, {
    variables: {
      pageTitle,
    },
  });
  const folder = [
    "교육청",
    "연수원",
    "학급경영",
    "국어",
    "영어",
    "수학",
    "사회",
    "과학",
    "음악",
    "미술",
    "체육",
    "실과",
    "창체",
    "다문화",
    "안전",
    "기초학력",
    "출판사",
  ];
  const pageType = ["블로그", "유튜브"];
  const [submitFolder, setSubmitFolder] = useState([]);
  const [submitType, setSubmitType] = useState(undefined);

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });

  const onCompleted = (result) => {
    const {
      updatePageLink: { ok, error },
    } = result;
    if (!ok) {
      window.alert(error);
    } else {
      window.alert("추천 페이지가 수정되었습니다.");
    }
  };

  const deleteOnCompleted = (result) => {
    const {
      deletePageLink: { ok },
    } = result;
    if (ok) {
      window.alert("추천 페이지가 삭제되었습니다.");
      navigate(routes.pageLinkAllList);
    }
  };

  const [updatePageLink, { loading: updateLoading }] = useMutation(
    UPDATE_PAGE_LINK_MUTATION,
    {
      onCompleted,
    }
  );

  const [deletePageLink, { loading: deleteLoading }] = useMutation(
    DELETE_PAGE_LINK_MUTATION,
    {
      onCompleted: deleteOnCompleted,
    }
  );

  const onSubmit = (data) => {
    const { pageDescription } = data;
    console.log(pageDescription, pageTitle, submitFolder);
    if (submitFolder.length === 0) {
      window.alert("폴더를 선택하세요.");
      return;
    }
    updatePageLink({
      variables: {
        pageTitle,
        pageDescription,
        folder: submitFolder,
      },
    });
  };

  const onClickDelBtn = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePageLink({
        variables: {
          pageTitle,
        },
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (data) {
      setValue("pageTitle", data?.seePageLink[0]?.pageTitle);
      setValue("pageURL", data?.seePageLink[0]?.pageURL);
      setValue("pageDescription", data?.seePageLink[0]?.pageDescription);
      setSubmitFolder(data?.seePageLink[0]?.folder);
      setSubmitType(data?.seePageLink[0]?.type);
    }
  }, [data]);

  return (
    <Container>
      <BasicLayout>
        <PageTitle>추천 페이지 수정하기</PageTitle>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <InputLayout>
            <InputTitle>추천 페이지 이름: 수정 불가능</InputTitle>
            <input
              {...register("pageTitle", { required: true })}
              autoComplete="off"
              readOnly={true}
            />
          </InputLayout>
          <InputLayout>
            <InputTitle>추천 페이지 URL: 수정 불가능</InputTitle>
            <input
              {...register("pageURL", { required: true })}
              autoComplete="off"
              readOnly={true}
            />
          </InputLayout>
          <InputLayout>
            <InputTitle>추천 페이지 설명: 필수 / 수정 가능</InputTitle>
            <TextareaAutosize
              {...register("pageDescription", { required: true })}
              minRows="8"
              maxRows="8"
              placeholder="추천 페이지 설명을 적으세요. 줄바꿈이 적용됩니다."
            ></TextareaAutosize>
          </InputLayout>
          <InputLayout>
            <InputTitle>폴더 선택(중복 가능): 필수 / 수정 가능</InputTitle>
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
            <InputTitle>
              추천 페이지 종류(중복 불가능): 생략 가능 / 수정 불가능 / 다른
              것으로 선택하고 수정해도 변하지 않음!
            </InputTitle>
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
          <SubmitInput type="submit" value="수정하기" />
        </FormContainer>
        <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
      </BasicLayout>
    </Container>
  );
};

export default PageLinkDetail;
