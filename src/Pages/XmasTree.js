import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { disableDarkMode, fullScreenMode, inPopup, isPopupVar } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";
import useMe from "../Hooks/useMe";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import Snowfall from "react-snowfall";
import { useQuery } from "@apollo/client";
import { XMAS_MSG_QUERY } from "../Graphql/XmasTree/query";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
import { TiHomeOutline } from "react-icons/ti";

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
  :hover {
    transform: scale(1.01);
  }
  transform: ${(props) => props.isPage && "scale(1.3)"};
  transition: transform 0.4s ease;
`;

const Cookie = styled.div`
  img {
    width: 150%;
    height: 150%;
    cursor: pointer;
  }
  :hover {
    transform: scale(1.01);
  }
  transform: ${(props) => props.isPage && "scale(1.3)"};
  transition: transform 0.4s ease;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Center = styled.div``;
const Left = styled.div``;

const Check = styled.div`
  top: 20px;
  top: 1.25rem;
  right: 20px;
  right: 1.25rem;
  position: fixed;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 10px;
  padding: 0.625rem;
  margin: 10px;
  margin: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const Btn = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  border-radius: 0.625rem;
  font-size: 1em;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  transform: ${(props) => props.isPage && "scale(1.3)"};
  transition: transform 0.4s ease;
`;
const RandomWish = styled.div`
  font-size: 1.5rem;
  font-size: 1.5em;
  background-color: white;
`;
const XmasTree = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");
  const me = useMe();
  const nickname = me?.nickname;
  const isPopup = useReactiveVar(isPopupVar);
  const navigate = useNavigate();

  const { data, loading } = useQuery(XMAS_MSG_QUERY);
  const wishList = data?.xmasMsg;

  const onClickInputWish = () => {
    if (me) {
      inPopup("inputWish");
    } else {
      inPopup("needLogin");
    }
  };
  const onClickHome = () => {
    navigate(routes.home);
  };
  const onClickTree = () => {
    navigate(routes.wishCard);
  };
  useEffect(() => {
    fullScreenMode();
    disableDarkMode();
  }, []);

  return (
    //홈으로 가기
    <Container>
      <Snowfall color={"white"} snowflakeCount={280} />
      <XmasMain>
        <Left>
          <Cookie onClick={onClickInputWish}>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1051508804149325834/b09086319c012ba5.png?width=1040&height=1137"
              alt="img"
            ></img>
          </Cookie>
        </Left>
        <Center>
          <Tree>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1047871422569136198/4f4c0c3051ef6af2.png?width=1118&height=1150"
              alt="img"
              onClick={onClickTree}
            ></img>
          </Tree>
        </Center>
        <Right>
          <Check>
            <Btn onClick={onClickHome}>
              <TiHomeOutline />
              티처캔 홈
            </Btn>
          </Check>
          <RandomWish>{}</RandomWish>
        </Right>
      </XmasMain>

      {isPopup === "inputWish" && <InputWish me={me} nickname={nickname} />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
    </Container>
  );
};

export default XmasTree;
