import React, { useEffect, useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면

import useMe from "../Hooks/useMe";
import { useParams } from "react-router-dom";

const QrcodeMake = () => {
  const [mode, setMode] = useState("make");
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소

  const { popup } = useParams();

  const me = useMe();

  return (
    <BasicContainer menuItem={true} isWindowPopup={Boolean(popup)}>
      <QrcodeUrlContext.Provider value={{ me, mode, setMode, url, setUrl }}>
        <Qrcodemake me={me} />
      </QrcodeUrlContext.Provider>
    </BasicContainer>
  );
};

export default QrcodeMake;
