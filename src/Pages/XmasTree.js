import React, { useEffect } from "react";
import styled, { Keyframes } from "styled-components";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";
import useMe from "../Hooks/useMe";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import SnowFall from "../Components/XmasTree/SnowFall";

// 레이어 구성 너무 어렵다..... 크리스마스 트리 그림 크기때문에 겹치지 않는 위치에 소원 버튼

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100vh;
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
  min-width: 100vw;
  z-index: 10;
`;
const Tree = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
  top: 10%;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

// const Snow = styled.div`
//   .snowflake {
//     position: absolute;
//     width: 10px;
//     height: 10px;
//     background: linear-gradient(white, white);
//     border-radius: 50%;
//     filter: drop-shadow(0 0 10px white);
//   }
// `;

const Cookie = styled.div`
  position: absolute;
  top: 40%;
  z-index: 0;
  img {
    width: 50%;
    height: 50%;
    cursor: pointer;
  }
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
  position: absolute;
  left: 100px;
  overflow: hidden;
  img {
    width: 50%;
    height: 50%;
    cursor: pointer;
  }
`;
const RandomWish = styled.div``;
const InputBtn = styled.div`
  position: absolute;
  justify-self: right;
  align-self: flex-end;
  z-index: 1;
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
  const me = useMe();
  const nickname = me?.nickname;
  const isPopup = useReactiveVar(isPopupVar);
  const navigate = useNavigate();

  const onClickInputWish = () => {
    inPopup("inputWish");
  };

  const onClickTree = () => {
    navigate(routes.wishCard);
  };
  useEffect(() => {}, []);

  return (
    //홈으로 가기
    <Container>
      {/* <Snow>
        <SnowFall />
      </Snow> */}
      <Tree>
        <img
          src=" https://cdn.discordapp.com/attachments/1012001449854648480/1041329605681885194/4f4c0c3051ef6af2.png
"
          alt="img"
          onClick={onClickTree}
        ></img>
      </Tree>
      <Left>
        <InputBtn onClick={onClickInputWish}> 소원쓰기 </InputBtn>
      </Left>
      <Right>
        <Cookie>
          <img
            src="https://media.discordapp.net/attachments/1012001449854648480/1033703744728211476/5129be1287fd0add.png?width=1410&height=980"
            alt="img"
          ></img>
        </Cookie>
        <WishBox>
          <img
            src="https://media.discordapp.net/attachments/1012001449854648480/1033703930699448340/bdf028c6bc9be94b.png?width=1410&height=980"
            alt="img"
          ></img>
          <RandomWish></RandomWish>
        </WishBox>
      </Right>
      {isPopup === "inputWish" && <InputWish me={me} nickname={nickname} />}
    </Container>
  );
};

export default XmasTree;
