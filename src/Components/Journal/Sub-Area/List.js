// 리액트
import React from "react";

// 그래프큐엘
import { useQuery } from "@apollo/client";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";

// 컴포넌트
import InputArea from "./InputArea";

//
const List = ({ listId, me }) => {
  // listId 로 학생 불러오기
  const { loading, error, data } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, { variables: { listId } });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  // 불러온 학생 Array
  const students = data.seeStudentList[0].students;

  if (students.length === 0) return <div>학생을 추가해주세요.</div>;

  // 팝업 닫으면 localstorage의 학생 정보 삭제
  if (!localStorage.getItem("popup") && localStorage.getItem("selectedStudent")) localStorage.removeItem("selectedStudent");

  return (
    <>
      {students.map((obj, index) => {
        return <InputArea key={index} me={me} studentId={obj._id}></InputArea>;
      })}
    </>
  );
};
export default List;
