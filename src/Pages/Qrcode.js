import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import Qrcodemake from "../Components/Qrcode/Qrmake";
import Qrresult from "../Components/Qrcode/Qrresult";
import Qrstorage from "../Components/Qrcode/Qrstorage";

const Qrcode = () => {
  const [mode, setMode] = useState("make");
  const [url, setUrl] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);

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
        />
      )}
    </BasicContainer>
  );
};

export default Qrcode;
