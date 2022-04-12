import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_NEWS_QUERY } from "../../Graphql/News/query";
import styled from "styled-components";
import SearchContainer from "./SearchContainer";
import NewsListContainer from "./NewsListContainer";
import { customMedia } from "../../styles";
import {
  hideNewsSection,
  seeNewsSection,
} from "../../Animations/WelcomeSectionAni";
import Loading from "../Shared/Loading";

const MoveContainer = styled.div`
  display: ${(props) => props.isSeeDisplay};
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${(props) => (props.welcomeSection === "welcome" ? "-100%" : 0)};
  left: ${(props) => (props.welcomeSection === "welcome" ? "100%" : 0)};
  animation: ${(props) =>
      !props.init &&
      (props.welcomeSection === "welcome" ? hideNewsSection : seeNewsSection)}
    1s ease forwards;
`;

const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
  ${customMedia.greaterThan("desktop")`
    min-height: 100%;
    max-height: 100%;
  `}
`;

const NewsSection = ({
  favoriteNews,
  userEmail,
  welcomeSection,
  init,
  setInit,
}) => {
  const [search, setSeacrh] = useState(undefined);
  const [start, setStart] = useState(1); // => page
  const [sort, setSort] = useState("sim");
  const { data, loading } = useQuery(GET_NEWS_QUERY, {
    variables: {
      search,
      start,
      sort,
    },
    skip: !search,
  });

  return (
    <MoveContainer welcomeSection={welcomeSection} init={init}>
      <Container>
        <SearchContainer
          search={search}
          setSeacrh={setSeacrh}
          setStart={setStart}
          sort={sort}
          setSort={setSort}
          favoriteNews={favoriteNews}
        />
        {loading ? (
          <Loading page="subPage" />
        ) : (
          <NewsListContainer
            start={start}
            setStart={setStart}
            search={search}
            data={data}
            userEmail={userEmail}
            favoriteNews={favoriteNews}
          />
        )}
      </Container>
    </MoveContainer>
  );
};

export default NewsSection;
