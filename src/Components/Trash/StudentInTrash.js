import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { FcEmptyTrash, FcUndo } from 'react-icons/fc';
import styled from 'styled-components';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY, SEE_ALL_STUDENT_QUERY } from '../../Graphql/Student/query';
import useMe from '../../Hooks/useMe';

const Container = styled.div`
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${props => props.isHover && props.theme.hoverColor};
  transition: background-color 0.6s ease;
  position: relative;
`

const StudentName = styled.div`
  opacity: ${props => props.isHover ? 0.4 : 1};
  transition: opacity 0.6s ease;
`

const StudentBtn = styled.div`
  position: absolute;
  top: 0;
  left: 10%;
  bottom: 0;
  right: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: ${props => props.isHover ? 1 : 0};
  transition: opacity 0.6s ease;
  svg {
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`

const ResetBtn = styled.div`
  cursor: pointer;
`

const DelBtn = styled.div`
  cursor: pointer;
`

const StudentInTrash = ({ item, setSuccessMsg }) => {
  const selectedTag = JSON.parse(localStorage.getItem("selectedTag")) ? JSON.parse(localStorage.getItem("selectedTag")) : []
  const selectedSort = localStorage.getItem("selectedSort") ? localStorage.getItem("selectedSort") : undefined
  const me = useMe()
  const [isHover, setIsHover] = useState(false)
  const [editStudent, { loading: editLoadint }] = useMutation(EDIT_STUDENT_MUTATION, {
    refetchQueries: [
      { query: SEE_ALL_STUDENT_IN_TRASH_QUERY, variables: { trash: true } },
      {
        query: SEE_ALL_STUDENT_QUERY,
        variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false
        }
      }
    ],
    onCompleted: () => setSuccessMsg({ msg: "학생 목록으로 복구되었습니다. 😀", ok: true })
  })

  const onClickResetBtn = () => {
    editStudent({
      variables: {
        teacherEmail: me?.email,
        studentId: item._id,
        trash: false
      }
    })
  }

  return (<Container onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} isHover={isHover}>
    <StudentName isHover={isHover}>{item.studentName}</StudentName>
    <StudentBtn isHover={isHover}>
      <ResetBtn onClick={onClickResetBtn}><FcUndo /></ResetBtn>
      <DelBtn><FcEmptyTrash /></DelBtn>
    </StudentBtn>
  </Container>);
}

export default StudentInTrash;