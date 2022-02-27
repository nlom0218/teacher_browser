import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from "react-dnd"
import { useMutation } from '@apollo/client';
import useMe from '../../../Hooks/useMe';
import { SEE_ONE_STUDENT_LIST_QUERY } from '../../../Graphql/StudentList/query';
import { ADD_STUDENT_MUTATION } from '../../../Graphql/StudentList/mutation';
import Loading from '../../Shared/Loading';

const SCenterDndContainer = styled.div`
  height: ${props => props.inList ? "100%" : "60%"};
  width: ${props => props.inList ? "100%" : "40%"};
  position: absolute; 
  z-index: ${props => props.someDragging ? 30 : -1};
`

const CenterDndContainer = ({ someDragging, setSuccessMsg, setErrorMsg, listName, listId, setMouseEnter, inList }) => {
  const me = useMe()

  const onCompleted = (result) => {
    const { addStudent: { ok, error } } = result
    if (error) {
      setErrorMsg(`이미 명렬표에 존재합니다. 😅`)
      return
    }
    if (ok && inList) {
      setSuccessMsg(`명렬표에 추가되었습니다. 😀`)
    } else {
      setSuccessMsg(`${listName} 에 추가되었습니다. 😀`)
    }

  }
  const [addStudent, { loading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted,
    update: (cache, { data: { addStudent: { ok } } }) => {
      if (ok) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeStudentList() {
            }
          }
        })
      }
    }
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
          studentId: [studentId],
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

  useEffect(() => {
    if (!someDragging) {
      setMouseEnter(false)
    }
  }, [someDragging])

  if (loading) {
    return <Loading page="center" />
  }

  return (<SCenterDndContainer someDragging={someDragging} ref={studentDrop} inList={inList}></SCenterDndContainer>);
}

export default CenterDndContainer;