// 리액트
import React, { useState, useEffect } from "react";

// 컴포넌트
import TabBar from "./Sub-Area/TabBar";
import InputArea from "./Sub-Area/InputArea";

// 그래프큐엘
import { useQuery } from "@apollo/client";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";

//
const MainArea = () => {
  const [selectedListId, setSelectedListId] = useState();
  const { loading, error, data } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const studentList = data.seeStudentList;

  if (!selectedListId) setSelectedListId(studentList[0].listId);

  return (
    <>
      <TabBar studentList={studentList} setSelectedListId={setSelectedListId} />
      <InputArea listId={selectedListId} />
    </>
  );
};

export default MainArea;
