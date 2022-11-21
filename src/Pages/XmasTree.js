import React, { useEffect } from "react";
import styled, { Keyframes } from "styled-components";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  background: url(https://media.discordapp.net/attachments/1012001449854648480/1041329981969661982/c6f1be7663bdd36b.png?width=1410&height=793);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;
`;
const Tree = styled.div`
  position: absolute;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Cookie = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
`;
const Right = styled.div`
  float: right;
`;
const Left = styled.div`
  float: left;
`;
const Title = styled.div`
  font-size: 50px;
  color: aqua;
`;
const WishBox = styled.div`
  float: right;
  width: 50%;
  height: 100px;
  border: 1px solid black;
  overflow: hidden;
  img {
  }
`;
const RandomWish = styled.div``;
const InputBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  cursor: pointer;
`;
const XmasTree = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");

  const isPopup = useReactiveVar(isPopupVar);

  const onClickTimeSetBtn = () => {
    inPopup("inputWish");
  };

  useEffect(() => {}, []);
  return (
    //홈으로 가기
    <Container>
      <Left>
        <InputBtn onClick={onClickTimeSetBtn}> 소원쓰기 </InputBtn>
      </Left>
      <Tree>
        <img
          src=" https://cdn.discordapp.com/attachments/1012001449854648480/1041329605681885194/4f4c0c3051ef6af2.png
"
          alt="img"
        ></img>
      </Tree>
      <Right>
        <Cookie></Cookie>
        <WishBox>
          <img
            src="https://media.discordapp.net/attachments/1012001449854648480/1033703930699448340/bdf028c6bc9be94b.png?width=1410&height=980"
            alt="img"
          ></img>
          <RandomWish>소원 데이터 불러와서 하나씩 보이기</RandomWish>
        </WishBox>
      </Right>
      {isPopup === "inputWish" && <InputWish />}
    </Container>
  );
};

export default XmasTree;
