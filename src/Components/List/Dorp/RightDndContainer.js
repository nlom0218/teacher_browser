import React from "react";
import styled from "styled-components";
import { useDrop } from "react-dnd";

const SRightDndContainer = styled.div`
  height: 100%;
  width: 30%;
  left: 0;
  position: absolute;
  z-index: ${(props) => (props.someDragging ? 30 : -1)};
`;

const RightDndContainer = ({ someDragging, index, listId }) => {
  // 리스트 순서를 변경하기 위한 drop
  const [_, rightDrop] = useDrop({
    accept: "LIST",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {},

    hover: (item) => {
      const { listId: draggedId, index: draggedIndex } = item;
      if (draggedId !== listId) {
      }
    },
  });
  return <SRightDndContainer someDragging={someDragging} ref={rightDrop}></SRightDndContainer>;
};

export default RightDndContainer;
