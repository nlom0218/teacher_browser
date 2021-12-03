import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div``

const SchoolName = styled.div``

const RegisterBtn = styled.div``

const DelBtn = styled.div``

const RegisterSchool = ({ schoolName, schoolCode, areaCode }) => {
  const [register, setRegister] = useState(false)
  const onClickRegisterBtn = () => setRegister(true)
  const findSchool = (name) => {
    fetch(`https://open.neis.go.kr/hub/schoolInfo?KEY=8bd04fadaf4d480792216f84d92fb1f9&Type=json&pIndex=1&pSize=10&SCHUL_NM=${name}`)
      .then(res => res.json())
      .then(data => console.log(data.schoolInfo[1].row))
  }
  return (<Container>
    <SchoolName>{schoolName ? schoolName : "등록된 학교가 없습니다."}</SchoolName>
    <RegisterBtn onClick={onClickRegisterBtn}>{schoolName ? "변경하기" : "등록하기"}</RegisterBtn>
    <DelBtn>학교정보 삭제하기</DelBtn>
  </Container>);
}

export default RegisterSchool;