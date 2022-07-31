import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";
import routes from "../../routes";
import { customMedia } from "../../styles";
import PageBtn from "./Shared/PageBtn";
import YouTubeList from "./Shared/YouTubeList";
import { useQuery } from "@apollo/client";
import { SEARCH_FAMILY_STROY_NUM, SEE_SEARCH_FAMILY_STORY } from "../../Graphql/FamilyStory/query";
import Loading from "../Shared/Loading";
import NotContentsMsgContainer from "./NotContentsMsgContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Form = styled.form`
  justify-self: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  ${customMedia.greaterThan("tablet")`
    width: 80%;
    font-size: 1em;
    font-size: 1rem;
  `}
  ${customMedia.greaterThan("desktop")`
    width: 60%;
    `}
  .textInput {
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    padding: 15px 20px;
    padding: 0.938rem 1.25rem;
    border-radius: 10px;
    border-radius: 0.625rem;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.6;
      transition: color 1s ease;
    }
  }
  .submitInput {
    background-color: #f38181;
    padding: 0px 40px;
    padding: 0rem 2.5rem;
    color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 10px;
    border-radius: 0.625rem;
    cursor: pointer;
  }
`;

const SearchYouTube = ({ setErrMsg }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { data, loading, refetch } = useQuery(SEE_SEARCH_FAMILY_STORY, {
    variables: {
      tag: search,
      page: parseInt(page),
    },
    skip: !search,
  });

  const { data: num, loading: numLoading } = useQuery(SEARCH_FAMILY_STROY_NUM, {
    variables: {
      tag: search,
    },
    skip: !search,
  });

  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { search } = data;
    if (!search) {
      setErrMsg("검색할 태그를 입력하세요.😢");
      return;
    }
    navigate({
      pathname: `${routes.familyMonth}/search`,
      search: `?search=${search}&page=1`,
    });
  };

  useEffect(() => {
    setValue("search", search);
  }, [search]);

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="textInput"
          type="text"
          autoComplete="off"
          {...register("search")}
          placeholder="검색할 태그를 입력하세요.😀"
        />
        <input type="submit" value="검색" className="submitInput" />
      </Form>
      {search && (
        <React.Fragment>
          <PageBtn
            page={page}
            pageType="search"
            search={search}
            itemNum={num?.searchFamilyStoryNum}
            refetch={refetch}
          />
          {data?.seeSearchFamilyStory?.length === 0 ? (
            <NotContentsMsgContainer preText="검색된" />
          ) : (
            <YouTubeList youtubeList={data?.seeSearchFamilyStory} />
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default SearchYouTube;
