import React, { useRef, useContext, useState } from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";
import { inPopup, isPopupVar } from "../../apollo";
import Qrname from "./Qrname";
import { useReactiveVar } from "@apollo/client";
import QrPrintMain from "./QrPrint/QrPrintMain";
import { QrcodeUrlContext } from "./QrcodeUrlContext";
import GenerateQrCode from "./GenerateQrCode";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";

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
const Message = styled.div`
  font-size: 0.8em;
  color: #222;
  padding-top: 5px;
  padding-top: 0.3125rem;
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
  background-color: ${(props) => props.theme.cardBg};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  img {
    width: 250px;
    height: 250px;
  }
`;

const Qrresult = () => {
  const { setMode, url } = useContext(QrcodeUrlContext);
  const navigate = useNavigate();
  const [pickUrl, setPickUrl] = useState(url);
  const [imageUrl, setImageUrl] = useState(""); //현재 선택된 url의 QR코드 이미지
  const resultUrl = localStorage.getItem("resultUrl");
  if (localStorage.getItem("pickUrl") === "undefined") {
    setPickUrl(resultUrl);
  }
  localStorage.setItem("pickUrl", pickUrl);
  //윈도우 팝업창 불러오기 세팅.....데이터 전달이 잘 안 됨.
  const qrcodeUrl =
    process.env.NODE_ENV === "production"
      ? `https://teachercan.com/qrcode_popup`
      : `http://localhost:3000/qrcode_popup`;
  // 크게 보기 누르면 윈도우 창으로 열리게 함
  const onClickBig = () => {
    window.open(qrcodeUrl, "qrcodePopup");
    // sendMessage();
  };
  // 생성 페이지로 이동, url값 초기화
  const onClickMake = () => {
    localStorage.setItem("qrmode", "make");
    setMode("make");
    localStorage.removeItem("pickUrl");
    localStorage.removeItem("resultUrl");
  };
  //보관함에 저장 전 title입력창
  const onClickRegister = () => {
    inPopup("registerQR");
  };
  //보관함으로 이동
  const onClickMyStorage = () => {
    localStorage.setItem("qrmode", "make");
    navigate(routes.qrcodeStorage);
    localStorage.removeItem("pickUrl");
    localStorage.removeItem("resultUrl");
  };
  //인쇄하기 화면으로 이동 - 여기서는 qr이미지만 보내서 출력하고 그 화면에서 제목 정도는 입력할 수 있도록 함.
  const onClickPrint = () => {
    inPopup("print");
  };

  //팝업창 (타이틀 입력)
  const isPopup = useReactiveVar(isPopupVar);
  const componentRef = useRef(null);

  return (
    <Container>
      <Title>QR코드 생성 도우미</Title>
      <BtnMy onClick={onClickMyStorage}>QR코드 보관함</BtnMy>
      <Main>
        <Body onClick={onClickBig}>
          <GenerateQrCode url={pickUrl} setImageUrl={setImageUrl} imageUrl={imageUrl} />
          <Message>이미지를 클릭하면 크게 볼 수 있습니다.</Message>
        </Body>
        <IN>
          <div>{pickUrl}</div>
          <LineBox>
            <Line />
          </LineBox>
        </IN>
        <BtnSpace>
          <Btn onClick={onClickPrint}>인쇄하기</Btn>

          {url ? (
            <a href={imageUrl} download>
              <Btn>내 컴퓨터에 저장</Btn>
            </a>
          ) : null}
          {localStorage.getItem("qrmode") === "make" && <Btn onClick={onClickRegister}> 보관함에 저장 </Btn>}

          <Btn onClick={onClickMake}>새 QR코드</Btn>
        </BtnSpace>
      </Main>
      {/* 팝업에 이메일주소도 넘기기  */}
      {isPopup === "registerQR" && <Qrname />}
      {isPopup === "print" && <QrPrintMain printRef={componentRef} imageUrl={imageUrl} />}
    </Container>
  );
};

export default Qrresult;
