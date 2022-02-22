import React from 'react';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import ToDoHelperPDF from "../../../Helper/ToDoListHelper.jpg"
import styled from 'styled-components';
import { outPopup } from '../../../apollo';

const BtnContainer = styled.div`
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  display: grid;
  grid-template-columns: 1fr auto;
`

const OutPopupBtn = styled.div`
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.redColor};
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const HelperImg = styled.img`
  width: 60vw;
  height: 60vh;
`


const ToDoHelper = () => {

  const onClickOutPopup = () => {
    outPopup()
  }

  return (<BtnPopupContainer>
    <BtnContainer>
      <div></div>
      <OutPopupBtn onClick={onClickOutPopup}>나가기</OutPopupBtn>
    </BtnContainer>
    <HelperImg src={ToDoHelperPDF} />
  </BtnPopupContainer>);
}

export default ToDoHelper;