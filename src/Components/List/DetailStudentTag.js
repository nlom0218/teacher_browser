import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BtnFadeIn } from '../../Animations/Fade';
import { inPopup, isPopupVar } from '../../apollo';
import useMe from '../../Hooks/useMe';
import CreateTag from './Popup/CreateTag';
import { DetailStudentLayout, DetailTitle } from './styled/DetailStudent';
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { EDIT_STUDENT_MUTATION, SEE_ONE_STUDENT } from './DetailStudent';

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
    padding-top: 5px;
    padding-top: 0.3125rem;
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

const TagItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-right: 0.625rem;
  padding: 5px 10px;
  padding: 0.3215rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.theme.purple};
  transition: background-color 1s ease;
  svg {
    display: flex;
    cursor: pointer;
    margin-left: 5px;
    margin-left: 0.3125rem;
    font-size: 1.25em;
    font-size: 1.25rem;
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

const DetailStudentTag = ({ studentInfo }) => {
  const isPopup = useReactiveVar(isPopupVar)

  const me = useMe()

  const [tagArr, setTagArr] = useState([])
  const [studentTatArr, setStudentTagArr] = useState(undefined)
  const [isEdit, setIsEdit] = useState(false)

  const [editStudent, { loading }] = useMutation(EDIT_STUDENT_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT, variables: { studentId: studentInfo?._id } }]
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

  useEffect(() => {
    if (me) {
      setTagArr(me?.tag)
    }
  }, [me])
  useEffect(() => {
    setStudentTagArr(studentInfo?.tag)
  }, [studentInfo])
  return (<DetailStudentLayout>
    <DetailTitle style={{ marginTop: "5px", marginTop: "0.3125rem" }}>태그</DetailTitle>
    <StudentTagContainer onMouseEnter={onMouseEnterTag} onMouseLeave={onMouseLeaveTag} onClick={onMouseEnterTag} isEdit={isEdit}>
      <StudentTag>{studentTatArr?.length === 0 ?
        <div className="no_student_tag">등록된 태그가 없습니다.</div>
        :
        studentTatArr?.map((item, index) => {
          return <TagItem key={index}>
            <div>{item}</div>
            <IoIosRemoveCircleOutline onClick={() => onClickDelTag(item)} />
          </TagItem>
        })
      }</StudentTag>
      {isEdit && <EditContainer>
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
      </EditContainer>}
    </StudentTagContainer>
    {isPopup === "createTag" && <CreateTag studentId={studentInfo?._id} />}
  </DetailStudentLayout>);
}

export default DetailStudentTag;