import React, { useEffect } from "react";
import styled from "styled-components";
import QRCode from "qrcode";

const Title = styled.div`
  display: grid;
  text-align: center;
`;

const GenerateQrCode = ({ url, setImageUrl, imageUrl, title }) => {
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

  return (
    <div>
      {title ? <Title>{title}</Title> : null}
      {imageUrl ? <img src={imageUrl} alt="img" value="qrImgValue" /> : null}
    </div>
  );
};

export default GenerateQrCode;
