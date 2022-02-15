import { useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { inPopup, outPopup } from '../../../apollo';
import { DELETE_ALL_TO_DO_LIST_MUTATION } from '../../../Graphql/ToDoList/mutation';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';

const Container = styled.div`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  justify-items: center;
`

const Contents = styled.div`
  color: ${props => props.theme.bgColor};
`

const DelBtn = styled.div`
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
`

const CancelBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
`

const DelAllToDos = ({ userEmail, setMsg }) => {

  const onCompleted = (result) => {
    const { deleteAllToDoList: { ok } } = result
    if (ok) {
      outPopup()
      setMsg("할 일이 모두 삭제되었습니다. 😁")
    }
  }

  const [deleteAllToDoList, { loading: delLoading }] = useMutation(DELETE_ALL_TO_DO_LIST_MUTATION, {
    onCompleted
  })

  const onClickDelALlBtn = () => {
    deleteAllToDoList({
      variables: {
        userEmail
      }
    })
  }

  const onClickCancelBtn = () => {
    inPopup("toDoComplete")
  }

  return (<BtnPopupContainer>
    <Container>
      <Contents>완료된 할 일을 모두 삭제하시겠습니까?</Contents>
      <Contents>삭제된 할 일은 복구가 불가능합니다.</Contents>
      <DelBtn onClick={onClickDelALlBtn}>삭제하기</DelBtn>
      <CancelBtn onClick={onClickCancelBtn}>취소하기</CancelBtn>
    </Container>
  </BtnPopupContainer>);
}

export default DelAllToDos;