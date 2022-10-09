import React, { useEffect, useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면

import useMe from "../Hooks/useMe";
import { useParams } from "react-router-dom";
import { isPopupVar } from "../apollo";
import PageInfo from "../Components/Qrcode/Popup/PageInfo";
import { useReactiveVar } from "@apollo/client";

const QrcodeMake = () => {
  const [mode, setMode] = useState("make");
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소

  const isPopup = useReactiveVar(isPopupVar);
  const { popup } = useParams();

  const me = useMe();

  return (
    <BasicContainer menuItem={true} isWindowPopup={Boolean(popup)}>
      <QrcodeUrlContext.Provider value={{ me, mode, setMode, url, setUrl }}>
        <Qrcodemake me={me} isWindowPopup={Boolean(popup)} />
      </QrcodeUrlContext.Provider>
      {isPopup === "pageInfo" && <PageInfo isWindowPopup={Boolean(popup)} />}
    </BasicContainer>
  );
};

export default QrcodeMake;
