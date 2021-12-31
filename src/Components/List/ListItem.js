import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag, useDrop } from "react-dnd"
import { useMutation } from '@apollo/client';
import useMe from '../../Hooks/useMe';
import CenterDndContainer from "./Dorp/CenterDndContainer"

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

const RightDndContainer = styled.div`
  height: 100%;
  width: 30%;
  right: 0;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const ListItem = ({ listName, listOrder, index, moveStudentList, listId, someDragging, setSuccessMsg }) => {
  // 리스트 아이콘위에 마우스를 올려두면 아이콘을 바꾸기 위한 값
  const [mouseEnter, setMouseEnter] = useState(false)

  // 리스트 아이콘위에 마우스를 올려두면 아이콘을 바꾸기 위한 함수
  const onMouseEnterList = () => setMouseEnter(true)
  const onMouseLeaveList = () => setMouseEnter(false)

  // 리스트 drag를 위해 필요한 것
  // 아래의 두번째 인자를 드래그 할 곳에 참조로 넣는다.
  // dragPreview는 드래그를 하는 도중 보여지는 이미지
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "LIST",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  return (
    <DndContainer>
      <div ref={dragPreview} style={{ opacity: isDragging ? 0.6 : 1 }} className="list-dndContainer">
        <Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList} ref={drag}>
          <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>
          <ListName>{listName}</ListName>
        </Container>
      </div>
      {/* 리스트를 옮길 때 다른 리스트의 왼쪽으로 옮기면 앞으로 이동하기 */}
      <LeftDndContainer someDragging={someDragging}></LeftDndContainer>

      {/* 가운데 부분은 학생들을 리스트에 추가하는 부분 */}
      <RightDndContainer someDragging={someDragging}></RightDndContainer>

      {/* 리스트를 옮길 때 다른 리스트의 오른쪽으로 옮기면 뒤로 이동하기 */}
      <CenterDndContainer
        someDragging={someDragging}
        setSuccessMsg={setSuccessMsg}
        listName={listName}
        listId={listId}
        setMouseEnter={setMouseEnter}
      />
    </DndContainer>
  );
}

export default ListItem;