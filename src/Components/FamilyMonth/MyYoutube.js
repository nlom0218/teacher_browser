import React from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PageBtn from "./Shared/PageBtn";
import styled from "styled-components";
import YouTubeList from "./Shared/YouTubeList";
import { youtubeList } from "./AllListYouTube";
import { customMedia } from "../../styles";
import { AiFillFolderOpen } from "react-icons/ai";

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
  }
`;

const MyYouTube = () => {
  const location = useLocation();
  const { page } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <Container>
      <LikedMsg>
        <div>내가 만든 가정의 달 이야기</div>
        <AiFillFolderOpen />
      </LikedMsg>
      <PageBtn page={page} pageType="liked" />
      <YouTubeList youtubeList={youtubeList} />
    </Container>
  );
};

export default MyYouTube;
