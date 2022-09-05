import React, { useState } from "react";
import { QrcodeUrlContext } from "../Components/Qrcode/QrcodeUrlContext";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면
import Qrresult from "../Components/Qrcode/Qrresult"; //결과화면
import Qrstorage from "../Components/Qrcode/Qrstorage"; //보관함
import dummy from "../Components/Qrcode/QrcodeDataEx/qrcodeDataEx.json"; //예시 데이터라 삭제할 예정
import { useQuery } from "@apollo/client";
import { CREATE_QRCODE_QUERY } from "../../src/Graphql/Qrcode/query";
import Loading from "../Components/Shared/Loading";
import useMe from "../Hooks/useMe";

const Qrcode = () => {
  const [mode, setMode] = useState("make"); //페이지 전환 QR코드 생성(make), 결과화면(result), 보관함(storage)
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소
  const [imageUrl, setImageUrl] = useState(undefined); //현재 선택된 url의 QR코드 이미지
  const [qrtitle, setQrtitle] = useState(undefined);
  const me = useMe();

  const { data, loading, error } = useQuery(CREATE_QRCODE_QUERY, {
    variables: { userEmail: me?.email },
  });

  if (loading) {
    return <Loading page="subPage" />;
  }

  return (
    <BasicContainer menuItem={true}>
      <QrcodeUrlContext.Provider
        value={{ dummy, mode, setMode, url, setUrl, imageUrl, setImageUrl, setQrtitle, qrtitle }}
      >
        {mode === "make" && <Qrcodemake />}
        {mode === "result" && <Qrresult />}
        {mode === "storage" && <Qrstorage />}
      </QrcodeUrlContext.Provider>
    </BasicContainer>
  );
};

export default Qrcode;
