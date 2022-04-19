import React from "react";
import styled from "styled-components";
import { HeaderHome } from "../Components/Shared/HeaderLink";

const Container = styled.div`
  background: url("https://images.unsplash.com/photo-1612392987205-c53f0200a175?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80");
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;

const Layout = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9));
  height: 100vh;
  width: 100vw;
`;

const FamilyMonth = () => {
  return (
    <Container>
      <Layout>
        <HeaderHome />
      </Layout>
    </Container>
  );
};

export default FamilyMonth;
