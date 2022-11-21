import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  row-gap: 20px;
  background-image: url(https://postfiles.pstatic.net/MjAyMjExMjBfMjIw/MDAxNjY4OTQzNTQ4ODUy.CzsDU6T4olZmuZ_yp4brU4vkKrOgL4_BGRrj-G4MbUIg.jYMhqiH9k0qJQonNLdwBMu1q3m-rF_Qjkm9o6eN4VaQg.PNG.tendy424/snowbg.png?type=w580);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100vw;
  z-index: 10;
`;

const MyWishContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(3, 2fr);
`;
const AllWishContainer = styled.div`
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(3, 2fr);
`;

const WishCardBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
`;
const WishContext = styled.div``;

const WishCard = () => {
  // const titleUpdataer = useTitle("티처캔 | 소원나무 이벤트");

  useEffect(() => {}, []);

  return (
    // 크리스마스 배경
    <Container>
      <MyWishContainer>
        {" "}
        <WishCardBox>
          <WishContext>소원 카드 보기</WishContext>
          <button>수정</button>
          <button>삭제</button>
        </WishCardBox>
      </MyWishContainer>
      <AllWishContainer>
        <WishCardBox>
          <WishContext>소원 카드 보기</WishContext>
        </WishCardBox>
        <WishCardBox>
          <WishContext>소원 카드 보기</WishContext>
        </WishCardBox>
        <WishCardBox>
          <WishContext>소원 카드 보기</WishContext>
        </WishCardBox>
      </AllWishContainer>
    </Container>
  );
};

export default WishCard;
