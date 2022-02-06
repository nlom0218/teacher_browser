import { useMutation, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { FcEmptyTrash, FcUndo } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import { EDIT_STUDENT_MUTATION } from '../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY, SEE_ALL_STUDENT_QUERY } from '../../Graphql/Student/query';
import useMe from '../../Hooks/useMe';
import DeleteOneStudent from './Popup/DeleteOneStudent';

const Container = styled.div`
  min-height: 160px;
  max-height: 160px;
  min-height: 10rem;
  max-height: 10rem;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  position: relative;
  border: 1px solid ${props => props.theme.cardBorder};
  background-color: ${props => props.theme.cardBg};
  transition: background-color 0.6s ease, border 1s ease;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;
`

const StudentName = styled.div`
  line-height: 120%;
  text-align: center;
`

const StudentBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-self: stretch;
  justify-items: center;
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

const StudentInTrash = ({ item, setSuccessMsg, selectedSort, selectedTag }) => {
  const isPopup = useReactiveVar(isPopupVar)
  const me = useMe()

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
    onCompleted: () => setSuccessMsg("학생 목록으로 복구되었습니다. 😀")
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

  const onClickDelBtn = (id) => {
    inPopup(`deleteOneStudent${id}`)
  }

  return (<Container>
    <StudentName>{item.studentName}</StudentName>
    <StudentBtn>
      <ResetBtn onClick={onClickResetBtn}><FcUndo /></ResetBtn>
      <DelBtn onClick={() => onClickDelBtn(item._id)}><FcEmptyTrash /></DelBtn>
    </StudentBtn>
    {isPopup === `deleteOneStudent${item._id}` &&
      <DeleteOneStudent
        teacherEmail={me?.email}
        studentId={item?._id}
      />}
  </Container>);
}

export default StudentInTrash;