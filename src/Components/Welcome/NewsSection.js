import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_QUERY } from '../../Graphql/News/query';
import styled from 'styled-components';
import SearchContainer from './SearchContainer';
import NewsListContainer from './NewsListContainer';

const Container = styled.div`
  position: relative;
  min-height: 100%;
  max-height: 100%;
`

const NewsSection = () => {
  const [search, setSeacrh] = useState(undefined)
  const [start, setStart] = useState(1) // => page
  const [sort, setSort] = useState("sim")
  const { data, loading } = useQuery(GET_NEWS_QUERY, {
    variables: {
      search,
      start,
      sort
    },
    skip: !search
  })
  return (<Container>
    <SearchContainer
      search={search}
      setSeacrh={setSeacrh}
      sort={sort}
      setSort={setSort}
    />
    <NewsListContainer search={search} data={data} />
  </Container>);
}

export default NewsSection;