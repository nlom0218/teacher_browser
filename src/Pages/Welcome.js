import React, { useState } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import HomeSection from "../Components/Welcome/HomeSection";
import TopContents from "../Components/Welcome/TopContents";
import WelcomeSection from "../Components/Welcome/WelcomeSection";
import useMe from "../Hooks/useMe";
import useTitle from "../Hooks/useTitle";
import { customMedia } from "../styles";

const Container = styled.div`
  min-height: 100%;
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`;

const Welcome = () => {
  const titleUpdataer = useTitle("티처캔");

  const [welcomePage, setWelComPage] = useState("home");

  const me = useMe();

  if (!me) {
    return <Loading page="subPage" />;
  }

  return (
    <BasicContainer>
      <Container>
        <TopContents
          me={me}
          welcomePage={welcomePage}
          setWelComPage={setWelComPage}
        />
        {welcomePage === "home" && <HomeSection dDay={me?.dDay} />}
        {welcomePage === "notice" && <WelcomeSection />}
      </Container>
    </BasicContainer>
  );
};

export default Welcome;
