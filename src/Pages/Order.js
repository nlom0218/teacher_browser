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
  opacity: ${(props) => (props.popup ? 0.2 : 1)};
  transition: opacity 0.6s ease;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  //grid-template-columns: 1.5fr 0.55fr 2fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-row: 1/-1;
  align-items: center;
`;

const Title = styled.div`
  grid-column: 1/-1;
  //grid-column: 1/2;
  font-size: 2.5em;
  font-size: 2.5rem;
  text-align: center;
`;

const OptionBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  justify-self: flex-start;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 20px;
  //border-radius: 0.3125rem;
  border-radius: 1.25rem;
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

const List = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  text-align: center;
  list-style-type: decimal;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: center;
`;

const Order = () => {
  const [popup, setPopup] = useState(undefined);
  const onClickIcon = (newPopup) => {
    setPopup(newPopup);
  };

  const unshuffled = [
    "하나",
    "둘",
    "셋",
    "넷",
    "다섯",
    "여섯",
    "일곱",
    "여덟",
    "아홉",
    "열",
  ];

  const shuffled = unshuffled
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const [changeShuffled, setShuffled] = useState(shuffled);
  const onClickShuffled = (changeShuffled) => {
    const newShuffled = { ...changeShuffled };
    setShuffled(newShuffled);
  };
  const shuffledList = shuffled.map((value) => <li>{value}</li>);

  return (
    <BasicContainer menuItem={true}>
      <Container popup={popup}>
        <Main>
          <Title>
            <input type="text" placeholder="순서정하기 제목"></input>
          </Title>
          <OptionBtn>
            <acronym
              title="순서대로 한 명씩만 보이게 나옵니다."
              text-decoration-line="none"
            >
              한 명씩 보기
            </acronym>
          </OptionBtn>
          <OptionBtn onClick={onClickShuffled}>
            <acronym
              title="순서가 바뀐 명단을 한꺼번에 볼 수 있습니다."
              text-decoration-line="none"
            >
              바뀐 순서 전체 보기
            </acronym>{" "}
          </OptionBtn>
        </Main>
        <MenuBtn>
          <ListIcon onClick={() => onClickIcon("list")}>
            <BsPeopleFill />{" "}
          </ListIcon>
          <ConditionIcon onClick={() => onClickIcon("condition")}>
            <BsFillCheckSquareFill />
          </ConditionIcon>
        </MenuBtn>
        <br />
        <hr />
        <List>{shuffledList}</List>
      </Container>
      {popup === "list" && <PopupList setPopup={setPopup} />}
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
