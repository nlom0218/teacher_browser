import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDrop } from "react-dnd"
import { useMutation, useReactiveVar } from '@apollo/client';
import useMe from '../../../Hooks/useMe';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY, SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import { EDIT_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { inPopup, isPopupVar } from '../../../apollo';
import DeleteList from '../Popup/DeleteList';
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
  display: flex;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: ${props => props.someDragging ? 5 : -5};
  width: 60%;
  height: 60%;
`

const Trash = ({ someDragging, setSuccessMsg, selectedTag, selectedSort, dragType }) => {
  const me = useMe()
  const isPopup = useReactiveVar(isPopupVar)
  const navigate = useNavigate()
  const [listId, setListId] = useState(undefined)
  const [isHover, setIsHover] = useState(false)

  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      setSuccessMsg(`휴지통으로 이동되었습니다. 😀`)
    }
  }

  const [moveTrashStudent, { loading: studentLoading }] = useMutation(EDIT_STUDENT_MUTATION, {
    refetchQueries: [
      {
        query: SEE_ALL_STUDENT_QUERY,
        variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false
        }
      },
      { query: SEE_ALL_STUDENT_IN_TRASH_QUERY, variables: { trash: true } },
    ],
    onCompleted
  })

  // 리스트를 삭제하기 위한 drop
  const [_, listDrop] = useDrop({
    accept: "LIST",

    hover: () => {
      setIsHover(true)
    },

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

    hover: () => {
      setIsHover(true)
    },

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

  useEffect(() => {
    if (!someDragging) {
      setIsHover(false)
    }
  }, [someDragging])
  return (<Container>
    <DelIcon onClick={onClickTrash} onMouseLeave={() => setIsHover(false)} onMouseEnter={() => setIsHover(true)}>
      {isHover ? <IcOpenTrashCan /> : <IcCloseTrash />}
    </DelIcon>
    <DropContainer />
    {dragType === "list" && <DropContainer someDragging={someDragging} ref={listDrop}></DropContainer>}
    {dragType === "student" && <DropContainer DropContainer someDragging={someDragging} ref={studentDrop}></DropContainer>}
    { isPopup === "deleteList" && <DeleteList listId={listId} />}
  </Container >
  );
}

export default Trash;