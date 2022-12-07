import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fullScreenMode, inPopup, isPopupVar } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";
import useMe from "../Hooks/useMe";
import { useNavigate } from "react-router-dom";
import routes from "../routes";
import Snowfall from "react-snowfall";
import { useQuery } from "@apollo/client";
import { XMAS_MSG_QUERY } from "../Graphql/XmasTree/query";

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
    width: 200%;
    height: 200%;
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
    inPopup("inputWish");
  };

  const onClickTree = () => {
    navigate(routes.wishCard);
  };
  useEffect(() => {
    fullScreenMode();
  }, []);

  return (
    //홈으로 가기
    <Container>
      <Snowfall color={"white"} snowflakeCount={280} />
      <XmasMain>
        <Left>
          <Cookie onClick={onClickInputWish}>
            <img
              src="https://media.discordapp.net/attachments/1012001449854648480/1049706680037941338/a5bdf54c28ac7180.png?width=1640&height=1140"
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
          <RandomWish>{}</RandomWish>
        </Right>
      </XmasMain>

      {isPopup === "inputWish" && <InputWish me={me} nickname={nickname} />}
    </Container>
  );
};

export default XmasTree;
