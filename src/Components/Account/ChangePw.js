import React from "react";
import { useReactiveVar } from "@apollo/client";
import { inPopup, isPopupVar } from "../../apollo";
import styled from "styled-components";
import Pop_ChangePw from "./Popup/Pop_ChangePw";
import BtnContainer from "./styled/BtnContainer";
import RegisterBtn from "./styled/RegisterBtn";

const ChangePw = ({ userEmail }) => {
  const isPopup = useReactiveVar(isPopupVar);
  const onClickBtn = () => {
    inPopup("changePw");
  };

  return (
    <BtnContainer>
      <RegisterBtn onClick={onClickBtn}>비밀번호 수정</RegisterBtn>
      {isPopup === "changePw" && <Pop_ChangePw userEmail={userEmail} />}
    </BtnContainer>
  );
};

export default ChangePw;
