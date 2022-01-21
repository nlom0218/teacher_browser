import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_QUERY } from '../../Graphql/News/query';
import NewsItem from './NewsItem';
import styled from 'styled-components';

const NewsList = styled.div`
  display: grid;
  row-gap: 20px;
`

const NewsSection = () => {
  const [search, setSeacrh] = useState("초등학교")
  const [start, setStart] = useState(1) // => page
  const [sort, setSort] = useState("sim")
  const { data, loading } = useQuery(GET_NEWS_QUERY, {
    variables: {
      search,
      start,
      sort
    }
  })
  return (<div>
    <NewsList>
      {data?.getNews?.map((item, index) => {
        return <NewsItem key={index} item={item} />
      })}
    </NewsList>
  </div>);
}

export default NewsSection;