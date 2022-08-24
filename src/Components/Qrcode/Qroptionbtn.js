// 새qr코드 추가 ->첫 화면으로 이동
// 순서바꾸기 -> 드래그앤 드롭
// 삭제 -> 버튼으로? 그냥 바로 삭제 안 되나?
// 출력 -> 컴포넌트 새로
// 모바일인 경우에는 QR코드 추가만 넣어도 되나?

import React from "react";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { inPopup } from "../../apollo";

const Btn = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  text-align: center;
  justify-items: center;
  ${customMedia.greaterThan("desktop")`
    float: right;
    justify-self: flex-start;
  `}
  div {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    width: 150px;
    background-color: ${(props) => props.theme.btnBgColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  del {
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    width: 150px;
    background-color: ${(props) => props.theme.redColor};
    color: ${(props) => props.theme.bgColor};
    transition: background-color 1s ease, color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    text-decoration: none;
  }
`;
const Qroptionbtn = ({ mode, setMode }) => {
  const onClickBtn = () => {
    setMode("make");
  };
  const onClickPrintBtn = () => {
    inPopup("printQR");
  };

  return (
    <Btn>
      <div onClick={onClickBtn}>QR코드 추가</div>
      <div>순서 바꾸기??</div>
      <div onClick={onClickPrintBtn}>인쇄 하기</div>
      <del>삭제 하기</del>
    </Btn>
  );
};

export default Qroptionbtn;
