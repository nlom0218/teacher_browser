import React, { useState, useRef } from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 2fr 1fr;
`;

const Main = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr;
  width: 100%;

  align-items: center;
  justify-items: center;
`;
const IN = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: baseline;
  width: 70%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  text-align: center;
`;
const LineBox = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;

const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  width: 150px;
  height: 40px;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const TodoBody = styled.div`
  display: grid;
  width: 250px;
  height: 250px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const Qrresult = () => {
  return (
    <Container>
      <Main>
        <TodoBody></TodoBody>
        <IN>
          url 주소 입력값{" "}
          <LineBox>
            <Line />
          </LineBox>
        </IN>
      </Main>
      <Btn> 저장하기 </Btn>
    </Container>
  );
};

export default Qrresult;
