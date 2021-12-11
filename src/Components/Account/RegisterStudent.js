import React from 'react';
import styled from 'styled-components';
import BtnContainer from './styled/BtnContainer';
import DelBtn from './styled/DelBtn';
import RegisterBtn from './styled/RegisterBtn';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const RegisterStudent = ({ studentsNum }) => {
  return (<Container>
    {studentsNum ? `${studentsNum}의 학생이 등록되어 있습니다.` : "등록된 학생이 없습니다."}
    <BtnContainer>
      <RegisterBtn>{studentsNum ? "학생 추가/제거하기" : "등록하기"}</RegisterBtn>
      <DelBtn>학생목록 삭제하기</DelBtn>
    </BtnContainer>
  </Container>);
}

export default RegisterStudent;