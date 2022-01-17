import { useMutation } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { outPopup } from '../../../apollo';
import { RESTORE_STUDENT_MUTATION } from '../../../Graphql/Student/mutation';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY, SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
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

const RestoreAllStudent = ({ teacherEmail, selectedSort, selectedTag }) => {
  const onCompleted = (result) => {
    const { editStudent: { ok } } = result
    if (ok) {
      outPopup()
    }
  }

  const [restoreStudent, { loading }] = useMutation(RESTORE_STUDENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_ALL_STUDENT_IN_TRASH_QUERY, variables: { trash: true } },
      {
        query: SEE_ALL_STUDENT_QUERY,
        variables: {
          ...(selectedTag.length !== 0 && { tag: selectedTag }),
          ...(selectedSort && { sort: selectedSort }),
          trash: false
        }
      }
    ]
  })


  const onClickRestoreBtn = () => {
    restoreStudent({
      variables: {
        teacherEmail,
        restoreAll: true
      }
    })
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