import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import PopupList from "../Components/Order/Popuplist";

const Container = styled.div`
  padding: 60px;
  padding: 3.75rem;
`;

const Order = () => {
  const [popup, setPopup] = useState(undefined);
  const onClickIcon = (newPopup) => {
    setPopup(newPopup);
  };

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <div>순서정하기</div>
        <div>한 명씩 보이기</div>
        <div>모두 한번에 보이기 </div>
        <div onClick={() => onClickIcon("list")}>학생 명단 </div>
        <div onClick={() => onClickIcon("condition")}>조건 설정</div>
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
