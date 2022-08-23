import React, { useState, useRef } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { useReactiveVar } from "@apollo/client";
import useTitle from "../Hooks/useTitle";
import useMe from "../Hooks/useMe";
import { useQuery } from "@apollo/client";
import { customMedia } from "../styles";
import AlertMessage from "../Components/Shared/AlertMessage";
import Loading from "../Components/Shared/Loading";
import QrcodeInput from "../Components/Qrcode/QrcodeInput";

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
  height: 30%;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const Qrcode = () => {
  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Title>티처캔 QR코드 생성 도우미</Title>
        {/* <Icon>아이콘</Icon> */}
        <Main>
          <IN>
            <Icon>캐릭터 위치</Icon>
            <QrcodeInput />
            <div>바르게 입력해주세요.(예) https://www.teachercan.com </div>
          </IN>
        </Main>
        <Btn>QR코드 보관함</Btn>
      </Container>{" "}
    </BasicContainer>
  );
};

export default Qrcode;
