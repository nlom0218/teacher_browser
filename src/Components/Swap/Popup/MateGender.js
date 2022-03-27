import React from 'react';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  padding: 5px;
  padding: 0.3125rem;
`

const Item = styled.div`
  display: grid;
  justify-items: flex-start;
  grid-template-columns: auto 1fr;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
  svg {
    display: flex;
  }
`

const Type = styled.div``

const MateGender = ({ mateGender, setMateGender }) => {
  return (<Container>
    <Item onClick={() => setMateGender("random")}>
      {mateGender === "random" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      <Type>랜덤</Type>
    </Item>
    <Item onClick={() => setMateGender("same")}>
      {mateGender === "same" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      <Type>동성</Type>
    </Item>
    <Item onClick={() => setMateGender("other")}>
      {mateGender === "other" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      <Type>이성</Type>
    </Item>
  </Container>);
}

export default MateGender;