import React, { useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면
import Qrresult from "../Components/Qrcode/Qrresult"; //결과화면

import useMe from "../Hooks/useMe";

const Qrcode = () => {
  const [mode, setMode] = useState("make"); //페이지 전환 QR코드 생성(make), 결과화면(result)
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소
  const [imageUrl, setImageUrl] = useState(undefined); //현재 선택된 url의 QR코드 이미지
  const [qrtitle, setQrtitle] = useState(undefined);
  const me = useMe();
  const pickstate = localStorage.getItem("pickUrl") !== 0;

  return (
    <BasicContainer menuItem={true}>
      <QrcodeUrlContext.Provider value={{ me, mode, setMode, url, setUrl, imageUrl, setImageUrl, setQrtitle, qrtitle }}>
        {mode === "make" && <Qrcodemake />}
        {mode === "result" && <Qrresult />}
      </QrcodeUrlContext.Provider>
    </BasicContainer>
  );
};

export default Qrcode;
