import { useReactiveVar } from "@apollo/client";
import React from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import styled from "styled-components";
import { darkModeVar } from "../apollo";
import { HeaderHome } from "../Components/Shared/HeaderLink";
import SlideBtn from "../Components/Shared/SlideBtn";

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

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-items: flex-end;
`;

const FamilyMonth = () => {
  const darkMode = useReactiveVar(darkModeVar);
  console.log(darkMode);
  return (
    <Container>
      <Layout>
        <TopContents>
          <HeaderHome />
          <SlideBtn
            leftContents={true}
            rigthContents={false}
            state={darkMode}
            darkMode={true}
            leftIcon={<BsMoonFill style={{ color: "yellow" }} />}
            rigthIcon={<BsSunFill style={{ color: "tomato" }} />}
          />
        </TopContents>
      </Layout>
    </Container>
  );
};

export default FamilyMonth;
