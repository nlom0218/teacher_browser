import React from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import { BsStar, BsStarFill } from "react-icons/bs"
import { useMutation } from '@apollo/client';
import { SET_FAVORITE_NEWS_MUTATION } from '../../Graphql/News/mutation';
import { ME_QUERY } from '../../Hooks/useMe';
import { customMedia } from '../../styles';

const SNewsListContainer = styled.div`
  display: grid;
  align-items: flex-start;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("desktop")`
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
    .empty_news_list {
      padding: 20px;
      padding: 1.25rem;
      text-align: center;
    }
  `}
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
    color: ${props => props.favoriteNews && "yellow"};
    display: flex;
    font-size: 1.75em;
    font-size: 1.75rem;
  }
`

const BottomContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const PageNum = styled.div``

const PageBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  cursor: pointer;
  .news_start_btn {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    background-color: ${props => props.theme.btnBgColor};
    color: ${props => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
  }
`


const NewsListContainer = ({ search, data, userEmail, favoriteNews, start, setStart }) => {
  const onCompleted = (result) => {

  }

  const [setFavoriteNews, { loading }] = useMutation(SET_FAVORITE_NEWS_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }]
  })

  const onClickIcon = () => {
    if (loading) {
      return
    }
    setFavoriteNews({
      variables: {
        news: search,
        userEmail
      }
    })
  }

  const onClickPreBtn = () => setStart(prev => prev - 1)
  const onClickNextBtn = () => setStart(prev => prev + 1)

  return (<SNewsListContainer>
    {data ? <React.Fragment>
      {data?.getNews.length !== 0 ? <React.Fragment>
        <SearchResult>
          <SearchTitle>
            <span className="news_search_title">{search}</span> NAVER NEWS 검색 결과
          </SearchTitle>
          <StartIcon onClick={onClickIcon} favoriteNews={favoriteNews.includes(search)}>
            {favoriteNews.includes(search) ? <BsStarFill /> : <BsStar />}
          </StartIcon>
        </SearchResult>
        <NewsList>
          {data?.getNews?.map((item, index) => {
            return <NewsItem key={index} item={item} />
          })}

        </NewsList>
        <BottomContents>
          <PageNum>{start} PAGE</PageNum>
          <PageBtn>
            {start !== 1 ? <div onClick={onClickPreBtn} className="news_start_btn">이전</div> : <div></div>}
            <div onClick={onClickNextBtn} className="news_start_btn">다음</div>
          </PageBtn>
        </BottomContents>
      </React.Fragment>
        : <div className="empty_news_list">검색 결과가 없습니다.😅</div>
      }
    </React.Fragment>
      : <div className="empty_news_list">검색을 통해 원하는 뉴스를 찾아보세요!😀</div>
    }
  </SNewsListContainer>);
}

export default NewsListContainer;