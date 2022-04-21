import React, { useState } from "react";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";

const SYouTubeItem = styled.div`
  background-color: ${(props) => props.bgColor};
  display: grid;
  grid-template-rows: 1fr 2fr;
  cursor: pointer;
  position: relative;
  border-radius: 20px;
  border-radius: 1.25rem;
  box-shadow: ${(props) =>
    props.hover
      ? "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"
      : "rgba(0, 0, 0, 0.24) 0px 3px 8px"};
  transform: ${(props) => (props.hover ? "scale(1.02)" : "scale(1)")};
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  :hover {
    /* background-color: ${(props) => props.theme.hoverColor}; */
  }
`;

const YouTubeImg = styled.img`
  padding: 20px;
  padding: 1.25rem;
  object-fit: cover;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const YouTubeTitle = styled.div`
  color: rgb(10, 10, 10);
  padding: 10px 20px;
  padding: 0.625rem 1.5rem;
  display: grid;
  align-items: flex-start;
  line-height: 120%;
`;

const YouTubeItem = ({ url, title, bgColor }) => {
  const [hover, setHover] = useState(false);
  const getYouTubeImg = (youTubeUrl) => {
    return `https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/0.jpg`;
  };
  return (
    <SYouTubeItem
      bgColor={bgColor}
      hover={hover}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <YouTubeImg
        src={getYouTubeImg(url)}
        youtubeImg={getYouTubeImg(url)}
      ></YouTubeImg>
      <YouTubeTitle>{title}</YouTubeTitle>
    </SYouTubeItem>
  );
};

export default YouTubeItem;
