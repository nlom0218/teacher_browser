import React from "react";
import PopupContainer from "../Shared/PopupContainer";

const Qrname = ({ setMode }) => {
  const onClickBtn = () => {
    setMode("storage");
  };
  return (
    <PopupContainer>
      <div>QR코드를 저장하시겠습니까?</div>
      <input placeholder="QR코드 이름을 입력하세요." autoComplete="off" />
      <button onClick={onClickBtn}>저장</button>
      <button>취소-저장 안하고 메인화면? 보관함? </button>
    </PopupContainer>
  );
};

export default Qrname;
