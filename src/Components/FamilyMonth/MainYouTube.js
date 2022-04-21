import React from "react";
import styled from "styled-components";
import YouTubeItem from "./YouTubeItem";

const YouTubeList = styled.div`
  padding: 20px;
  padding: 1.25rem;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`;

const youtubeList = [
  {
    url: "https://www.youtube.com/watch?v=cS-IiArGmcU",
    title: "김진호-가족사진",
    bgColor: "#F38181",
    type: "노래",
  },
  {
    url: "https://www.youtube.com/watch?v=7c64qLxZUb4&t=536s",
    title: "김진호-가족사진 속에 숨겨둔 어머니의 10000원",
    bgColor: "#FCE38A",
    type: "영화리뷰",
  },
  {
    url: "https://www.youtube.com/watch?v=wFeFIN8CI0A",
    title: "김진호-가족사진",
    bgColor: "#EAFFD0",
    type: "다큐",
  },
  {
    url: "https://www.youtube.com/watch?v=G5kzUpWAusI&t=7s",
    title: "김진호-가족사진",
    bgColor: "#95E1D3",
    type: "코미디",
  },
  {
    url: "https://www.youtube.com/watch?v=IE8HIsIrq4o&t=37s",
    title: "김진호-가족사진",
    bgColor: "#A8E6CF",
    type: "브이로그",
  },
  {
    url: "https://www.youtube.com/watch?v=1z4NjPc4_i0",
    title: "김진호-가족사진",
    bgColor: "#AA96DA",
    type: "드라마리뷰",
  },
  {
    url: "https://www.youtube.com/watch?v=P0ikE6tFbas",
    title: "김진호-가족사진",
    bgColor: "#FCE38A",
    type: "노래",
  },
  {
    url: "https://www.youtube.com/watch?v=G5kzUpWAusI&t=7s",
    title: "김진호-가족사진",
    bgColor: "#FCBAD3",
    type: "노래",
  },
  {
    url: "https://www.youtube.com/watch?v=IE8HIsIrq4o&t=37s",
    title: "김진호-가족사진",
    bgColor: "#A8D8EA",
    type: "노래",
  },
  {
    url: "https://www.youtube.com/watch?v=1z4NjPc4_i0",
    title: "김진호-가족사진",
    bgColor: "#FFFFD2",
    type: "노래",
  },
  {
    url: "https://www.youtube.com/watch?v=P0ikE6tFbas",
    title: "김진호-가족사진",
    bgColor: "#DBE2EF",
    type: "노래",
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
