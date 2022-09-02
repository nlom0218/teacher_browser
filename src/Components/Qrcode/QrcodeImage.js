import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { QrcodeUrlContext } from "./QrcodeUrlContext";
import QRCode from "qrcode";

const GenerateQrCode = () => {
  const { url, setImageUrl, imageUrl } = useContext(QrcodeUrlContext);

  //qr 생성
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(url);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (url) {
      generateQrCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return <div>{imageUrl ? <img src={imageUrl} alt="img" value="qrImgValue" /> : null}</div>;
};

export default GenerateQrCode;
