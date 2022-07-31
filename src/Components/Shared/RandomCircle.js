import React from "react";
import IcRandomCircleMint from "../../icons/RandomCircle/RandomCircleMint";
import IcRandomCirclePink from "../../icons/RandomCircle/RandomCirclePink";
import IcRandomCircleSky from "../../icons/RandomCircle/RandomCircleSky";
import IcRandomCircleOrange from "../../icons/RandomCircle/RandomCircleOrange";
import IcRandomCirclePurple from "../../icons/RandomCircle/RandomCirclePurple";
import IcRandomCircleYellow from "../../icons/RandomCircle/RandomCircleYellow";
import styled, { keyframes } from "styled-components";

const RandomCircleAni = keyframes`
  0% {
    top: -20px;
    top: -1.25rem;
  }
  25% {
    top: -50px;
    top: -3.125rem;
  }
  50% {
    top: -20px;
    top: -1.25rem;
  }
`;

const Container = styled.div`
  justify-self: center;
  min-width: 116px;
  min-width: 7.25rem;
  max-width: 116px;
  max-width: 7.25rem;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 5px;
  column-gap: 0.3125rem;
  svg {
    display: flex;
  }
  div {
    top: -20px;
    top: -1.25rem;
  }
`;

const First = styled.div`
  position: absolute;
  left: 0;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 0s;
`;

const Second = styled.div`
  position: absolute;
  left: 20px;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 0.2s;
`;

const Third = styled.div`
  position: absolute;
  left: 40px;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 0.4s;
`;

const Fourth = styled.div`
  position: absolute;
  left: 60px;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 0.6s;
`;

const Fifth = styled.div`
  position: absolute;
  left: 80px;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 0.8s;
`;

const Sixth = styled.div`
  position: absolute;
  left: 100px;
  animation: ${RandomCircleAni} 2s ease infinite forwards;
  animation-delay: 1s;
`;

const RandomCircle = () => {
  return (
    <Container>
      <First>
        <IcRandomCircleMint />
      </First>
      <Second>
        <IcRandomCirclePink />
      </Second>
      <Third>
        <IcRandomCircleSky />
      </Third>
      <Fourth>
        <IcRandomCircleOrange />
      </Fourth>
      <Fifth>
        <IcRandomCirclePurple />
      </Fifth>
      <Sixth>
        <IcRandomCircleYellow />
      </Sixth>
    </Container>
  );
};

export default RandomCircle;
