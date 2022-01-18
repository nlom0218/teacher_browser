import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import useMe from '../../Hooks/useMe';
import CreateTag from '../List/Popup/CreateTag';
import { DetailStudentLayout, DetailTitle } from '../List/styled/DetailStudent';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import useMedia from '../../Hooks/useMedia';
import AddTag from '../List/Popup/AddTag';
import { SEE_ALL_STUDENT_QUERY, SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
//import TagItem from './TagItem';
import TagItem from '../List/TagItem';

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

const DetailClassTag = ({ studentInfo, selectedSort, selectedTag }) => {
  const isPopup = useReactiveVar(isPopupVar)

  const me = useMe()
  const media = useMedia()

  const [tagArr, setTagArr] = useState([])
  const [studentTatArr, setStudentTagArr] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)



  const onClickAddTag = (tag) => {

  }

  const onClickDelTag = (tag) => {

  }

  const onMouseEnterTag = () => setIsEdit(true)
  const onMouseLeaveTag = () => setIsEdit(false)

  const onClickCreateTag = () => inPopup("createTag")

  const onClickPopupAddTag = () => inPopup("addTag")

  useEffect(() => {
    if (me) {
      setTagArr(me?.tag)
    }
  }, [me])
  useEffect(() => {
    setStudentTagArr(studentInfo?.tag)
  }, [studentInfo])
  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>태그</DetailTitle>
    <StudentTagContainer onMouseEnter={onMouseEnterTag} onMouseLeave={onMouseLeaveTag} onClick={onMouseEnterTag} isEdit={isEdit}>
      <StudentTag>
          수업장소, 교사명, 동아리명 
          {studentTatArr?.length === 0 ?
        <div className="no_student_tag">등록된 태그가 없습니다.</div>
        :
        studentTatArr?.map((item, index) => {
          return <TagItem key={index} item={item} onClickDelTag={onClickDelTag} />
        })
      }</StudentTag>
      {media === "Desktop" ? (isEdit && <EditContainer>
        <TagBox isEdit={isEdit}>
          {tagArr.length === 0 ? <div className="no_tag_div">생성된 태그가 없습니다.</div>
            : tagArr.map((item, index) => {
              return <Tag key={index}>
                <div onClick={() => onClickAddTag(item)}>{item}</div>
              </Tag>
            })
          }
        </TagBox>
        <CreateTagBtn onClick={onClickCreateTag}>태그 관리하기</CreateTagBtn>
      </EditContainer>)
        :
        <AddTagBtn onClick={onClickPopupAddTag}>태그 추가</AddTagBtn>
      }
    </StudentTagContainer>
    {isPopup === "createTag" && <CreateTag studentId={studentInfo?._id} />}
    {isPopup === "addTag" &&
      <AddTag
        studentTatArr={studentTatArr}
        onClickDelTag={onClickDelTag}
        onClickCreateTag={onClickCreateTag}
        tagArr={tagArr}
        onClickAddTag={onClickAddTag}
      />}
  </DetailStudentLayout>);
}

export default DetailClassTag;