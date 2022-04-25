import React from "react";
import styled from "styled-components";
import { customMedia } from "../../../styles";
import YouTubeItem from "../YouTubeItem";

const SYouTubeList = styled.div`
  grid-column: 1 / -1;
  padding: 20px;
  padding: 1.25rem;
  padding-top: 0px;
  padding-top: 0rem;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`;

const YouTubeList = ({ youtubeList }) => {
  return (
    <SYouTubeList>
      {youtubeList.map((item, index) => {
        return <YouTubeItem key={index} {...item} />;
      })}
    </SYouTubeList>
  );
};

export default YouTubeList;
