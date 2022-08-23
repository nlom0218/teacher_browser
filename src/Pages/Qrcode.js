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
import Qrcodemake from "../Components/Qrcode/Qrmake";
import Qrresult from "../Components/Qrcode/Qrresult";

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px;
  padding: 2.5rem;
  font-size: 1.875em;
  font-size: 1.875rem;
`;
const Qrcode = () => {
  return (
    <BasicContainer menuItem={true}>
      <Title>티처캔 QR코드 생성 도우미</Title>
      {/* <Qrcodemake /> */}
      <Qrresult />
    </BasicContainer>
  );
};

export default Qrcode;
