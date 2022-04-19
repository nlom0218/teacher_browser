import React from "react";
import styled from "styled-components";
import TopContents from "../Components/FamilyMonth/TopContents";
import MainYouTube from "../Components/FamilyMonth/MainYouTube";

const Container = styled.div`
  background: url("https://images.unsplash.com/photo-1612392987205-c53f0200a175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
`;

const Layout = styled.div`
  background: linear-gradient(rgba(30, 30, 30, 0.1), rgba(30, 30, 30, 0.7));
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
`;

const FamilyMonth = () => {
  return (
    <Container>
      <Layout>
        <TopContents />
        <MainYouTube />
      </Layout>
    </Container>
  );
};

export default FamilyMonth;
