import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag, useDrop } from "react-dnd"

const DndContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  cursor: pointer;
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
  const [mouseEnter, setMouseEnter] = useState(false)
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
    hover: (item) => {
      console.log(item);
    }
  })

  return (
    <DndContainer>
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.6 : 1 }}>
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