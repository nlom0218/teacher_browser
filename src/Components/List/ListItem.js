import React, { useEffect, useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';
import { useDrag } from "react-dnd"
import CenterDndContainer from "./Dorp/CenterDndContainer"
import LeftDndContainer from './Dorp/LeftDndContainer';
import RightDndContainer from './Dorp/RightDndContainer';
import { Link } from 'react-router-dom';
import routes from '../../routes';

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
  a {
    cursor: pointer;
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    row-gap: 10px;
    row-gap: 0.625rem;
  }
`

const ListIcon = styled.div`
    font-size: 2.5em;
    font-size: 2.5rem;
`

const ListName = styled.div`
  /* color: ${props => props.theme.fontColor}; */
  /* font-weight: 600; */
  /* text-shadow: 0.5px 0.5px 0.5px ${props => props.theme.bgColor}; */
  transition: text-shadow 1s ease;
  text-align: center;
`

const ListItem = ({ listName, listOrder, index, listId, someDragging, setSuccessMsg, setSomeDragging, listIcon }) => {
  // 리스트 아이콘위에 마우스를 올려두면 아이콘을 바꾸기 위한 값
  const [mouseEnter, setMouseEnter] = useState(false)

  // 리스트 아이콘위에 마우스를 올려두면 아이콘을 바꾸기 위한 함수
  const onMouseEnterList = () => setMouseEnter(true)
  const onMouseLeaveList = () => setMouseEnter(false)

  // 리스트 drag를 위해 필요한 것
  // 아래의 두번째 인자를 드래그 할 곳에 참조로 넣는다.
  // dragPreview는 드래그를 하는 도중 보여지는 이미지
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // type은 필수값으로 drop하는 곳의 accept과 같아야 한다.
    type: "LIST",

    // drag를 통해 전달할 내용들
    item: { listOrder, index, listId },

    // 현재 드래그를 하고 있는지 안하고 있는지 확인하기 위한 것....(블로그 참고)
    // useDrag의 첫 번째 인자의 객체에 속해 있는 isDragging으로 알 수 있다.
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),

    // 드래그가 끝났을때 작동하는 부분
    end: (item, monitor) => {
      const { listOrder: originOrder, index: originIndex } = item

      // dropRef로 선언한 태그 위에 드랍이 되었는지 안되었는지
      const didDrop = monitor.didDrop()

      if (!didDrop) {

      }
    }
  }), [listOrder, index, listId]
  )

  // useDrag의 isDragging을 보며 someDragging값 바꾸기
  useEffect(() => {
    isDragging ? setSomeDragging(true) : setSomeDragging(false)
  }, [isDragging, setSomeDragging])
  return (
    <DndContainer>
      <div ref={dragPreview}
        // style={{ opacity: isDragging ? 0.6 : 1 }}
        className="list-dndContainer">
        <Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList} ref={drag}>
          <Link to={`${routes.list}/detail/${listId}`}>
            {listIcon ?
              <ListIcon>{listIcon}</ListIcon>
              :
              <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>}
            <ListName>{listName}</ListName>
          </Link>
        </Container>
      </div>
      {/* 리스트를 옮길 때 다른 리스트의 왼쪽으로 옮기면 앞으로 이동하기 */}
      {/* <LeftDndContainer
        someDragging={someDragging}
        listId={listId}
        index={index}
      /> */}

      {/* 가운데 부분은 학생들을 리스트에 추가하는 부분 */}
      {/* <RightDndContainer
        someDragging={someDragging}
        listId={listId}
        index={index}
      /> */}

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