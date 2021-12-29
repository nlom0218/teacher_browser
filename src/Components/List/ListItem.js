import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag, useDrop } from "react-dnd"
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useMe from '../../Hooks/useMe';

const ADD_STUDENT_MUTATION = gql`
  mutation AddStudent($teacherEmail: String!, $studentId: ID!, $listId: ID!) {
    addStudent(teacherEmail: $teacherEmail, studentId: $studentId, listId: $listId) {
      ok
      error
    }
  }
`

const DndContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
  .list-dndContainer {
    width: 40%;
  }
`

const Container = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const ListIcon = styled.div`
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const ListName = styled.div`

  text-align: center;
`

const LeftDndContainer = styled.div`
  height: 100%;
  width: 30%;
  left: 0;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const RigtDndContainer = styled.div`
  height: 100%;
  width: 30%;
  right: 0;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const CenterDndContainer = styled.div`
  height: 100%;
  width: 40%;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const ListItem = ({ listName, listOrder, index, moveStudentList, listId, someDragging }) => {
  const me = useMe()
  const [mouseEnter, setMouseEnter] = useState(false)
  const onCompleted = (result) => {
    const { addStudent: { ok, error } } = result
    if (ok) {
      window.alert("성공!")
    }
  }
  const [addStudent, { loading }] = useMutation(ADD_STUDENT_MUTATION, {
    onCompleted
  })
  const onMouseEnterList = () => setMouseEnter(true)
  const onMouseLeaveList = () => setMouseEnter(false)
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "LIST",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  const [_, studentDrop] = useDrop({
    accept: "STUDENT",
    drop: (item) => {
      const { studentId } = item
      addStudent({
        variables: {
          teacherEmail: me?.email,
          studentId,
          listId
        }
      })
    },
    hover: () => {
      setMouseEnter(true)
    }
  })

  return (
    <DndContainer>
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.6 : 1 }} className="list-dndContainer">
        <Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList} ref={drag}>
          <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>
          <ListName>{listName}</ListName>
        </Container>
      </div>
      <LeftDndContainer someDragging={someDragging}></LeftDndContainer>
      <RigtDndContainer someDragging={someDragging}></RigtDndContainer>
      <CenterDndContainer someDragging={someDragging} ref={studentDrop}></CenterDndContainer>
    </DndContainer>
  );
}

export default ListItem;