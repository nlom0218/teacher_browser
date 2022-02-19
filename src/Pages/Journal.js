import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicContainer from "../Components/Shared/BasicContainer";
import TitleArea from "../Components/Journal/TitleArea";
import MainArea from "../Components/Journal/MainArea";
import { isPopupVar } from "../apollo";
import { useQuery, useReactiveVar } from "@apollo/client";
import { SEE_ONE_STUDENT_LIST_QUERY } from "../Graphql/StudentList/query";
import Pop_WriteJournal from "../Components/Journal/Popup/Pop_WriteJournal";
import StudentList from "../Components/Journal/Popup/StudentList";
import DeleteJournal from "../Components/Journal/Popup/DeleteJournal";
import styled from "styled-components";
import { customMedia } from "../styles";
import JournalDetail from "../Components/Journal/JournalDetail";
import { SEE_ONE_STUDENT_QUERY } from "../Graphql/Student/query";
import EditJournal from "../Components/Calendar/Popup/EditJournal";
import AddJournal from "../Components/Calendar/Popup/AddJournal";
import AlertMessage from "../Components/Shared/AlertMessage";
import AttendSelectedStudent from "../Components/Calendar/Popup/AttendSelectedStudent";
import useTitle from "../Hooks/useTitle";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  padding: 20px;
  padding: 1.25rem;
  grid-template-rows: auto 1fr;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const Journal = ({ me }) => {
  const titleUpdataer = useTitle("티처캔 | 학급일지")
  const { type, id } = useParams();

  const isPopup = useReactiveVar(isPopupVar);
  const [studentListName, setStudentListName] = useState(undefined);
  const [studentName, setStudentName] = useState(undefined)
  const [students, setStudents] = useState([]);
  const [sort, setSort] = useState("num");

  const [refetchQuery, setRefetchQuery] = useState(1)

  const [msg, setMsg] = useState(undefined)
  const [errMsg, setErrMsg] = useState(undefined)

  const { data, loading, error } = useQuery(SEE_ONE_STUDENT_LIST_QUERY, {
    variables: {
      listId: id,
      sort,
    },
    skip: !id || type === "student",
  });

  const { data: studentData, loading: studentLoading, refetch } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId: id
    },
    skip: !id || type !== "student"
  })

  // 팝업 닫으면 localstorage의 학생 정보 삭제
  if (!localStorage.getItem("popup") && localStorage.getItem("selectedStudent")) localStorage.removeItem("selectedStudent");

  useEffect(() => {
    if (data) {
      setStudentListName(data?.seeStudentList[0].listName);
      setStudents(data?.seeStudentList[0].students);
    }
  }, [data]);

  useEffect(() => {
    if (studentData) {
      setStudentName(studentData?.seeAllStudent[0]?.studentName)
    } else {
      setStudentName(undefined)
    }
  }, [studentData])

  useEffect(() => {
    refetch()
  }, [refetchQuery])

  return (
    <BasicContainer menuItem={true} screen="small">
      <Container>
        <TitleArea studentListName={studentListName} type={type} studentName={studentName} />
        {type === "list" && <MainArea me={me} students={students} loading={loading} error={error} setSort={setSort} sort={sort} listId={id} />}
        {type === "student" && <JournalDetail studentId={id} teacherEmail={me?.email} refetchQuery={refetchQuery} studentName={studentName} />}
      </Container>
      {isPopup === "writeJournal" && <Pop_WriteJournal me={me} />}
      {isPopup === "seeStudentList" && <StudentList me={me} />}
      {isPopup === "deleteJournal" && <DeleteJournal />}
      {isPopup === "addJournal" && <AddJournal setErrMsg={setErrMsg} userEmail={me?.email} setMsg={setMsg} setRefetchQuery={setRefetchQuery} urlDate={undefined} />}
      {isPopup === "editJournal" && <EditJournal setErrMsg={setErrMsg} setRefetchQuery={setRefetchQuery} userEmail={me?.email} setMsg={setMsg} urlDate={undefined} />}
      {isPopup === "selectedStudent" && <AttendSelectedStudent />}
      {errMsg && <AlertMessage msg={errMsg} setMsg={setErrMsg} type="error" time={3000} />}
      {msg && <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />}
    </BasicContainer>
  );
};

export default Journal;
