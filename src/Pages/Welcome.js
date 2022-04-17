import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { welcomeSectionVar } from "../apollo";
import BasicContainer from "../Components/Shared/BasicContainer";
import NewsSection from "../Components/Welcome/NewsSection";
import WelcomeSection from "../Components/Welcome/WelcomeSection";
import useMe from "../Hooks/useMe";
import useTitle from "../Hooks/useTitle";
import LogoImage1 from "../image/LogoImage.png";
import LogoImage2 from "../image/LogoImage2.png";
import LogoImage3 from "../image/LogoImage3.png";
import LogoImage4 from "../image/LogoImage4.png";

const Container = styled.div`
  min-height: 100%;
`;

const Welcome = () => {
  useTitle("티처캔");

  const welcomeSection = useReactiveVar(welcomeSectionVar);

  const me = useMe();

  const [init, setInit] = useState(true);

  return (
    <BasicContainer>
      <Container>
        <WelcomeSection init={init} setInit={setInit} welcomeSection={welcomeSection} logoImageArr={[LogoImage1, LogoImage2, LogoImage3, LogoImage4]} me={me} />
        <NewsSection init={init} setInit={setInit} welcomeSection={welcomeSection} userEmail={me?.email} favoriteNews={me?.favoriteNews} />
      </Container>
    </BasicContainer>
  );
};

export default Welcome;
