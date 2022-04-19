import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import getYouTubeId from "get-youtube-id";

const YouTubeList = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const YouTubeItem = styled.div`
  min-height: 240px;

  display: grid;
  grid-template-rows: 5fr 1fr;
  cursor: pointer;
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

const youtubeList = [
  {
    url: "https://www.youtube.com/watch?v=cS-IiArGmcU",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=7c64qLxZUb4&t=536s",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=wFeFIN8CI0A",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=G5kzUpWAusI&t=7s",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=IE8HIsIrq4o&t=37s",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=1z4NjPc4_i0",
    title: "김진호-가족사진",
  },
  {
    url: "https://www.youtube.com/watch?v=P0ikE6tFbas",
    title: "김진호-가족사진",
  },
];

const MainYouTube = () => {
  const getYouTubeImg = (youTubeUrl) => {
    return `https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/0.jpg`;
  };
  return (
    <YouTubeList>
      {youtubeList.map((item, index) => {
        return (
          <YouTubeItem key={index}>
            <YouTubeImg youtubeImg={getYouTubeImg(item.url)}></YouTubeImg>
            <YouTubeTitle>{item.title}</YouTubeTitle>
          </YouTubeItem>
        );
      })}
    </YouTubeList>
  );
};

export default MainYouTube;
