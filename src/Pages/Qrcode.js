import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake"; //생성화면
import Qrresult from "../Components/Qrcode/Qrresult"; //결과화면
import Qrstorage from "../Components/Qrcode/Qrstorage"; //보관함
import dummy from "../Components/Qrcode/QrcodeDataEx/qrcodeDataEx.json"; //예시 데이터라 삭제할 예정
import { useQuery } from "@apollo/client";
// import { useQuery } from "@apollo/client";
// import { GET_QRCODE_QUERY } from "../Graphql/Qrcode";
// import Loading from "../Components/Shared/Loading";

const Qrcode = () => {
  const [mode, setMode] = useState("make"); //페이지 전환 QR코드 생성(make), 결과화면(result), 보관함(storage)
  const [url, setUrl] = useState(undefined); //생성화면 입력 혹은 보관함에서 클릭한 url주소
  const [imageUrl, setImageUrl] = useState(undefined); //현재 선택된 url의 QR코드 이미지
  const [qrtitle, setQrtitle] = useState("");
  // const [qrcodeData, setQrcodeData] = useState(undefined);
  // const { data, loading, error } = useQuery(GET_QRCODE_QUERY, {
  //   onCompleted: ({ getQrcode: data }) => {
  //     setQrcodeData([]);
  //   },
  // });

  return (
    <BasicContainer menuItem={true}>
      {mode === "make" && (
        <Qrcodemake
          mode={mode}
          setMode={setMode}
          url={url}
          setUrl={setUrl}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      )}
      {mode === "result" && (
        <Qrresult
          mode={mode}
          setMode={setMode}
          url={url}
          setUrl={setUrl}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setQrtitle={setQrtitle}
        />
      )}
      {mode === "storage" && (
        <Qrstorage
          mode={mode}
          setMode={setMode}
          url={url}
          setUrl={setUrl}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          dummy={dummy}
        />
      )}
    </BasicContainer>
  );
};

export default Qrcode;
