import React from "react";
import styled from "styled-components";
import GenerateQrCode from "./GenerateQrCode";

const BigQr = styled.div`
  background-color: white;
  img {
    margin: auto;
    display: block;
    width: 800px;
  }
`;

const url = localStorage.getItem("pickUrl");

const QrcodePopup = () => {
  return (
    <BigQr>
      <GenerateQrCode url={url} />
    </BigQr>
  );
};
export default QrcodePopup;
