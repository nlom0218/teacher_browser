import React from "react";
import styled from "styled-components";
import Qroptionbtn from "./Qroptionbtn";
import { customMedia } from "../../styles";
import Qrcontext from "./Qrcontext";
import { isPopupVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import QrPrintMain from "./QrPrint/QrPrintMain";
const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 1fr 3fr;
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

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  padding: 20px;
  padding: 1.25rem;
  justify-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const Qrstorage = ({ mode, setMode, url, imageUrl }) => {
  const isPopup = useReactiveVar(isPopupVar);

  return (
    <Container>
      <Title>내 QR코드 보관함</Title>
      <div>
        <Qroptionbtn mode={mode} setMode={setMode} />
      </div>
      <Table>
        <Qrcontext url={url} imageUrl={imageUrl} />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
      </Table>
      {isPopup === "printQR" && <QrPrintMain />}
    </Container>
  );
};

export default Qrstorage;
