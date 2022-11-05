import React, { useEffect } from "react";
import styled, { Keyframes } from "styled-components";
import BasicContainer from "../Components/Shared/BasicContainer";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import InputWish from "../Components/XmasTree/Popup/InputWish";
import { useReactiveVar } from "@apollo/client";

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
`;
const Title = styled.div`
  font-size: 50px;
  color: aqua;
`;
const WishBox = styled.div`
  display: grid;
  width: 50%;
  height: 100px;
  border: 1px solid black;
  overflow: hidden;
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
    <Container>
      <Title>소원 나무 보이기</Title>
      <WishBox>
        <RandomWish>소원 데이터 불러와서 하나씩 보이기</RandomWish>
      </WishBox>
      <InputBtn onClick={onClickTimeSetBtn}> 소원쓰기 </InputBtn>
      {isPopup === "inputWish" && <InputWish />}
    </Container>
  );
};

export default XmasTree;
