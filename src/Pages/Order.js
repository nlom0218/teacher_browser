import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import PopupList from "../Components/Order/Popuplist";
import { BsPeopleFill, BsFillCheckSquareFill } from "react-icons/bs";

const Container = styled.div`
  padding: 60px;
  padding: 3.75rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`;

const Title = styled.div`
  grid-column: 1/-1;
  font-size: 1.25em;
  font-size: 1.25rem;
`;

const OptionBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  justify-self: flex-start;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const MenuBtn = styled.div`
  font-size: 2em;
  font-size: 2rem;
  svg {
    cursor: pointer;
  }
`;

const ListIcon = styled.div``;

const ConditionIcon = styled.div``;

const Order = () => {
  const [popup, setPopup] = useState(undefined);
  const onClickIcon = (newPopup) => {
    setPopup(newPopup);
  };

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <Main>
          <Title>순서정하기</Title>
          <OptionBtn>한 명씩 보이기</OptionBtn>
          <OptionBtn>모두 한번에 보이기 </OptionBtn>
        </Main>
        <MenuBtn>
          <ListIcon onClick={() => onClickIcon("list")}>
            <BsPeopleFill />{" "}
          </ListIcon>
          <ConditionIcon onClick={() => onClickIcon("condition")}>
            <BsFillCheckSquareFill />
          </ConditionIcon>
        </MenuBtn>
        {popup === "list" && <PopupList />}
      </Container>
    </BasicContainer>
  );
};

export default Order;

//1. 명단 보이기 기능
// 리스트 이름 input
// 각각 생성한 리스트를 수정 가능
// 학생명단을 DB에서 불러오기

//2. CSS

//3. 한명씩 보이기
