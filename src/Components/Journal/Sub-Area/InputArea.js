// 리액트
import React from "react";
import { useForm } from "react-hook-form";

// 그래프큐엘
import { useQuery, useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { WRITE_JOURNAL_MUTATION, DELETE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";

//
const InputArea = ({ me, studentId, today }) => {
  const { register, handleSubmit } = useForm();
  const [writeJournal, { loading: mutationLoading1 }] = useMutation(WRITE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }],
  });
  const [deleteJournal, { loading: mutationLoading2 }] = useMutation(DELETE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }],
  });

  // 학생 불러오기
  const { loading, error, data } = useQuery(SEE_ONE_STUDENT_QUERY, { variables: { studentId } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // 불러온 학생 변수 저장
  const {
    seeAllStudent: [student],
  } = data;

  // 내용 저장하는 함수
  function onSubmitHandle(data, e) {
    if (data.text.trim() === "") return;
    if (mutationLoading1) return;
    writeJournal({ variables: { userEmail: me.email, ownerId: studentId, contents: `<${data.date}> ${data.text}` } });
    e.target.childNodes[3].value = "";
  }

  // 내용 삭제하는 함수
  function onClickHandle(index) {
    if (mutationLoading2) return;
    deleteJournal({ variables: { userEmail: me.email, ownerId: studentId, index } });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <div style={{ display: "inline", marginRight: "10px" }}>{student.studentNumber}번</div>
        <div style={{ display: "inline", marginRight: "10px" }}>{student.studentName}</div>
        <input {...register("date")} defaultValue={today} type="date"></input>
        <textarea {...register("text")} autoComplete="off" type="text"></textarea>
        <button type="submit">저장</button>
      </form>
      <div>
        {[...student.journal].reverse().map((journal, index, array) => (
          <div key={index}>
            {journal}
            <button onClick={() => onClickHandle(array.length - index - 1)}>❌</button>
          </div>
        ))}
      </div>
    </>
  );
};
export default InputArea;
