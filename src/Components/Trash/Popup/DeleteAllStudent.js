import React from 'react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${props => props.theme.bgColor};
  text-align: center;
  line-height: 120%;
`

const Btn = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  div {
    padding: 12px 40px;
    padding: 0.75rem 2.5rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    column-gap: 1.25rem;
  `}
`

const DeleteBtn = styled.div`
  background-color: ${props => props.theme.redColor};
`

const CancelBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
`

const DeleteAllStudent = () => {

  const onClickDeleteBtn = () => {
    window.alert("학생 전체 삭제하기, 백앤드에 코드 수정 필요 => 8번줄 trash: true / 9번줄 student: [] 수정 ")
  }

  const onClickCancelBtn = () => outPopup()
  return (<BtnPopupContainer>
    <Container>
      <Btn>
        <DeleteBtn onClick={onClickDeleteBtn}>삭제하기</DeleteBtn>
        <CancelBtn onClick={onClickCancelBtn}>취소하기</CancelBtn>
      </Btn>
      <div>휴지통에 있는 전체 학생을 삭제하시겠습니까?</div>
      <div>학생을 삭제하면 다시 복구할 수 없습니다.</div>
    </Container>
  </BtnPopupContainer>);
}

export default DeleteAllStudent;