import React, { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState(""); //현재 선택된 url의 QR코드 이미지

  return (
    <BigQr>
      <GenerateQrCode url={url} setImageUrl={setImageUrl} imageUrl={imageUrl} />
    </BigQr>
  );
};
export default QrcodePopup;
