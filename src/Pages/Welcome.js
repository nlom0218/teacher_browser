import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import { isPopupVar } from "../apollo";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import HomeSection from "../Components/Welcome/HomeSection";
import RegisterDDay from "../Components/Welcome/Popup/RegisterDDay";
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
  row-gap: ${(props) => (props.welcomePage === "home" ? "0px" : "20px")};
  row-gap: ${(props) => (props.welcomePage === "home" ? "0rem" : "1.25rem")};
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
  const [errMsg, setErrMsg] = useState(undefined);
  const [msg, setMsg] = useState(undefined);

  const me = useMe();

  if (!me) {
    return <Loading page="subPage" />;
  }

  return (
    <BasicContainer>
      <Container welcomePage={welcomePage}>
        <TopContents
          me={me}
          welcomePage={welcomePage}
          setWelComPage={setWelComPage}
        />
        {welcomePage === "home" && (
          <HomeSection
            dDay={me?.dDay}
            userEmail={me?.email}
            isMoveDDay={me?.isMoveDDay}
            setMsg={setMsg}
            setErrMsg={setErrMsg}
          />
        )}
        {welcomePage === "notice" && <WelcomeSection />}
      </Container>
      {errMsg && (
        <AlertMessage
          msg={errMsg}
          setMsg={setErrMsg}
          type="error"
          time={3000}
        />
      )}
      {msg && (
        <AlertMessage
          msg={msg}
          setMsg={setMsg}
          type="success"
          time={3000}
          isMoveDDay={me?.isMoveDDay}
        />
      )}
    </BasicContainer>
  );
};

export default Welcome;
