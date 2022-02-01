import React, { useState } from "react";
import { useForm } from "react-hook-form";

// 그래프큐엘
import { useQuery, useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { EDIT_JOURNAL_MUTATION, DELETE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";

import TextareaAutosize from "react-textarea-autosize";

const Content = ({ me, studentId, index, journal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  setValue("date", journal.date);
  setValue("text", journal.text);

  const [editJournal] = useMutation(EDIT_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }],
  });

  const [deleteJournal] = useMutation(DELETE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }],
  });

  function editBtnHandle(data) {
    setIsEditing(false);
    editJournal({ variables: { userEmail: me.email, ownerId: studentId, index, contents: { date: data.date, text: data.text } } });
  }
  function delBtnHandle(index) {
    setIsEditing(false);
    deleteJournal({ variables: { userEmail: me.email, ownerId: studentId, index } });
  }

  return (
    <div>
      <input {...register("date")} type="date" readOnly={!isEditing}></input>
      <TextareaAutosize {...register("text")} readOnly={!isEditing}></TextareaAutosize>
      <button onClick={() => setIsEditing(true)} hidden={isEditing}>
        수정
      </button>
      <button onClick={handleSubmit(editBtnHandle)} hidden={!isEditing}>
        완료
      </button>
      <button onClick={() => delBtnHandle(index)} hidden={!isEditing} style={{ color: "red" }}>
        삭제
      </button>
    </div>
  );
};

export default Content;
