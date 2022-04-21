import { useReactiveVar } from "@apollo/client";
import getYouTubeID from "get-youtube-id";
import React, { useEffect, useState } from "react";
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
  const [multiply, setMultiply] = useState();
  const isFullScreenMode = useReactiveVar(isFullScreenModeVar);
  const media = useMedia();
  const youtubeContents = youtubeList.filter(
    (item) => item.id === parseInt(id)
  )[0];

  console.log(media);

  useEffect(() => {
    if (media !== "Desktop") {
      setMultiply(3.5);
    }
    if (isFullScreenMode) {
      setMultiply(3.5);
      console.log("gogo");
    }
    setMultiply(2.5);
  }, [media, isFullScreenMode]);

  console.log(isFullScreenMode);
  console.log(multiply);

  return (
    <Container>
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
    </Container>
  );
};

export default DetailYouTube;
