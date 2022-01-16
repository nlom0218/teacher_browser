import React from "react";
import { inPopup } from "../../apollo";
import BtnContainer from "./styled/BtnContainer";
import RegisterBtn from "./styled/RegisterBtn";

const ChangePw = ({ userEmail }) => {
  const onClickBtn = () => {
    inPopup("changePw");
  };

  return (
    <BtnContainer>
      <RegisterBtn onClick={onClickBtn}>비밀번호 수정</RegisterBtn>
    </BtnContainer>
  );
};

export default ChangePw;
