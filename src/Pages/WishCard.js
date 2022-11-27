import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useMe from "../Hooks/useMe";
import { useQuery } from "@apollo/client";
import { XMAS_MSG_QUERY } from "../Graphql/XmasTree/query";

//전체 데이터 보이네 쿼리 어떻게??

const Container = styled.div`
  display: flex;
  flex-direction: row;
  row-gap: 20px;
  background: url(https://media.discordapp.net/attachments/1012001449854648480/1041329981969661982/c6f1be7663bdd36b.png?width=1410&height=793);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;
`;

const MyWishContainer = styled.div`
  column-gap: 20px;
`;
const AllWishContainer = styled.div`
  column-gap: 20px;
`;

const WishCardBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  background-color: white;
`;
const WishContext = styled.div``;

const WishCard = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");
  const me = useMe();
  // const { data, loading } = useQuery(XMAS_MSG_QUERY);

  const { data, loading } = useQuery(XMAS_MSG_QUERY, {
    variables: { userEmail: me?.email },
    skip: !me,
  });

  useEffect(() => {
    if (data) {
      const mylist = data?.xmasMsg.map((item, index) => {
        return { author: item.author, text: item.text, id: item.id, userEmail: item.userEmail };
      });
      console.log(mylist);
    }
  }, [data]);

  return (
    // 크리스마스 배경
    <Container>
      <MyWishContainer>
        {data?.xmasMsg.map((item, index) => (
          <WishCardBox>
            <WishContext>{item.text}</WishContext>
            <button>수정</button>
            <button>삭제</button>
          </WishCardBox>
        ))}
      </MyWishContainer>
      <AllWishContainer>
        <WishCardBox>
          <WishContext>소원 카드 보기</WishContext>
        </WishCardBox>
      </AllWishContainer>
    </Container>
  );
};

export default WishCard;
