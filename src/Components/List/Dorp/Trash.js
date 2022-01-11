import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from "react-dnd"
import { useMutation, useReactiveVar } from '@apollo/client';
import useMe from '../../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { DELETE_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../../../Graphql/StudentList/query';
import { DELETE_STUDENT_LIST_MUTATION } from '../../../Graphql/StudentList/mutation';
import { inPopup, isPopupVar } from '../../../apollo';
import DeleteList from '../Popup/DeleteList';
import { color } from '../../../styles';
import IcCloseTrash from '../../../icons/Trash/IcCloseTrash';

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  position: relative;
`

const DelIcon = styled.div`
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0))
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

const SuccessMsg = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.error ? props.theme.redColor : props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 10px;
  border-radius: 0.625rem;
  box-shadow: ${color.boxShadow};
`

const Trash = ({ someDragging, setSuccessMsg }) => {
  const me = useMe()
  const isPopup = useReactiveVar(isPopupVar)
  const [listId, sertListId] = useState(undefined)

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
      inPopup("deleteList")
      const { listId } = item
      sertListId(listId)
      // deleteStudentList({
      //   variables: {
      //     teacherEmail: me?.email,
      //     listId
      //   }
      // })
    }
  })

  // 학생을 삭제하기 위한 drop
  const [__, studentDrop] = useDrop({
    accept: "STUDENT",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      window.alert("휴지통으로 이동 => backend에서 학생 필드 trash값 이용하기, 이동 후 suucessMsg띄우기")
      // setSuccessMsg({ msg: `휴지통으로 이동되었습니다. 😀`, ok: true })
    }
  })

  return (<Container>
    <DelIcon onClick={() => window.alert("ss")}><IcCloseTrash /></DelIcon>
    <DropContainer someDragging={someDragging}>
      <ListDrop ref={listDrop} className="delDrop">명렬표삭제 🗑</ListDrop>
      <StudentDrop ref={studentDrop} className="delDrop">학생삭제 🗑</StudentDrop>
    </DropContainer>
    {isPopup === "deleteList" && <DeleteList listId={listId} />}
  </Container>
  );
}

export default Trash;