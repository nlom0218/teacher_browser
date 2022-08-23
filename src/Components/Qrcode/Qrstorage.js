import React from "react";
import styled from "styled-components";
import Qroptionbtn from "./Qroptionbtn";
import { customMedia } from "../../styles";
import Qrcontext from "./Qrcontext";

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

const Storages = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 5fr;
  background: ${(props) => props.theme.cardBg};
  width: 100%;
  height: 150px;
  border-radius: 5px;
  border-radius: 0.3125rem;
  padding: 10px;
  padding: 0.625rem;
`;

const Check = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

const Body = styled.div`
  display: grid;
  width: 100px;
  height: 100px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
`;

const Subject = styled.div`
  display: grid;
  width: 90%;
  height: 100px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  justify-self: center;
  align-self: center;
  padding: 10px;
  padding: 0.625rem;
`;

const Qrstorage = ({ mode, setMode }) => {
  return (
    <Container>
      <Title>내 QR코드 보관함</Title>
      <div>
        <Qroptionbtn mode={mode} setMode={setMode} />
      </div>
      <Table>
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
        <Qrcontext />
      </Table>
    </Container>
  );
};

export default Qrstorage;
