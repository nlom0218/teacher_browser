import React, { useState, useRef } from "react";

import styled from "styled-components";
import QrcodeInput from "./QrcodeInput";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 2fr 1fr;
`;

const Icon = styled.div``;

const Main = styled.div`
  display: grid;
  width: 80%;
  align-items: center;
  justify-self: center;
`;
const IN = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
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

const Qrcodemake = () => {
  return (
    <Container>
      <Main>
        <IN>
          <Icon>캐릭터 위치</Icon>
          <QrcodeInput />
          <div>바르게 입력해주세요.(예) https://www.teachercan.com </div>
        </IN>
      </Main>
      <Btn>QR코드 보관함</Btn>
    </Container>
  );
};

export default Qrcodemake;
