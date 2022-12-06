import React, { useEffect } from "react";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";
import useMe from "../Hooks/useMe";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import Snowfall from "react-snowfall";

const Container = styled.div`
  height: 100vh;
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
const XmasMain = styled.div`
  display: grid;
  height: 98%;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: flex-end;
`;
const Tree = styled.div`
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const Cookie = styled.div`
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
const Right = styled.div``;
const Left = styled.div``;

const WishBox = styled.div`
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;
const RandomWish = styled.div``;
// const InputBtn = styled.div`
//   background-color: ${(props) => props.theme.btnBgColor};
//   color: ${(props) => props.theme.bgColor};
//   transition: background-color 1s ease, color 1s ease;
//   padding: 10px 20px;
//   padding: 0.625rem 1.25rem;
//   border-radius: 5px;
//   border-radius: 0.3125rem;
//   text-align: center;
//   cursor: pointer;
// `;
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
      <Snowfall color={"white"} snowflakeCount={280} />
      <XmasMain>
        <Left>
          <Cookie>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1033703744728211476/5129be1287fd0add.png?width=1410&height=980"
              alt="img"
            ></img>
          </Cookie>
          <WishBox onClick={onClickInputWish}>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1033703930699448340/bdf028c6bc9be94b.png?width=1410&height=980"
              alt="img"
            ></img>
            <RandomWish></RandomWish>
          </WishBox>
        </Left>
        <Right>
          <Tree>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1047871422569136198/4f4c0c3051ef6af2.png?width=1118&height=1150"
              alt="img"
              onClick={onClickTree}
            ></img>
          </Tree>
        </Right>
        <Right></Right>
      </XmasMain>

      {isPopup === "inputWish" && <InputWish me={me} nickname={nickname} />}
    </Container>
  );
};

export default XmasTree;
