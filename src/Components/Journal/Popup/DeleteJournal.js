import React from "react";
import styled from "styled-components";
import { outPopup } from "../../../apollo";
import { useMutation } from "@apollo/client";
import { DELETE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { customMedia } from "../../../styles";
import BtnPopupContainer from "../../Shared/BtnPopupContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  ${customMedia.greaterThan("desktop")`
    justify-items: center;
  `}
`;

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
`;

const DelBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
`;

const DeleteJournal = () => {
  const variables = JSON.parse(localStorage.getItem("selectedStudent"));

  const onCompleted = (result) => {
    const {
      deleteJournal: { ok },
    } = result;
    if (ok) outPopup();
  };

  const [deleteJournal] = useMutation(DELETE_JOURNAL_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId: variables?.ownerId } }],
  });

  const onClickDelBtn = () => {
    console.log(variables);
    deleteJournal({ variables });
  };
  return (
    <BtnPopupContainer>
      <Container>
        <Btn>
          <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
          <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
        </Btn>
        <Msg>기록을 삭제하시겠습니까?</Msg>
        <Msg>기록을 삭제하면 다시 복구할 수 없습니다.</Msg>
      </Container>
    </BtnPopupContainer>
  );
};

export default DeleteJournal;
