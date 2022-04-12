import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import styled from "styled-components";
import {
  hideNewsSection,
  seeNewsSection,
} from "../../Animations/WelcomeSectionAni";
import { moveHome } from "../../apollo";
import AlertMessage from "../Shared/AlertMessage";
import { customMedia } from "../../styles";
import WelcomeContents from "./WelcomeContents";
import TopContents from "./TopContents";
import BottomContents from "./BottomContents";

const Container = styled.div`
  padding: 40px 20px;
  padding: 2.5rem 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 40px;
  row-gap: 2.5rem;
  align-items: flex-start;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
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
