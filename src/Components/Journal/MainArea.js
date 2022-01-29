// 리액트
import React, { useState } from "react";

// 컴포넌트
import TabBar from "./Sub-Area/TabBar";
import List from "./Sub-Area/List";

// 그래프큐엘
import { useQuery } from "@apollo/client";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";

//
const MainArea = ({ me }) => {
  const [selectedListId, setSelectedListId] = useState();
  const { loading, error, data } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        로그인을 해주세요. <br />
        {error.message}
      </div>
    );

  const studentList = data.seeStudentList;

  // 명렬표가 없을 경우
  if (studentList.length === 0) return <div>명렬표와 학생을 추가해주세요.</div>;

  // 선택한 명령표가 없을 경우 첫번째 리스트 자동 선택
  if (!selectedListId) setSelectedListId(studentList[0].listId);

  return (
    <>
      <TabBar studentList={studentList} setSelectedListId={setSelectedListId} />
      <List listId={selectedListId} me={me} />
    </>
  );
};

export default MainArea;
