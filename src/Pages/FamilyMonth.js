import React from "react";
import styled from "styled-components";
import TopContents from "../Components/FamilyMonth/TopContents";
import MainYouTube from "../Components/FamilyMonth/MainYouTube";
import BasicContainer from "../Components/Shared/BasicContainer";

const Layout = styled.div`
  transition: background 1s ease;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  padding: 20px 40px;
  padding: 20px 2.5rem;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
`;

const FamilyMonth = () => {
  return (
    <BasicContainer menuItem={true}>
      <Layout>
        <MainYouTube />
      </Layout>
    </BasicContainer>
  );
};

export default FamilyMonth;
