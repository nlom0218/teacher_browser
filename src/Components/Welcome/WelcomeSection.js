import React, { useState } from "react";
import styled from "styled-components";
import AlertMessage from "../Shared/AlertMessage";
import WelcomeContents from "./WelcomeContents";
import BottomContents from "./BottomContents";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  align-items: flex-start;
`;

const MoveIcon = styled.div`
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 2;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`;

const WelcomeSection = () => {
  const [msg, setMsg] = useState(undefined);

  return (
    <Container>
      <WelcomeContents />
      <BottomContents />
      <AlertMessage msg={msg} type="success" setMsg={setMsg} />
    </Container>
  );
};

export default WelcomeSection;
