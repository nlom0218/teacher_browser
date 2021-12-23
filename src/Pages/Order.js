import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import PopupList from "../Components/Order/Popuplist";
import { BsPeopleFill, BsFillCheckSquareFill, BsPrinter } from "react-icons/bs";

// 전체 틀
const Container = styled.div`
  padding: 50px;
  padding: 3.125rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: flex-start;
  opacity: ${(props) => (props.popup ? 0.2 : 1)};
  transition: opacity 0.6s ease;
`;
//상단
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
//제목
const Title = styled.div`
  grid-column: 1/-1;
  //grid-column: 1/2;
  font-size: 2.5em;
  font-size: 2.5rem;
  text-align: center;
`;
//명단 선택
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
//명단과 옵션 아이콘 버튼 설정
const MenuBtn = styled.div`
  font-size: 2em;
  font-size: 2rem;
  svg {
    cursor: pointer;
  }
`;
//명단 아이콘
const ListIcon = styled.div``;
//조건 아이콘
const ConditionIcon = styled.div``;
// 명단 리스트 화면
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
//순서 변경 메인 화면, 화면 어떻게 구성할 것인지, 한 줄에 몇명까지, 스크롤바, 15명? 10명? 다단 3으로?
const Border = styled.div`
  width: 102%;
  height: 100%;
  text-align: center;
  border-style: solid;
  border-color: darkcyan;
  border-width: thick;
  border-radius: 20px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding: 10px;
`;
//프린트 버튼 위치를 상대적으로 변경할 것인지, 모양, 기능 추가
const PrintBtn = styled.div`
  width: 130px;
  height: 35px;
  position: absolute;
  right: 5%;
  bottom: -5%;
  text-align: center;
  align-items: center;
  border-style: solid;
  border-color: darkcyan;
  border-width: thick;
  border-radius: 2px;
  border-radius: 20px;
  align: right;
`;
// 프린트 기능 추가하기
// function info_print() {
//   let initBody = document.body;
//   let hiddenBtn = document.querySelector('.print-button');
//   window.onbeforeprint = function () {
//     hiddenBtn.style.display = "none";
//     document.body = document.querySelector('.main-container');
//   }
//   window.onafterprint = function () {
//     hiddenBtn.style.display = "block";
//     document.body = initBody;
//   }
//   window.print();ㄹ
// }

const Order = () => {
  //명단과 조건 아이콘 누르면 팝업창 나오도록 함.
  const [popup, setPopup] = useState(undefined);
  const onClickIcon = (newPopup) => {
    setPopup(newPopup);
  };
  //명단 불러오기 수정해야 함.
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
    // "열하나",
    // "열둘",
    // "열셋",
    // "열넷",
    // "열다섯",
  ];
  //목록 내 순서 변경
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
  //결과 , 설명글 추가함. 순서 제목 입력->프린트할 때 제목 나오도록, 설명글 추가하니 밑줄 안 사라짐....
  //프린트 버튼이랑 롤업 버튼이랑 위치박스는 그대로하고 나오는 것만 다르게? 하는지 박스 자체도 변경할 것인지 선택
  return (
    <BasicContainer menuItem={true}>
      <Container popup={popup}>
        <Main>
          <Title>
            <acronym
              title="원하는 제목을 입력해주세요."
              text-decoration-line="none"
            >
              <input type="text" placeholder="순서정하기 제목"></input>{" "}
            </acronym>{" "}
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
        <Border>
          <List>{shuffledList}</List>
          <PrintBtn>
            {" "}
            인쇄하기 &nbsp;
            <BsPrinter />
          </PrintBtn>
        </Border>
        <br />
      </Container>
      {popup === "list" && <PopupList setPopup={setPopup} />}
    </BasicContainer>
  );
};

export default Order;
