import React from "react";
import styled from "styled-components";
import { customMedia } from "../styles";
import TopContents from "../Components/FamilyMonth/TopContents";
import MainYouTube from "../Components/FamilyMonth/MainYouTube";
import BasicContainer from "../Components/Shared/BasicContainer";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  grid-template-rows: auto 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`;

const FamilyMonth = () => {
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <TopContents />
        <MainYouTube />
      </Container>
    </BasicContainer>
  );
};

export default FamilyMonth;
