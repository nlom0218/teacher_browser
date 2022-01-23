import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inPopup, isPopupVar } from '../../../apollo';
import { DetailStudentLayout, DetailTitle } from '../../List/styled/DetailStudent';
import useMedia from '../../../Hooks/useMedia';


const StudentTagContainer = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
`

const StudentTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  .no_student_tag {
    padding-top: 15px;
    padding-top: 0.9375rem;
  }
`

const EditContainer = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  animation: ${BtnFadeIn} 1s ease;
`

const TagBox = styled.div`
  padding: 20px;
  padding: 1.25rem;
  padding-top: 10px;
  padding-top: 0.625rem;
  border-radius: 5px;
  border-radius: 0.625rem;
  background-color: ${props => props.isEdit && props.theme.contentBgColor};
  transition: background-color 1s ease;
  display: flex;
  flex-wrap: wrap;
  .no_tag_div {
    padding-top: 10px;
    padding-top: 0.625rem
  }
`

const Tag = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 16px;
  margin-right: 1rem;
  :hover {
    text-decoration: underline;
  }
`

const CreateTagBtn = styled.div`
  justify-self: flex-end;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const AddTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const DetailClassTag = ({ }) => {


  const media = useMedia()


  const [isEdit, setIsEdit] = useState(false)


  const onMouseEnterTag = () => setIsEdit(true)
  const onMouseLeaveTag = () => setIsEdit(false)

  const onClickCreateTag = () => inPopup("createTag")
  const onClickPopupAddTag = () => inPopup("addTag")



  //useEffect

  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>태그</DetailTitle>
    <StudentTagContainer onMouseEnter={onMouseEnterTag} onMouseLeave={onMouseLeaveTag} onClick={onMouseEnterTag} isEdit={isEdit}>
      <StudentTag>
          수업장소, 교사명, 동아리명 태그 넣기 
      </StudentTag>
     
        <AddTagBtn onClick={onClickPopupAddTag}>태그 추가</AddTagBtn>
      
    </StudentTagContainer>
    {/* 팝업화면 정보 넣기 */}
  </DetailStudentLayout>);
}

export default DetailClassTag;