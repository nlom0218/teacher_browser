import React from 'react';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import ToDoHelperPDF from "../../../Helper/ToDoListHelper.jpg"
import HelperBtnContainer from '../../Shared/Helper/HelperBtnContainer';
import HelperImg from '../../Shared/Helper/HelperImg';

const ToDoHelper = () => {

  return (<BtnPopupContainer>
    <HelperBtnContainer />
    <HelperImg src={ToDoHelperPDF} />
  </BtnPopupContainer>);
}

export default ToDoHelper;