import React from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";
import { inPopup, isPopupVar, outPopup } from "../../apollo";
import Qrname from "./Qrname";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 3fr 1fr;
`;
const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px;
  padding: 2.5rem;
  font-size: 1.875em;
  font-size: 1.875rem;
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
  overflow: hidden;
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

const Body = styled.div`
  display: grid;
  width: 250px;
  height: 250px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;

const Qrresult = ({ mode, setMode }) => {
  const onClickBtn = () => {
    inPopup("registerQR");
  };
  const isPopup = useReactiveVar(isPopupVar);

  return (
    <Container>
      <Title>티처캔 QR코드 생성 도우미</Title>
      <Main>
        <Body></Body>
        <IN>
          url 주소 입력값{" "}
          <LineBox>
            <Line />
          </LineBox>
        </IN>
      </Main>
      <Btn> 공유? 복사? 다운?</Btn>
      <Btn onClick={onClickBtn}> 저장하기 </Btn>
      {isPopup === "registerQR" && <Qrname setMode={setMode} />}
    </Container>
  );
};

export default Qrresult;
