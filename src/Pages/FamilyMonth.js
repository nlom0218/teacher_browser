import React from "react";
import styled from "styled-components";
import TopContents from "../Components/FamilyMonth/TopContents";

const Container = styled.div`
  background: url("https://images.unsplash.com/photo-1612392987205-c53f0200a175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;

const Layout = styled.div`
  background: linear-gradient(rgba(30, 30, 30, 0.1), rgba(30, 30, 30, 0.8));
  transition: background 1s ease;
  height: 100vh;
  width: 100vw;
`;

const FamilyMonth = () => {
  return (
    <Container>
      <Layout>
        <TopContents />
      </Layout>
    </Container>
  );
};

export default FamilyMonth;
