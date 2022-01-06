import React, { useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { DetailStudentLayout, DetailTitle } from './styled/DetailStudent';

const StudentTagContainer = styled.div`
  padding: 20px;
  /* padding: 0.625rem; */
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  border-radius: 5px;
  border-radius: 0.625rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
`

const EditContainer = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  animation: ${BtnFadeIn} 1s ease;
`

const CreateTagBtn = styled.div`
  justify-self: flex-start;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.625rem;
  cursor: pointer;
`

const DetailStudentTag = ({ studentInfo }) => {
  const [isEdit, setIsEdit] = useState(false)

  const onMouseEnterTag = () => setIsEdit(true)
  const onMouseLeaveTag = () => setIsEdit(false)
  return (<DetailStudentLayout>
    <DetailTitle>태그</DetailTitle>
    <StudentTagContainer onMouseEnter={onMouseEnterTag} onMouseLeave={onMouseLeaveTag} isEdit={isEdit}>
      <div>{studentInfo?.tag.length === 0 ? "등록된 태그가 없습니다." : ""}</div>
      {isEdit && <EditContainer>
        <CreateTagBtn>태그 생성하기</CreateTagBtn>
      </EditContainer>}
    </StudentTagContainer>
  </DetailStudentLayout>);
}

export default DetailStudentTag;