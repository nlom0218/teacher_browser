import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useDrag, useDrop } from "react-dnd"
import { useMutation } from '@apollo/client';
import useMe from '../../../Hooks/useMe';

const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($teacherEmail: String!, $studentId: ID!, $listId: ID!) {
    addStudent(teacherEmail: $teacherEmail, studentId: $studentId, listId: $listId) {
      ok
      error
    }
  }
`

const SCenterDndContainer = styled.div`
  height: 100%;
  width: 40%;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const CenterDndContainer = ({ someDragging, setSuccessMsg, listName, listId, setMouseEnter }) => {
  const me = useMe()

  const onCompleted = (result) => {
    const { addStudent: { ok, error } } = result
    if (ok) {
      setSuccessMsg(`${listName}에 추가되었습니다 😀`)
    }
  }
  const [addStudent, { loading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted
  })

  // 학생을 리스트에 추가하기 위한 drop
  const [_, studentDrop] = useDrop({
    accept: "STUDENT",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      const { studentId, studentName } = item
      addStudent({
        variables: {
          teacherEmail: me?.email,
          studentId,
          listId
        }
      })
    },

    // dragging중일 때 실행된다.
    hover: () => {
      // 리스트 아이콘을 변경한다.
      setMouseEnter(true)
    }
  })

  return (<SCenterDndContainer someDragging={someDragging} ref={studentDrop}></SCenterDndContainer>);
}

export default CenterDndContainer;