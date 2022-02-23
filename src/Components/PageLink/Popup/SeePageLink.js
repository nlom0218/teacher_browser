import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { SEE_PAGE_LINK_QUERY } from "../../../Graphql/PageLink/query";
import PopupContainer from "../../Shared/PopupContainer";
import { MdOutlineDescription } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { FiLink } from "react-icons/fi";
import Loading from "../../Shared/Loading";

const Container = styled.div`
  min-height: 100%;
  max-height: 100%;
  display: grid;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto 1fr auto;
`;

const Title = styled.div`
  justify-self: flex-end;
  font-size: 1.25rem;
  font-size: 1.25em;
`;

const Description = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
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
  }
`;
const Icon = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  svg {
    font-size: 1.5rem;
    font-size: 1.5em;
    display: flex;
  }
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

const SeePageLink = () => {
  const pageTitle = localStorage.getItem("addBookmark");

  const { data, loading } = useQuery(SEE_PAGE_LINK_QUERY, {
    variables: {
      pageTitle,
    },
  });
  const onClickPageURL = () => {
    window.open(data?.seePageLink[0].pageURL, "_blank");
  };

  if (loading) {
    return <Loading page="popupPage" />
  }

  return (
    <PopupContainer maxHeight={true}>
      {data && (
        <Container>
          <Title>{data?.seePageLink[0].pageTitle}</Title>
          <Description>
            <Icon>
              <MdOutlineDescription />
            </Icon>
            <TextareaAutosize
              value={data?.seePageLink[0].pageDescription}
            ></TextareaAutosize>
          </Description>
          <PageURLLayout>
            <Icon>
              <FiLink />
            </Icon>
            <PageURL onClick={onClickPageURL}>
              {data?.seePageLink[0].pageURL}
            </PageURL>
          </PageURLLayout>
        </Container>
      )}
    </PopupContainer>
  );
};

export default SeePageLink;
