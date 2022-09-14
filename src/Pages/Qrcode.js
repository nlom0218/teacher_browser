import React, { useEffect, useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면
import Qrresult from "../Components/Qrcode/Qrresult"; //결과화면

import useMe from "../Hooks/useMe";

const Qrcode = () => {
  const [mode, setMode] = useState(localStorage.getItem("qrmode"));

  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소

  const me = useMe();

  // 오류1. localStroage에 "qrmode"가 없을 경우 빈 화면이 뜸
  useEffect(() => {
    if (!mode) {
      localStorage.setItem("qrmode", "make");
      setMode("make");
    }
  }, []);

  return (
    <BasicContainer menuItem={true}>
      <QrcodeUrlContext.Provider value={{ me, mode, setMode, url, setUrl }}>
        {mode === "make" && <Qrcodemake />}
        {mode === "result" && <Qrresult />}
      </QrcodeUrlContext.Provider>
    </BasicContainer>
  );
};

export default Qrcode;
