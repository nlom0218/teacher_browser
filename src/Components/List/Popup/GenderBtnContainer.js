import React from 'react';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import styled from 'styled-components';
import { customMedia } from '../../../styles';

const SGengerBtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    font-size: 1.25rem;
    font-size: 1.25em;
  }
`

const GengerBtn = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  justify-items: flex-start;
  .gender_icon {
    display: flex;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    column-gap: 0;
  `}
`

const GenderBtnContainer = ({ gender, setGender }) => {
  const onClickGender = (type) => {
    setGender(type)
  }
  return (<SGengerBtnContainer>
    <GengerBtn gender={gender} onClick={() => onClickGender("male")}>
      <div className="gender_icon">
        {gender === "male" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      </div>
      <div>남자</div>
    </GengerBtn>
    <GengerBtn gender={gender} onClick={() => onClickGender("female")}>
      <div className="gender_icon">
        {gender === "female" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      </div>
      <div>여자</div>
    </GengerBtn>
  </SGengerBtnContainer>);
}

export default GenderBtnContainer;