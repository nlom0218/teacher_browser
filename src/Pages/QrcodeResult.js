import React, { useEffect, useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrresult from "../Components/Qrcode/Qrresult";
import useMe from "../Hooks/useMe";
import { useLocation, useParams } from "react-router-dom";
import { RiContactsBook2Fill } from "react-icons/ri";
import { useReactiveVar } from "@apollo/client";
import { isPopupVar } from "../apollo";
import PageInfo from "../Components/WindowPopup/pageInfo/QrCodePageInfo";
import routes from "../routes";

const QrcodeResult = () => {
  const { popup, id } = useParams();
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소
  const me = useMe();
  const location = useLocation();
  const isPopup = useReactiveVar(isPopupVar);

  useEffect(() => {
    const getUrl = location.state.url;

    if (getUrl) {
      setUrl(getUrl);
    }
  }, []);

  return (
    <BasicContainer menuItem={true} isWindowPopup={Boolean(popup)} redirectURL={`${routes.qrcode}/popup`}>
      <QrcodeUrlContext.Provider value={{ me, url, setUrl, id }}>
        <Qrresult isWindowPopup={Boolean(popup)} />
      </QrcodeUrlContext.Provider>
      {isPopup === "pageInfo" && <PageInfo isWindowPopup={Boolean(popup)} redirectURL={`${routes.qrcode}/popup`} />}
    </BasicContainer>
  );
};

export default QrcodeResult;
