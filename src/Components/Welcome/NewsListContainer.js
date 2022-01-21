import React from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import { BsStar, BsStarFill } from "react-icons/bs"

const SNewsListContainer = styled.div`
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
  align-items: flex-start;
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
    /* color: yellow; */
    display: flex;
    font-size: 1.75em;
    font-size: 1.75rem;
  }
`

const NewsListContainer = ({ search, data }) => {
  return (<SNewsListContainer>
    {data && <React.Fragment>
      <SearchResult>
        <SearchTitle><span className="news_search_title">{search}</span> NAVER NEWS 검색 결과</SearchTitle>
        <StartIcon><BsStar /></StartIcon>
      </SearchResult>
      <NewsList>
        {data?.getNews?.map((item, index) => {
          return <NewsItem key={index} item={item} />
        })}
      </NewsList>
    </React.Fragment>

    }
  </SNewsListContainer>);
}

export default NewsListContainer;