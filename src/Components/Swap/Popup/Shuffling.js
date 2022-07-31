import React from "react";
import styled from "styled-components";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";
import RandomCircle from "../../Shared/RandomCircle";
import SortBtn from "../SortBtn";

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const StopBtn = styled.div`
  text-align: center;
  padding: 20px 60px;
  padding: 1.25rem 3.75rem;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;
`;

const Shuffling = ({ onClickShuffleBtn, setSort, sort, hasNum, setErrMsg }) => {
  return (
    <BtnPopupContainer>
      <Container>
        <RandomCircle />
        <StopBtn onClick={() => onClickShuffleBtn("finish")}>멈추기</StopBtn>
        <SortBtn
          setSort={setSort}
          sort={sort}
          onClickShuffleBtn={onClickShuffleBtn}
          hasNum={hasNum}
          setErrMsg={setErrMsg}
        />
      </Container>
    </BtnPopupContainer>
  );
};
export default Shuffling;
