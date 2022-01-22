import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_NEWS_QUERY } from '../../Graphql/News/query';
import styled from 'styled-components';
import SearchContainer from './SearchContainer';
import NewsListContainer from './NewsListContainer';
import { customMedia } from '../../styles';
import { hideNewsSection, seeNewsSection } from '../../Animations/WelcomeSectionAni';

const MoveContainer = styled.div`
  position: absolute;
  top: 40px;
  top: 2.5rem;
  bottom: 0;
  right: ${props => props.welcomeSection === "welcome" ? "-100%" : 0};
  left: ${props => props.welcomeSection === "welcome" ? "100%" : 0};
  animation: ${props => !props.init && (props.welcomeSection === "welcome" ? hideNewsSection : seeNewsSection)} 1s ease forwards;
`

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    position: relative;
    min-height: 100%;
    max-height: 100%;
  `}
`

const NewsSection = ({ favoriteNews, userEmail, welcomeSection, init }) => {
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
  return (<MoveContainer welcomeSection={welcomeSection} init={init}>
    <Container>
      <SearchContainer
        search={search}
        setSeacrh={setSeacrh}
        setStart={setStart}
        sort={sort}
        setSort={setSort}
        favoriteNews={favoriteNews}
      />
      <NewsListContainer
        start={start}
        setStart={setStart}
        search={search}
        data={data}
        userEmail={userEmail}
        favoriteNews={favoriteNews}
      />
    </Container>
  </MoveContainer>
  );
}

export default NewsSection;