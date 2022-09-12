import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

const GenerateQrCode = ({ url }) => {
  const [imageUrl, setImageUrl] = useState(undefined); //현재 선택된 url의 QR코드 이미지

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
