import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isPopupVar } from "../apollo";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
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
`;

const Welcome = () => {
  const titleUpdataer = useTitle("티처캔");

  const [links, setLinks] = useState([]);

  const isPopup = useReactiveVar(isPopupVar);

  const [welcomePage, setWelComPage] = useState("home");
  const [errMsg, setErrMsg] = useState(undefined);
  const [msg, setMsg] = useState(undefined);

  const me = useMe();

  useEffect(() => {
    if (me) {
      setLinks(me?.homeLinks);
    } else {
      setLinks([]);
    }
  }, [me]);

  console.log(links);

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
            links={links}
            setLinks={setLinks}
            userId={me?._id}
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
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
    </BasicContainer>
  );
};

export default Welcome;
