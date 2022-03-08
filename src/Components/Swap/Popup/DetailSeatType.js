import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`

const Type = styled.div`
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  background-color: ${props => props.selected && props.theme.btnBgColor};
  color: ${props => props.selected && props.theme.bgColor};
  transition: background-color 0.4s ease, color 0.4 ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const DetailSeatType = ({ pickNum, setErrMsg, setSeatType, seatType }) => {
  const onClickSetSeatType = (type) => {
    if (type === 2 && pickNum % 2 !== 0) {
      setErrMsg("첫 줄을 짝수로 설정하세요! 😂")
      return
    }
    setSeatType(type)
  }

  useEffect(() => {
    if (pickNum % 2 !== 0) {
      setSeatType(1)
    }
  }, [pickNum])
  return (<Container>
    <Type selected={seatType === 1} onClick={() => onClickSetSeatType(1)}>거리두기 대형</Type>
    <Type selected={seatType === 2} onClick={() => onClickSetSeatType(2)}>짝궁 대형</Type>
    <Type selected={seatType === 3} onClick={() => onClickSetSeatType(3)}>모둠 대형(4인)</Type>
    <Type selected={seatType === 4} onClick={() => onClickSetSeatType(4)}>모둠 대형(6인)</Type>
  </Container>);
}

export default DetailSeatType;