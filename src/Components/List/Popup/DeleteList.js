import { useMutation } from '@apollo/client';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { DELETE_STUDENT_LIST_MUTATION } from '../../../Graphql/StudentList/mutation';
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query"
import useMe from '../../../Hooks/useMe';
import routes from '../../../routes';
import { customMedia } from '../../../styles';
import BtnPopupContainer from '../../Shared/BtnPopupContainer';
import Loading from '../../Shared/Loading';

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

const DeleteList = ({ listId }) => {
  const me = useMe()
  const navigate = useNavigate()
  const onCompleted = (result) => {
    const { deleteStudentList: { ok } } = result
    if (ok) {
      outPopup()
      navigate(routes.list)
    }
  }
  const [deleteStudentList, { loading }] = useMutation(DELETE_STUDENT_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ALL_STUDENT_LIST_QUERY }]
  })
  const onClickDelBtn = () => {
    if (loading) {
      return
    }
    if (!listId) {
      window.alert("오류가 발생하였습니다. 취소 후 다시 시도하세요. 계속 될 경우 관리자에게 문의 부탁드립니다.")
      return
    }
    deleteStudentList({
      variables: {
        listId,
        teacherEmail: me?.email
      }
    })
  }
  if (loading) {
    return <Loading page="btnPopupPage" />
  }
  return (<BtnPopupContainer>
    <Container>
      <Btn>
        <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
        <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
      </Btn>
      <Msg>명렬표를 삭제하시겠습니까?</Msg>
      <Msg>명렬표를 삭제하면 다시 복구할 수 없습니다.</Msg>
    </Container>
  </BtnPopupContainer>);
}

export default DeleteList;