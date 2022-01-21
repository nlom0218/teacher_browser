import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_QUERY } from '../../Graphql/News/query';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import { BsStar, BsStarFill } from "react-icons/bs"

const Container = styled.div`
  position: relative;
  min-height: 100%;
  max-height: 100%;
`

const SearchContainer = styled.div`
  top: 0;
  left: 0;
  width: 40%;
  padding: 20px;
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  grid-template-rows: 1fr;
`

const SearchBox = styled.div`
  background-color: ${props => props.theme.contentBgColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  min-height: 100%;
  max-height: 100%;
`

const NewsListContainer = styled.div`
  padding: 20px;
  top: 0;
  right: 0;
  width: 60%;
  position: absolute;
  min-height: 100%;
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const NewsList = styled.div`
  display: grid;
  row-gap: 1px;
  border: 1px solid ${props => props.theme.fontColor};
  transition: 1s ease border;
`

const SearchResult = styled.div`
  font-size: 1.25rem;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: flex-end;
`

const SearchTitle = styled.div`
  .news_search_title {
    font-weight: 600;
  }
`

const StartIcon = styled.div`
  cursor: pointer;
  svg {
    color: yellow;
    display: flex;
    font-size: 2em;
    font-size: 2rem;
  }
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
  return (<Container>
    <SearchContainer>
      <SearchBox>
        검색입니담
      </SearchBox>
    </SearchContainer>
    <NewsListContainer>
      <SearchResult>
        <SearchTitle><span className="news_search_title">{search}</span> NAVER NEWS 검색 결과</SearchTitle>
        <StartIcon><BsStarFill /></StartIcon>
      </SearchResult>
      <NewsList>
        {data?.getNews?.map((item, index) => {
          return <NewsItem key={index} item={item} />
        })}
      </NewsList>
    </NewsListContainer>
  </Container>);
}

export default NewsSection;