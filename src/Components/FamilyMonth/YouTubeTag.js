import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 5px;
  margin-bottom: 0.3125rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  background-color: ${(props) => props.bgColor};
  color: #000000;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  cursor: pointer;
  transform: ${(props) => (props.hover ? "scale(1.05)" : "scale(1)")};
  box-shadow: ${(props) =>
    props.hover
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
`;

const YouTubeTag = ({ tag, bgColor }) => {
  const [hover, setHover] = useState(false);
  return (
    <Container
      bgColor={bgColor}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      hover={hover}
    >
      #{tag}
    </Container>
  );
};

export default YouTubeTag;
