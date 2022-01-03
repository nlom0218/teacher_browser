import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { FcUpload } from 'react-icons/fc';
import styled from 'styled-components';
import { darkModeVar } from '../../apollo';
import useMedia from '../../Hooks/useMedia';
import { color } from '../../styles';
import CenterDndContainer from './Dorp/CenterDndContainer';

// 연한 블루: #8dbdff
// 진한 블루: #3b7dd8

const Container = styled.div`
  height: 100%;
  align-self: flex-end;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  position: relative;
`

const DndBox = styled.div` 
  height: 380px;
  max-height: 380px;
  background-color: ${props => props.someDragging
    ?
    (props.darkMode ? "#8dbdff" : "#3b7dd8")
    :
    (props.darkMode ? "#3b7dd8" : "#8dbdff")};
  border: 1px solid ${props => props.darkMode ? "#8dbdff" : "#3b7dd8"};
  transition: background-color 1s ease, border 1s ease;
`

const UploadIcon = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  padding: 20px;
  padding: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${props => props.someDragging ?
    (props.darkMode ? "#3b7dd8" : "#8dbdff")
    :
    (props.darkMode ? "#8dbdff" : "#3b7dd8")};
  color: ${props => props.someDragging ?
    (props.darkMode ? "#3b7dd8" : "#8dbdff")
    :
    (props.darkMode ? "#8dbdff" : "#3b7dd8")};
  top: ${props => props.someDragging ? "35%" : "10%"};
  font-size: 2.5em;
  font-size: 2.5rem;
  transition: border 1s ease, color 1s ease, top 1s ease;
`

const DragMsg = styled.div`
  width: 100%;
  position: absolute;
  opacity: 0.8;
  font-weight: 600;
  top: 40%;
  left: 50%;
  transform: ${props => props.someDragging ? "translate(-70%, 0)" : "translate(-50%, 0)"};
  opacity: ${props => props.someDragging ? "0" : "1"};
  transition: transform 1s ease, opacity 1s ease;
  display: grid;
  justify-items: center;
  row-gap: 20px;
  row-gap: 1.25rem;
  .mainMsg {
    font-size: 1.75em;
    font-size: 1.75rem;
  }
  .subMsg {
    font-size: 0.875em;
    font-size: 0.875rem;
  }
`

const AddBtnBox = styled.div`
  width: 100%;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: ${props => props.someDragging ? "translate(-30%, 0)" : "translate(-50%, 0)"};
  opacity: ${props => props.someDragging ? "0" : "1"};
  transition: transform 1s ease, opacity 1s ease;
  display: grid;
  justify-items: center;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const AddBtnMsg = styled.div``

const AddBtn = styled.div`
  cursor: pointer;
  padding: ${props => props.isDesktop ? "10px 20px" : "20px 40px"};
  padding: ${props => props.isDesktop ? "0.625rem 1.25rem" : "1.25rem 2.5rem"};
  border-radius: 5px;
  border-radius: 0.3125rem;
  text-align: center;
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.someDragging ?
    (props.darkMode ? "#3b7dd8" : "#8dbdff")
    :
    (props.darkMode ? "#8dbdff" : "#3b7dd8")};
  transition: color 1s ease, background-color 1s ease;
`

const AddStudentBox = ({ listName, listId, setSuccessMsg, someDragging }) => {
  const darkMode = useReactiveVar(darkModeVar)

  // 아무런 전혀 의미없는 값.. 단지 에러 방지
  const [__, set__] = useState(null)

  const media = useMedia()

  const onClickAddBtn = () => { window.alert("학생 복수 추가 기능") }
  return (<Container>
    {media === "Desktop" ? <DndBox someDragging={someDragging} darkMode={darkMode}>
      <UploadIcon someDragging={someDragging} darkMode={darkMode}><BsPersonPlus /></UploadIcon>
      <DragMsg someDragging={someDragging}>
        <div className="mainMsg">Drag & Drop</div>
        <div className="subMsg">학생 목록에서 학생을 드래그하여 명렬표에 추가하세요! 😁</div>
      </DragMsg>
      <AddBtnBox someDragging={someDragging}>
        <AddBtnMsg>또는</AddBtnMsg>
        <AddBtn
          someDragging={someDragging}
          darkMode={darkMode}
          isDesktop={media === "Desktop"}
          onClick={onClickAddBtn}
        >학생 추가하기</AddBtn>
      </AddBtnBox>
      <CenterDndContainer
        someDragging={someDragging}
        setSuccessMsg={setSuccessMsg}
        listName={listName}
        listId={listId}
        setMouseEnter={set__}
        inList={true}
      />
    </DndBox>
      : <AddBtn
        someDragging={someDragging}
        darkMode={darkMode}
        onClick={onClickAddBtn}
        isDesktop={media === "Desktop"}
      >
        학생 추가하기
      </AddBtn>
    }
  </Container>);
}

export default AddStudentBox;