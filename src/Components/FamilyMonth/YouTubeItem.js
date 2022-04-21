import React, { useState } from "react";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";

const SYouTubeItem = styled.div`
  color: rgb(10, 10, 10);
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

const YouTubeInfo = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const YouTubeImg = styled.img`
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const YouTubeType = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  border-radius: 2.5rem;
  font-size: 14px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const YouTubeTitle = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.5rem;
  display: grid;
  align-items: flex-start;
  line-height: 120%;
`;

const YouTubeItem = ({ url, title, bgColor, type }) => {
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
      <YouTubeInfo>
        <YouTubeImg src={getYouTubeImg(url)}></YouTubeImg>
        <YouTubeType>{type}</YouTubeType>
      </YouTubeInfo>
      <YouTubeTitle>{title}</YouTubeTitle>
    </SYouTubeItem>
  );
};

export default YouTubeItem;
