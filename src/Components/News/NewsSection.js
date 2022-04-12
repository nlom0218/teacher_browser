import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_NEWS_QUERY } from "../../Graphql/News/query";
import styled from "styled-components";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import SearchContainer from "./SearchContainer";
import NewsListContainer from "./NewsListContainer";

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

const NewsSection = ({ favoriteNews, userEmail }) => {
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
  );
};

export default NewsSection;
