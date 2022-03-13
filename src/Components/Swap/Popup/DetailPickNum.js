import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const Container = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const Title = styled.div`

`

const StudentNum = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const NumItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const DetailPickNum = ({ seatType, pickNum, setPickNum }) => {

  const processSeatType = () => {
    if (seatType === 3 || seatType === 4) {
      return "group"
    } else {
      return "notGroup"
    }
  }

  return (<Container>
    <Title>{processSeatType() === "group" ? "첫 줄(가로) 모둠 수를 선택해주세요." : "첫 줄(가로) 학생 수를 선택해주세요."}</Title>
    { processSeatType() === "group" ?
      <StudentNum>
        <NumItem onClick={() => setPickNum(2)}>
          {pickNum === 2 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>2모둠</div>
        </NumItem>
        <NumItem onClick={() => setPickNum(3)}>
          {pickNum === 3 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>3모둠</div>
        </NumItem>
        <NumItem onClick={() => setPickNum(4)}>
          {pickNum === 4 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>4모둠</div>
        </NumItem>
        <NumItem onClick={() => setPickNum(5)}>
          {pickNum === 5 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>5모둠</div>
        </NumItem>
      </StudentNum>
      :
      <StudentNum>
        <NumItem onClick={() => setPickNum(2)}>
          {pickNum === 2 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>2명</div>
        </NumItem>
        {seatType === 1 && <NumItem onClick={() => setPickNum(3)}>
          {pickNum === 3 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>3명</div>
        </NumItem>}
        <NumItem onClick={() => setPickNum(4)}>
          {pickNum === 4 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>4명</div>
        </NumItem>
        {seatType === 1 && <NumItem onClick={() => setPickNum(5)}>
          {pickNum === 5 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>5명</div>
        </NumItem>}
        <NumItem onClick={() => setPickNum(6)}>
          {pickNum === 6 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>6명</div>
        </NumItem>
        {seatType === 1 && <NumItem onClick={() => setPickNum(7)}>
          {pickNum === 7 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>7명</div>
        </NumItem>}
        <NumItem onClick={() => setPickNum(8)}>
          {pickNum === 8 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>8명</div>
        </NumItem>
        {seatType === 1 && <NumItem onClick={() => setPickNum(9)}>
          {pickNum === 9 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>9명</div>
        </NumItem>}
        <NumItem onClick={() => setPickNum(10)}>
          {pickNum === 10 ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>10명</div>
        </NumItem>
      </StudentNum>}
  </Container>);
}

export default DetailPickNum;