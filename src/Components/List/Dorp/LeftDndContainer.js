import React from 'react';
import styled from 'styled-components';
import { useDrop } from "react-dnd"

const SLeftDndContainer = styled.div`
  height: 100%;
  width: 30%;
  left: 0;
  position: absolute;
  z-index: ${props => props.someDragging ? 30 : -1};
`

const LeftDndContainer = ({ someDragging, index, listId, moveStudentList }) => {

  // 리스트 순서를 변경하기 위한 drop
  const [_, leftDrop] = useDrop({
    accept: "LIST",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
    },

    hover: (item) => {
      const { listId: draggedId, index: draggedIndex } = item
      if (draggedId !== listId) {
        moveStudentList(draggedId, index)
      }
    }

  })
  return (<SLeftDndContainer someDragging={someDragging} ref={leftDrop} ></SLeftDndContainer>);
}

export default LeftDndContainer;