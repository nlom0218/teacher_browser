import React from 'react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { customMedia } from '../../../styles';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${props => props.theme.bgColor};
  ${customMedia.greaterThan("desktop")`
    justify-items: center;
  `}
`


const Btn = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  div {
    padding: 12px 40px;
    padding: 0.75rem 2.5rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    text-align: center;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
`

const CancleBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
`

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
`

const DeleteStudent = () => {
  const onClickDelBtn = () => {
    window.alert("휴지통으로 이동 => backend에서 학생 필드 trash값 이용하기")
  }
  return (<BtnPopupContainer>
    <Container>
      <Btn>
        <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
        <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
      </Btn>
      <Msg>학생을 삭제하시겠습니까?</Msg>
      <Msg>삭제한 학생은 휴지통에서 확인 가능합니다.</Msg>
    </Container>
  </BtnPopupContainer>);
}

export default DeleteStudent;