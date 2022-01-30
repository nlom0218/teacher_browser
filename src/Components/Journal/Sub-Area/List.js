// 리액트
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Datepicker from "react-datepicker";

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

  // 오늘 날짜 확인하기
  const date = new Date();
  const today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return (
    <>
      {students.map((obj, index) => {
        return <InputArea key={obj.studentNumber} me={me} studentId={obj._id} today={today}></InputArea>;
      })}
    </>
  );
};
export default List;
