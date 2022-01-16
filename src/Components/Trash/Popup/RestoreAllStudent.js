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
    background-color: ${props => props.theme.btnBgColor};
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    column-gap: 1.25rem;
  `}
`

const RestoreBtn = styled.div``

const CancelBtn = styled.div``

const RestoreAllStudent = () => {
  const onClickRestoreBtn = () => {
    window.alert("학생 전체 복구하기 => 백앤드 추가 필요")
  }

  const onClickCancelBtn = () => outPopup()
  return (<BtnPopupContainer>
    <Container>
      <Btn>
        <RestoreBtn onClick={onClickRestoreBtn}>복구하기</RestoreBtn>
        <CancelBtn onClick={onClickCancelBtn}>취소하기</CancelBtn>
      </Btn>
      <div>휴지통에 있는 전체 학생을 복구하시겠습니까?</div>
      <div>복구된 학생은 학생 목록에서 볼 수 있습니다.</div>
    </Container>
  </BtnPopupContainer>);
}

export default RestoreAllStudent;