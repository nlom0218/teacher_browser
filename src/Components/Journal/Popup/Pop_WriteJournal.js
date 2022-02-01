// 리액트
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// 팝업
import { outPopup } from "../../../apollo";

// 그래프큐엘
import { useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { WRITE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";

// 라이브러리 컴포넌트
import TextareaAutosize from "react-textarea-autosize";

// 스타일 & 컴포넌트
import styled from "styled-components";
import { customMedia } from "../../../styles";
import PopupContainer from "../../Shared/PopupContainer";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px;
  padding: 1.25rem;
  color: ${(props) => props.theme.bgColor};
  .date {
    color: black;
    text-align: center;
  }
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

const DelBtn = styled.input`
  padding: 12px 40px;
  padding: 0.75rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
`;

const Msg = styled.div`
  text-align: center;
  line-height: 120%;
  color: ${(props) => props.theme.redColor};
  color: red;
`;

//
const Pop_WriteJournal = ({ me }) => {
  // 학생 정보 불러오기
  const [student, _] = useState(JSON.parse(localStorage.getItem("selectedStudent")));
  const { register, handleSubmit } = useForm();
  const [writeJournal, { loading }] = useMutation(WRITE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId: student._id } }],
  });

  // 오늘 날짜 확인하기
  const date = new Date();
  const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  // 학급 일지 저장하는 함수
  function onSubmit(data) {
    if (data.text.trim() === "") return;
    if (loading) return;
    writeJournal({ variables: { userEmail: me.email, ownerId: student._id, contents: { date: data.date, text: data.text } } });
    outPopup();
  }

  return (
    <PopupContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {student.studentNumber}번 {student.studentName}
        </div>
        <Container>
          <input className="date" type="date" {...register("date")} defaultValue={today}></input>
          <TextareaAutosize {...register("text")}></TextareaAutosize>
          <Btn>
            <DelBtn type="submit" value="기록하기" />
            <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
          </Btn>
        </Container>
      </form>
    </PopupContainer>
  );
};

export default Pop_WriteJournal;
