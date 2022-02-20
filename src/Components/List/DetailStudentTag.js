import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import useMe from '../../Hooks/useMe';
import CreateTag from './Popup/CreateTag';
import { DetailStudentLayout, DetailTitle } from './styled/DetailStudent';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import useMedia from '../../Hooks/useMedia';
import AddTag from './Popup/AddTag';
import { SEE_ALL_STUDENT_QUERY, SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import TagItem from './TagItem';

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

const DetailStudentTag = ({ studentInfo, selectedSort, selectedTag, setSuccessMsg }) => {
  const isPopup = useReactiveVar(isPopupVar)

  const me = useMe()
  const media = useMedia()

  const [tagArr, setTagArr] = useState([])
  const [studentTatArr, setStudentTagArr] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)

  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      setSuccessMsg("학생 태그가 수정되었습니다. 😀")
    }
  }

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ONE_STUDENT_QUERY, variables: { studentId: studentInfo?._id } },
      {
        query: SEE_ALL_STUDENT_QUERY, variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false,
        }
      }
    ]
  })

  const onClickAddTag = (tag) => {
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId: studentInfo?._id,
        tag: [tag]
      }
    })
  }

  const onClickDelTag = (tag) => {
    editStudent({
      variables: {
        teacherEmail: studentInfo?.teacherEmail,
        studentId: studentInfo?._id,
        delTag: tag
      }
    })
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
      <StudentTag>{studentTatArr?.length === 0 ?
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

export default DetailStudentTag;