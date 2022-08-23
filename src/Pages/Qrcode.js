import React, { useState, useRef } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { useReactiveVar } from "@apollo/client";
import useTitle from "../Hooks/useTitle";
import useMe from "../Hooks/useMe";
import { useQuery } from "@apollo/client";
import { customMedia } from "../styles";
import AlertMessage from "../Components/Shared/AlertMessage";
import Loading from "../Components/Shared/Loading";
import Qrcodemake from "../Components/Qrcode/Qrmake";
import Qrresult from "../Components/Qrcode/Qrresult";
import Qrstorage from "../Components/Qrcode/Qrstorage";

const Qrcode = () => {
  const [mode, setMode] = useState("make");

  return (
    <BasicContainer menuItem={true}>
      {mode === "make" && <Qrcodemake mode={mode} setMode={setMode} />}
      {mode === "result" && <Qrresult mode={mode} setMode={setMode} />}
      {mode === "storage" && <Qrstorage mode={mode} setMode={setMode} />}
    </BasicContainer>
  );
};

export default Qrcode;
