import { useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { inPopup, isPopupVar, isSeeStudentVar } from "../apollo";
import AllList from "../Components/List/AllList";
import DetailList from "../Components/List/DetailList";
import DetailStudent from "../Components/List/DetailStudent";
import CreateStudent from "../Components/List/Popup/CreateStudent";
import SeeStudents from "../Components/List/Popup/SeeStudents";
import StudentSortTag from "../Components/List/Popup/StudentSortTag";
import StudentList from "../Components/List/StudentList";
import AlertMessage from "../Components/Shared/AlertMessage";
import BasicContainer from "../Components/Shared/BasicContainer";
import Loading from "../Components/Shared/Loading";
import { DivideLeftContents } from "../Components/Shared/styled/DivideContents";
import { SEE_ALL_STUDENT_QUERY } from "../Graphql/Student/query";
import useMe from "../Hooks/useMe";
import useMedia from "../Hooks/useMedia";
import useTitle from "../Hooks/useTitle";
import CreateList from "../Components/List/Popup/CreateList";
import { customMedia } from "../styles";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";

const Container = styled.div`
  min-height: 100%;
  max-height: 100%;
  width: 100%;
  display: grid;
  align-items: flex-start;
  position: relative;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 3fr 1fr;
  `}
`;

const StudentIcon = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
  font-size: 1.75em;
  font-size: 1.75rem;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
`;

const List = () => {
  useTitle("티처캔 | 명렬표");
  const me = useMe();
  const isSeeList = useReactiveVar(isSeeStudentVar);
  const isPopup = useReactiveVar(isPopupVar);

  const media = useMedia();

  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedSort, setSelectedSort] = useState(undefined);
  const [seeNum, setSeeNum] = useState(Boolean(localStorage.getItem("seeNum")));
  const [seeStudentIcon, setSeeStudentIcon] = useState(Boolean(localStorage.getItem("seeStudentIcon")));

  // 드래그 중일 때와 아닐 때를 나타내기 위한 값
  const [someDragging, setSomeDragging] = useState(false);
  const [dragType, setDragType] = useState(undefined);

  // 드래그 성공 및 메시지를 띄우기 위한 값
  const [successMsg, setSuccessMsg] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);

  // studentArray => 복수생성할 때 이미 존재하는 학생들의 이름과 새롭게 생성하는 학생들의 이름을 비교하기 위한 배열
  // 중복생성을 막기 위함
  const [existStudentArray, setExistStudentArray] = useState(undefined);

  // url 주소에서 가져오는 값들
  const { type, id } = useParams();

  // 학생목록 가져오기
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      ...(selectedTag.length !== 0 && { tag: selectedTag }),
      ...(selectedSort && { sort: selectedSort }),
      trash: false,
    },
  });

  const onClickStudentIcon = () => {
    if (me) {
      inPopup("students");
    } else {
      inPopup("needLogin");
    }
  };

  // 무언가를 드래그 중일 때 successMsg 초기화
  useEffect(() => {
    if (successMsg) {
      setSuccessMsg(undefined);
    }
    if (errorMsg) {
      setErrorMsg(undefined);
    }
  }, [someDragging]);

  useEffect(() => {
    const localTag = JSON.parse(localStorage.getItem("selectedTag"));
    const localSort = localStorage.getItem("selectedSort");
    if (localTag) {
      setSelectedTag(localTag);
    } else {
      setSelectedTag([]);
    }
    if (localSort) {
      setSelectedSort(localSort);
    } else {
      setSelectedSort(undefined);
    }
  }, []);

  // 학생 정보가 불러와지면 existStudentArray 값 생성
  useEffect(() => {
    if (data) {
      const newExistStudentArray = data?.seeAllStudent.map((item) => item.studentName);
      setExistStudentArray(newExistStudentArray);
    }
  }, [data]);

  if (loading) {
    return <Loading page="mainPage" />;
  }
  return (
    <BasicContainer menuItem={true} notScroll={true}>
      <Container>
        <DivideLeftContents isSeeList={isSeeList}>
          {!type && (
            <AllList
              setSomeDragging={setSomeDragging}
              someDragging={someDragging}
              setSuccessMsg={setSuccessMsg}
              setErrorMsg={setErrorMsg}
              selectedTag={selectedTag}
              selectedSort={selectedSort}
              setDragType={setDragType}
              dragType={dragType}
              me={me}
            />
          )}
          {type === "student" && <DetailStudent studentId={id} selectedTag={selectedTag} selectedSort={selectedSort} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />}
          {type === "detail" && <DetailList listId={id} someDragging={someDragging} setSuccessMsg={setSuccessMsg} setErrorMsg={setErrorMsg} />}
        </DivideLeftContents>
        {media === "Desktop" ? (
          <StudentList
            setSomeDragging={setSomeDragging}
            studentId={id}
            me={me}
            selectedTag={selectedTag}
            seeNum={seeNum}
            selectedSort={selectedSort}
            setDragType={setDragType}
            allStudent={data?.seeAllStudent}
            seeStudentIcon={seeStudentIcon}
          />
        ) : (
          <StudentIcon onClick={onClickStudentIcon}>
            <FaUserFriends />
          </StudentIcon>
        )}
      </Container>
      <AlertMessage msg={successMsg} setMsg={setSuccessMsg} time={3000} type="success" />
      <AlertMessage msg={errorMsg} setMsg={setErrorMsg} time={3000} type="error" />

      {/* 데스크탑이 아닐 때 학생 전체 리스트를 팝업으로 띄우기 */}
      {isPopup === "students" && (
        <SeeStudents meTag={me?.tag} selectedTag={selectedTag} seeNum={seeNum} seeStudentIcon={seeStudentIcon} selectedSort={selectedSort} allStudent={data?.seeAllStudent} me={me} />
      )}
      {isPopup === "seeStudentSetting" && (
        <StudentSortTag
          setSelectedTag={setSelectedTag}
          selectedTag={selectedTag}
          meTag={me?.tag}
          setSeeNum={setSeeNum}
          seeNum={seeNum}
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
          seeStudentIcon={seeStudentIcon}
          setSeeStudentIcon={setSeeStudentIcon}
        />
      )}
      {isPopup === "createList" && <CreateList setErrorMsg={setErrorMsg} setSuccessMsg={setSuccessMsg} />}
      {isPopup === "createStudent" && <CreateStudent existStudentArray={existStudentArray} selectedTag={selectedTag} selectedSort={selectedSort} setErrorMsg={setErrorMsg} />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
    </BasicContainer>
  );
};

export default List;
