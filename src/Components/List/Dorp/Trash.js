import React, { useState } from 'react';
import styled from 'styled-components';
import { useDrop } from "react-dnd"
import { useMutation, useReactiveVar } from '@apollo/client';
import useMe from '../../../Hooks/useMe';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { EDIT_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../../../Graphql/StudentList/query';
import { DELETE_STUDENT_LIST_MUTATION } from '../../../Graphql/StudentList/mutation';
import { inPopup, isPopupVar } from '../../../apollo';
import DeleteList from '../Popup/DeleteList';
import { color } from '../../../styles';
import IcCloseTrash from '../../../icons/Trash/IcCloseTrash';
import { useNavigate } from 'react-router';
import routes from '../../../routes';
import IcOpenTrashCan from '../../../icons/Trash/IcOpenTrashCan';

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  position: relative;
`

const DelIcon = styled.div`
  cursor: pointer;
  z-index: ${props => props.someDragging ? -5 : 5};
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
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
  z-index: ${props => props.someDragging ? 5 : -5};
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

const Trash = ({ someDragging, setSuccessMsg, selectedTag, selectedSort }) => {
  const me = useMe()
  const isPopup = useReactiveVar(isPopupVar)
  const navigate = useNavigate()
  const [listId, setListId] = useState(undefined)
  const [isHover, setIsHover] = useState(false)

  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      setSuccessMsg({ msg: `휴지통으로 이동되었습니다. 😀`, ok: true })
    }
  }

  const [moveTrashStudent, { loading: studentLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    refetchQueries: [{
      query: SEE_ALL_STUDENT_QUERY,
      variables: {
        ...(selectedTag.length !== 0 && { tag: selectedTag }),
        ...(selectedSort && { sort: selectedSort })
      }
    }],
    onCompleted
  })

  // 리스트를 삭제하기 위한 drop
  const [_, listDrop] = useDrop({
    accept: "LIST",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      inPopup("deleteList")
      const { listId } = item
      setListId(listId)
    }
  })

  // 학생을 삭제하기 위한 drop
  const [__, studentDrop] = useDrop({
    accept: "STUDENT",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      const { studentId } = item
      console.log(studentId);
      moveTrashStudent({
        variables: {
          teacherEmail: me?.email,
          studentId,
          trash: true
        }
      })
    }
  })

  const onClickTrash = () => {
    navigate(routes.trash)
  }
  return (<Container>
    <DelIcon onClick={onClickTrash} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>
      {isHover ? <IcOpenTrashCan /> : <IcCloseTrash />}
    </DelIcon>
    <DropContainer someDragging={someDragging}>
      <ListDrop ref={listDrop} className="delDrop">명렬표삭제 🗑</ListDrop>
      <StudentDrop ref={studentDrop} className="delDrop">학생삭제 🗑</StudentDrop>
    </DropContainer>
    {isPopup === "deleteList" && <DeleteList listId={listId} />}
  </Container>
  );
}

export default Trash;