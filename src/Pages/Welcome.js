import React from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import HomeSection from "../Components/Welcome/HomeSection";
import TopContents from "../Components/Welcome/TopContents";
import WelcomeSection from "../Components/Welcome/WelcomeSection";
import useMe from "../Hooks/useMe";
import useTitle from "../Hooks/useTitle";

const Container = styled.div`
  min-height: 100%;
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
`;

const Welcome = () => {
  const titleUpdataer = useTitle("티처캔");

  const me = useMe();

  return (
    <BasicContainer>
      <Container>
        <TopContents me={me} />
        <HomeSection />
        <WelcomeSection />
      </Container>
    </BasicContainer>
  );
};

export default Welcome;
