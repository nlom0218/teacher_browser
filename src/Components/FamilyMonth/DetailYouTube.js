import { useReactiveVar } from "@apollo/client";
import getYouTubeID from "get-youtube-id";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isFullScreenModeVar } from "../../apollo";
import useMedia from "../../Hooks/useMedia";
import DetailYouTubeContents from "./DetailYouTubeContents";
import { youtubeList } from "./ListYouTube";
import MainContentsLayout from "./MainContentsLayout";

const YouTubePlayer = styled.div`
  width: 100%;
  justify-self: center;
  height: calc(${(props) => props.multiply} * 9vw);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const DetailYouTube = ({ id, multiply }) => {
  const youtubeContents = youtubeList.filter(
    (item) => item.id === parseInt(id)
  )[0];

  return (
    <MainContentsLayout>
      <YouTubePlayer multiply={multiply}>
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeID(
            youtubeContents.url
          )}?showinfo=0&enablejsapi=1`}
          width="100%"
          height="100%"
          title={youtubeContents.title}
        ></iframe>
      </YouTubePlayer>
      <DetailYouTubeContents {...youtubeContents} />
    </MainContentsLayout>
  );
};

export default DetailYouTube;
