// 리액트
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//

// 컴포넌트
import BasicContainer from "../Components/Shared/BasicContainer";
import TitleArea from "../Components/Journal/TitleArea";
import MainArea from "../Components/Journal/MainArea";

// 팝업
import { isPopupVar } from "../apollo";
import { useQuery, useReactiveVar } from "@apollo/client";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../Graphql/StudentList/query";
import Pop_WriteJournal from "../Components/Journal/Popup/Pop_WriteJournal";
import StudentList from "../Components/Journal/Popup/StudentList";
import DeleteJournal from "../Components/Journal/Popup/DeleteJournal";

//
const Journal = ({ me }) => {
  const { type, id } = useParams();

  const isPopup = useReactiveVar(isPopupVar);
  const [studentListName, setStudentListName] = useState(undefined);
  const [students, setStudents] = useState([]);
  const [sort, setSort] = useState("num");

  const { data, loading, error } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id,
      sort,
    },
    skip: !id || type === "student",
  });

  // 팝업 닫으면 localstorage의 학생 정보 삭제
  if (!localStorage.getItem("popup") && localStorage.getItem("selectedStudent")) localStorage.removeItem("selectedStudent");

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0].listName);
      setStudents(data?.seeStudentList[0].students);
    }
  }, [data]);

  return (
    <BasicContainer menuItem={true}>
      <TitleArea studentListName={studentListName} />
      {id ? <MainArea me={me} students={students} loading={loading} error={error} setSort={setSort} sort={sort} /> : <div>학급일지를 설명하는 ? 포스터?</div>}
      {isPopup === "writeJournal" && <Pop_WriteJournal me={me} />}
      {isPopup === "seeStudentList" && <StudentList me={me} />}
      {isPopup === "deleteJournal" && <DeleteJournal />}
    </BasicContainer>
  );
};

export default Journal;
