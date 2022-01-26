// 리액트
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

// 그래프큐엘
import { useQuery, useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import { WRITE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";
import useMe from "../../../Hooks/useMe";

//
const InputArea = ({ listId }) => {
  const me = useMe();
  const { register, handleSubmit } = useForm();
  const { loading, error, data } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, { variables: { listId } });
  const [writeJournal, { loading: mutationLoading }] = useMutation(WRITE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_LIST_QUERY, variables: { listId } }],
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const students = data.seeStudentList[0].students;

  // textarea 에서 onblur 시 사용되는 함수
  function onSubmitHandle(_, e) {
    if (mutationLoading) return;
    writeJournal({ variables: { userEmail: me.email, ownerId: e.target.name, contents: e.target.value } });
  }

  return (
    <>
      <form>
        {students.map((obj) => (
          <details key={obj.studentNumber}>
            <summary>
              <div style={{ display: "inline", marginRight: "10px" }}>{obj.studentNumber}번</div>
              <div style={{ display: "inline" }}>{obj.studentName}</div>
            </summary>
            <textarea {...register(obj._id)} autoComplete="off" type="text" defaultValue={obj.journal} onBlur={handleSubmit(onSubmitHandle)}></textarea>
          </details>
        ))}
      </form>
    </>
  );
};
export default InputArea;
