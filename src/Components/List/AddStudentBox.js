import React, { useState } from 'react';
import styled from 'styled-components';
import useMedia from '../../Hooks/useMedia';
import CenterDndContainer from './Dorp/CenterDndContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const DndBox = styled.div`
  min-height: 120px;
  border: 3px dashed ${props => props.theme.popupBgColor};
  border-radius: 10px;
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  div {
    opacity: 0.8;
    font-size: 1.5em;
    font-size: 1.5rem;
  }
`

const AddStudentBox = ({ listName, listId, setSuccessMsg, someDragging }) => {
  // 아무런 전혀 의미없는 값.. 단지 에러 방지
  const [__, set__] = useState(null)

  const media = useMedia()
  return (<Container>
    {media === "Desktop" && <DndBox>
      <div>학생을 Drag & Drop 하여 추가하기</div>
      <CenterDndContainer
        someDragging={someDragging}
        setSuccessMsg={setSuccessMsg}
        listName={listName}
        listId={listId}
        setMouseEnter={set__}
        inList={true}
      />
    </DndBox>}
  </Container>);
}

export default AddStudentBox;