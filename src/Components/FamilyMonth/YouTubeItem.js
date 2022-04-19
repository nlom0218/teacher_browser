import React, { useState } from "react";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";

const SYouTubeItem = styled.div`
  min-height: 240px;
  display: grid;
  grid-template-rows: 5fr 1fr;
  cursor: pointer;
  transform: ${(props) => props.hover && "scale(1.1)"};
  transition: transform 0.4s ease;
  position: relative;
  border: 1px solid rgba(10, 10, 10);
  border-radius: 5px;
  box-shadow: 1px 1px 1px rgba(10, 10, 10, 0.6);
`;

const YouTubeImg = styled.div`
  background: ${(props) => `url(${props.youtubeImg})`};
  background-position: center;
  /* background-size: cover; */
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const YouTubeTitle = styled.div`
  background-color: rgba(40, 40, 40, 0.6);
  color: rgb(200, 200, 200);
  text-align: center;
  display: grid;
  align-items: center;
  padding: 5px;
  padding: 0.3125rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const HoverBackground = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: rgba(20, 20, 20, 0.6);
  opacity: ${(props) => (props.hover ? 1 : 0)};
  transition: background-color 0.4s ease, opacity 0.4s ease;
  color: rgb(220, 220, 220);
  display: grid;
  align-items: center;
  justify-items: center;
`;

const YouTubeItem = ({ url, title }) => {
  const [hover, setHover] = useState(false);
  const getYouTubeImg = (youTubeUrl) => {
    return `https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/0.jpg`;
  };
  return (
    <SYouTubeItem
      hover={hover}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <YouTubeImg youtubeImg={getYouTubeImg(url)}></YouTubeImg>
      <YouTubeTitle>{title}</YouTubeTitle>
      <HoverBackground hover={hover}>
        <div>자세히 보기</div>
      </HoverBackground>
    </SYouTubeItem>
  );
};

export default YouTubeItem;
