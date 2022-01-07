import React from 'react';
import { FcFullTrash } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrop } from "react-dnd"
import { useMutation } from '@apollo/client';
import useMe from '../../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { DELETE_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../../../Graphql/StudentList/query';
import { DELETE_STUDENT_LIST_MUTATION } from '../../../Graphql/StudentList/mutation';

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  position: relative;
`

const DelIcon = styled.div`
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
  }
`

const DropContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: grid;
  grid-template-rows: 1fr 1fr;
  opacity: ${props => props.someDragging ? 0.8 : 0};
  transition: opacity 0.6s ease;
  border: 1px solid ${props => props.theme.hoverColor};
  background-color: ${props => props.theme.bgColor};
  .delDrop {
    display: grid;
    align-items: center;
    justify-items: center;
  }
`

const ListDrop = styled.div`
`

const StudentDrop = styled.div`
  border-top: 1px solid ${props => props.theme.hoverColor};
`

const Trash = ({ someDragging }) => {
  const me = useMe()

  const [deleteStudentList, { loading: listLoading }] = useMutation(DELETE_STUDENT_LIST_MUTATION, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_LIST_QUERY }]
  })

  const [deleteStudent, { loading: studentLoading }] = useMutation(DELETE_STUDENT_MUTATION, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_QUERY }],
  })

  // 리스트를 삭제하기 위한 drop
  const [_, listDrop] = useDrop({
    accept: "LIST",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      const { listId } = item
      deleteStudentList({
        variables: {
          teacherEmail: me?.email,
          listId
        }
      })
    }
  })

  // 학생을 삭제하기 위한 drop
  const [__, studentDrop] = useDrop({
    accept: "STUDENT",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      const { studentId, studentName } = item
      deleteStudent({
        variables: {
          disconnectOnly: false,
          teacherEmail: me?.email,
          studentId
        }
      })
    }
  })
  return (<Container>
    <DelIcon><FcFullTrash /></DelIcon>
    <DropContainer someDragging={someDragging}>
      <ListDrop ref={listDrop} className="delDrop">명렬표삭제 🗑</ListDrop>
      <StudentDrop ref={studentDrop} className="delDrop">학생삭제 🗑</StudentDrop>

    </DropContainer>
  </Container>
  );
}

export default Trash;