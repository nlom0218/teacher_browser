import { useReactiveVar } from "@apollo/client";
import getYouTubeID from "get-youtube-id";
import React from "react";
import styled from "styled-components";
import { isFullScreenModeVar } from "../../apollo";
import useMedia from "../../Hooks/useMedia";
import { youtubeList } from "./MainYouTube";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const YouTubePlayer = styled.div`
  justify-self: center;
  width: calc(${(props) => props.multiply} * 16vw);
  height: calc(${(props) => props.multiply} * 9vw);
`;

const DetailYouTube = ({ id }) => {
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);
  const media = useMedia();
  const youtubeContents = youtubeList.filter(
    (item) => item.id === parseInt(id)
  )[0];

  const processMultiply = () => {
    if (media !== "Desktop") {
      return 3.5;
    }
    if (isFullScreenMode) {
      return 3.5;
    }
    return 2.5;
  };

  return (
    <Container>
      <YouTubePlayer multiply={processMultiply()}>
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeID(
            youtubeContents.url
          )}?showinfo=0&enablejsapi=1`}
          width="100%"
          height="100%"
        ></iframe>
      </YouTubePlayer>
    </Container>
  );
};

export default DetailYouTube;
