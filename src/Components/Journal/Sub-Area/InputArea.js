// 리액트
import React, { useState } from "react";

// 그래프큐엘
import { useQuery } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";

// 팝업
import { inPopup } from "../../../apollo";

// 컴포넌트
import Content from "./Content";

//
const InputArea = ({ me, studentId }) => {
  const [isClosed, setIsClosed] = useState(true);

  // 학생 불러오기
  const { loading, error, data } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: { studentId },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // 불러온 학생 변수 저장
  const {
    seeAllStudent: [student],
  } = data;

  function addText() {
    inPopup("writeJournal");
    localStorage.setItem("selectedStudent", JSON.stringify(student));
  }

  return (
    <>
      <div onClick={() => setIsClosed((isClosed) => !isClosed)}>
        {student.studentNumber}번 {student.studentName} {isClosed ? "🔽" : "🔼"}
      </div>
      <div hidden={isClosed}>
        <button onClick={() => addText()}>➕</button>

        <div>
          {student.journal.map((journal, index) => (
            <Content key={index} me={me} studentId={studentId} index={index} journal={journal} />
          ))}
        </div>
      </div>
    </>
  );
};
export default InputArea;
