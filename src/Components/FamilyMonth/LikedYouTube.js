import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PageBtn from "./Shared/PageBtn";
import styled from "styled-components";
import YouTubeList from "./Shared/YouTubeList";
import { youtubeList } from "./AllListYouTube";
import { FaHeart } from "react-icons/fa";
import { customMedia } from "../../styles";

const Container = styled.div`
  align-self: center;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
`;

const LikedMsg = styled.div`
  align-self: center;
  padding-left: 20px;
  padding-left: 1.25rem;
  display: flex;
  align-items: center;
  font-size: 1.25em;
  font-size: 1.25rem;
  svg {
    display: flex;
    margin-left: 5px;
    margin-left: 0.3125rem;
    color: #e84545;
  }
`;

const LikedYouTube = () => {
  const location = useLocation();
  const { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <Container>
      <LikedMsg>
        <div>좋아요 한 가정의 달 이야기</div>
        <FaHeart />
      </LikedMsg>
      <PageBtn page={page} pageType="liked" />
      <YouTubeList youtubeList={youtubeList} />
    </Container>
  );
};

export default LikedYouTube;
