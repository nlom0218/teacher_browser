import React from "react";
import styled from "styled-components";
import DDayContents from "./DDAYContents";
import LinkContents from "./LinkContents";

const Container = styled.div``;

const HomeSection = ({}) => {
  return (
    <Container>
      <DDayContents />
      <LinkContents />
    </Container>
  );
};

export default HomeSection;
