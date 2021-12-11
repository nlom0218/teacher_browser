import React, { useState } from 'react';
import styled from 'styled-components';
import BtnContainer from './styled/BtnContainer';
import DelBtn from './styled/DelBtn';
import RegisterBtn from './styled/RegisterBtn';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const EditStudent = ({ studentNum, setRegisterPage, registerPage }) => {
  const onClickRegisterBtn = () => {
    if (registerPage) {
      return
    }
    setRegisterPage("student")
  }
  return (<Container>
    {studentNum ? `${studentNum}의 학생이 등록되어 있습니다.` : "등록된 학생이 없습니다."}
    <BtnContainer>
      <RegisterBtn onClick={onClickRegisterBtn}>{studentNum ? "상세정보" : "등록하기"}</RegisterBtn>
      <DelBtn>학생정보 삭제하기</DelBtn>
    </BtnContainer>
  </Container>);
}

export default EditStudent;