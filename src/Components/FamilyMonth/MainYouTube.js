import React from "react";
import styled from "styled-components";
import YouTubeItem from "./YouTubeItem";

const YouTubeList = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
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
  return (
    <YouTubeList>
      {youtubeList.map((item, index) => {
        return <YouTubeItem key={index} {...item} />;
      })}
    </YouTubeList>
  );
};

export default MainYouTube;
