import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { TiDelete } from "react-icons/ti";
import {AiOutlineEdit} from "react-icons/ai"



const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;


`

const DelClassBtn = styled.div`
position: absolute;
top:3%;
right:3%;
font-size: 1.5em;
font-size: 1.5rem;
opacity:0.8;
cursor: pointer;
`
const RegisterClassOneBtn = styled.div`
position: absolute;
top:3%;
justify-self: center; 
opacity:0.1; // 태그값이 있을 때만 안 보이도록 

font-size: 1.5em;
font-size: 1.5rem;

cursor: pointer;
`

const RegisterScheduleOne = ({ subjectName }) => {

  const onClickRegisterClassOne = () => {
    inPopup("registerClass")
  }


  const onClickDelClass = (SubjectName) => {
      // const newSubjectName = 빈 배열로 보내서 다시 시간표 수정 setSelectedStudent(newSelectedStudent)
      // deleteSubject ({ subjectvalue})
  }

  return (<Container>
            <RegisterClassOneBtn onClick={onClickRegisterClassOne}> <AiOutlineEdit/> </RegisterClassOneBtn>
            <DelClassBtn onClick={onClickDelClass} subjectName={subjectName}><TiDelete/></DelClassBtn>
  {/* 과목정보가 있을 때만 삭제 버튼이 나오도록  */}
  </Container>);
}

export default RegisterScheduleOne;