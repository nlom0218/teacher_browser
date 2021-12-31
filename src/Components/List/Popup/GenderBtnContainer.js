import React from 'react';
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import styled from 'styled-components';

const SGengerBtnContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  svg {
    font-size: 1.25rem;
    font-size: 1.25em;
    cursor: pointer;
  }
`

const GengerBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
`

const GenderBtnContainer = ({ gender, setGender, setErrMsg }) => {
  const onClickGender = (type) => {
    setGender(type)
    setErrMsg(undefined)
  }
  return (<SGengerBtnContainer>
    <GengerBtn gender={gender}>
      <div className="gender_icon" onClick={() => onClickGender("male")}>
        {gender === "male" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      </div>
      <div>남자</div>
    </GengerBtn>
    <GengerBtn gender={gender}>
      <div className="gender_icon" onClick={() => onClickGender("female")}>
        {gender === "female" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      </div>
      <div>여자</div>
    </GengerBtn>
  </SGengerBtnContainer>);
}

export default GenderBtnContainer;