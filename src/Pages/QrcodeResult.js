import React, { useEffect, useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrresult from "../Components/Qrcode/Qrresult";
import useMe from "../Hooks/useMe";
import { useLocation } from "react-router-dom";
import { RiContactsBook2Fill } from "react-icons/ri";

const QrcodeResult = () => {
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소
  const me = useMe();
  const location = useLocation();
  const urlIndex = location.state.index;

  useEffect(() => {
    const getUrl = location.state.url;

    if (getUrl) {
      setUrl(getUrl);
    }
  }, []);

  return (
    <BasicContainer menuItem={true}>
      <QrcodeUrlContext.Provider value={{ me, url, setUrl, urlIndex }}>
        <Qrresult />
      </QrcodeUrlContext.Provider>
    </BasicContainer>
  );
};

export default QrcodeResult;
