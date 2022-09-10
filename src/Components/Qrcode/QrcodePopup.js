import React from "react";
import styled from "styled-components";
import GenerateQrCode from "./QrcodeImage";

const BigQr = styled.div`
  background-color: white;
  width: 2000px;
  height: 1000px;
`;
const QrcodePopup = () => {
  return (
    <BigQr>
      <GenerateQrCode />; ;
    </BigQr>
  );
};
export default QrcodePopup;
