import React, { useEffect } from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";
import { inPopup, isPopupVar } from "../../apollo";
import Qrname from "./Qrname";
import { useReactiveVar } from "@apollo/client";
import QRCode from "qrcode";

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 1fr 6fr;
`;
const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 40px 40px 10px 40px;
  padding: 2.5rem 2.5rem 0.625rem 2.5rem;
  font-size: 1.875em;
  font-size: 1.875rem;
`;
const Main = styled.div`
  display: grid;
  grid-template-rows: 4fr 1fr 1fr;
  width: 100%;
  align-items: flex-start;
  justify-items: center;
`;
const IN = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: baseline;
  width: 70%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  text-align: center;
  overflow: hidden;
`;
const LineBox = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;
const BtnSpace = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
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
const BtnMy = styled.div`
  padding: 10px;
  padding: 0.625rem;
  margin-right: 40px;
  margin-right: 2.5rem;
  width: 150px;
  height: 40px;
  display: grid;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  justify-self: right;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;
const Body = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 250px;
  height: 250px;
  row-gap: 40px;
  row-gap: 2.5rem;
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  img {
    width: 250px;
    height: 250px;
  }
`;

const Qrresult = ({ setMode, imageUrl, setImageUrl, setUrl, url }) => {
  const qrcodeUrl =
    process.env.NODE_ENV === "production"
      ? `https://teachercan.com/qrcode_popup`
      : `http://localhost:3000/qrcode_popup`;
  const windowFeatures = "popup";

  const sendMessage = ({ imageUrl }) => {
    window.postMessage("qrcodeimg", { imageUrl });
  };
  const onClickBig = () => {
    window.open(qrcodeUrl, "qrcodePopup", windowFeatures);
    sendMessage();
  };

  const onClickMake = () => {
    setUrl(undefined);
    setMode("make");
  };
  const onClickRegister = () => {
    inPopup("registerQR");
  };
  const onClickMy = () => {
    setMode("storage");
  };
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

  const isPopup = useReactiveVar(isPopupVar);

  return (
    <Container>
      <Title>QR코드 생성 도우미</Title>
      <BtnMy onClick={onClickMy}>QR코드 보관함</BtnMy>
      <Main>
        <Body>{imageUrl ? <img src={imageUrl} alt="img" value="qrImgValue" /> : null}</Body>
        <IN>
          <div>{url}</div>
          <LineBox>
            <Line />
          </LineBox>
        </IN>
        <BtnSpace>
          <Btn onClick={onClickBig}>크게 보기</Btn>
          {imageUrl ? (
            <a href={imageUrl} download>
              <Btn>다운로드</Btn>
            </a>
          ) : null}

          <Btn onClick={onClickRegister}> 저장하기 </Btn>
          <Btn onClick={onClickMake}>새 QR코드</Btn>
        </BtnSpace>
      </Main>

      {isPopup === "registerQR" && <Qrname setMode={setMode} />}
    </Container>
  );
};

export default Qrresult;
