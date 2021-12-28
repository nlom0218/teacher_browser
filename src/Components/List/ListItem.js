import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  cursor: pointer;
`

const ListIcon = styled.div`
  align-self: flex-end;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const ListName = styled.div`
  align-self: flex-start;
  text-align: center;
`

const ListItem = ({ listName, listOrder, index, moveStudentList }) => {
  const [mouseEnter, setMouseEnter] = useState(false)
  const onMouseEnterList = () => setMouseEnter(true)
  const onMouseLeaveList = () => setMouseEnter(false)

  const [dragRef, previewRef] = useDrag(
    () => ({
      type: "studentList",
      item: { listOrder, index },
      collect: (monitor) => {
        isDragging: monitor.isDragging()
      },
      end: (item, monitor) => {
        const { listOrder: originListOrder, index: originIndex } = item;
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveStudentList(originListOrder, originIndex)
        }
      }
    }),
    [listName, index, moveStudentList]
  )


  return (<Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList} ref={dragRef}>
    <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>
    <ListName>{listName}</ListName>
  </Container>
  );
}

export default ListItem;