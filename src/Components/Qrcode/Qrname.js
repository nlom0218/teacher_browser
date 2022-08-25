import React from "react";
import PopupContainer from "../Shared/PopupContainer";

const Qrname = ({ setMode }) => {
  const onClickBtn = () => {
    setMode("storage");
  };
  return (
    <PopupContainer>
      <div>QR코드 이름</div>
      <input placeholder="(예)티처캔" autoComplete="off" />
      <button onClick={onClickBtn}>저장</button>
    </PopupContainer>
  );
};

export default Qrname;
