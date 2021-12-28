import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag } from "react-dnd"

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


  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "LIST",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.6 : 1 }}>
      <Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList} ref={drag}>
        <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>
        <ListName>{listName}</ListName>
      </Container>
    </div>
  );
}

export default ListItem;