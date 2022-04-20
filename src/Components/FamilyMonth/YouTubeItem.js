import React, { useState } from "react";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";

const SYouTubeItem = styled.div`
  background-color: ${props=>props.theme.originBgColor};
  display: grid;
  grid-template-columns: 1fr auto;
  cursor: pointer;
  position: relative;
  :hover {
    background-color: ${props=>props.theme.hoverColor};
  }
`;

const YouTubeImg = styled.img`
 object-fit: cover;
  width: 120px;
  height: 60px;
`;

const YouTubeTitle = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.5rem;
  display: grid;
  align-items: center;
  line-height: 120%;
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
      <YouTubeTitle>{title}
      </YouTubeTitle>
      <YouTubeImg src={getYouTubeImg(url)} youtubeImg={getYouTubeImg(url)}></YouTubeImg>
    </SYouTubeItem>
  );
};

export default YouTubeItem;
