import React, { useState } from "react";
import useTitle from "../Hooks/useTitle";
import { useNavigate } from "react-router";

import { useQuery, useLazyQuery, useReactiveVar, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { inPopup, isPopupVar } from "../apollo";

import styled from "styled-components";
import { customMedia } from "../styles";
import BasicContainer from "../Components/Shared/BasicContainer";
import StudentList from "../Components/Shared/popup/StudentList";
import Loading from "../Components/Shared/Loading";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";

import { IoArrowBackSharp } from "react-icons/io5";

const SBackMenuBtn = styled.div`
  position: absolute;
  left: 10px;
  left: 0.625rem;
  top: 10px;
  top: 0.625rem;
  font-size: 1.5em;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${(props) => props.theme.fontColor};
  transition: color 1s ease;
  z-index: 1;
`;

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 40px;
  padding: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    
  `}
`;

const Title = styled.div`
  display: grid;
  grid-column: 1/3;
  align-items: center;
  font-size: 1.5em;
  font-size: 1.5rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1/2;
  `}
`;
const ListIcon = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 2.5em;
    font-size: 2.5rem;
    cursor: pointer;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
  ${customMedia.greaterThan("tablet")`
    grid-column: 2/3;
  `}
`;

const ListName = styled.div``;

const FormContainer = styled.div`
  grid-column: 1/3;
  display: grid;
  align-items: center;
  padding: 0.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  `}
`;

const ListBtn = styled.button`
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.25rem 0.5rem;
  grid-column: auto;
  display: grid;
  transition: 0.25s;
  border: 0.1rem solid #666666;
  border-radius: 1rem;
  :hover {
    letter-spacing: 0.25rem;
    transform: scale(1.1);
    cursor: pointer;
  }
  color: ${(props) => (props.listId === props.selected ? "black" : "gray")};
`;

const RoleContainer = styled.div``;

const RoleForm = styled.form`
  margin: 0.5rem;
`;

const RoleInput = styled.input`
  margin-left: 0.5rem;
  background-color: white;
  cursor: text;
`;

const SaveBtn = styled.button``;

const DelBtn = styled.button``;

const SEE_ONE_STUDENTLIST = gql`
  query SeeStudentList($listId: ID) {
    seeStudentList(listId: $listId) {
      listName
      students {
        _id
        studentName
        role
      }
    }
  }
`;

const SEE_ALL_STUDENTLISTS = gql`
  query SeeStudentList {
    seeStudentList {
      listId
      listName
    }
  }
`;

const EDIT_ROLE = gql`
  mutation EditStudent($teacherEmail: String!, $studentId: ID, $role: String) {
    editStudent(teacherEmail: $teacherEmail, studentId: $studentId, role: $role) {
      ok
      error
    }
  }
`;

const ManagingRoles = ({ me }) => {
  useTitle("티처캔 | 1인1역");
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState();

  const isPopup = useReactiveVar(isPopupVar);

  const [getStudents, { data: students, loading: studentsLoading, error: studentsError }] = useLazyQuery(SEE_ONE_STUDENTLIST);
  const {
    data: studentList,
    loading: listLoading,
    error: listError,
  } = useQuery(SEE_ALL_STUDENTLISTS, {
    onCompleted: (list) => {
      if (list.seeStudentList.length !== 0) {
        getStudents({ variables: { listId: list.seeStudentList[0].listId } });
        setSelectedList(list.seeStudentList[0].listId);
      }
    },
  });
  const [editRole, { loading: roleLoading, error: roleError }] = useMutation(EDIT_ROLE, { refetchQueries: [{ query: SEE_ONE_STUDENTLIST, variables: { listId: selectedList } }] });

  const createNewList = () => {
    window.localStorage.setItem("popup", "createList");
    inPopup("createList");
    navigate("/list");
  };

  const onClickBackBtn = () => {
    navigate("/menu");
  };

  const onClickListBtn = (listId) => {
    getStudents({ variables: { listId } });
    setSelectedList(listId);
  };

  const onSubmit = (event, id) => {
    event.preventDefault();
    editRole({
      variables: {
        teacherEmail: me.email,
        studentId: id,
        role: event.target.querySelector("input").value,
      },
    });
  };

  const deleteRole = (event, id) => {
    event.target.parentNode.querySelector("input").value = "";
    editRole({
      variables: {
        teacherEmail: me.email,
        studentId: id,
        role: null,
      },
    });
  };

  return (
    <BasicContainer menuItem={false}>
      <SBackMenuBtn onClick={onClickBackBtn}>
        <IoArrowBackSharp />
      </SBackMenuBtn>
      <Container>
        <Title>1인1역</Title>
        <ListIcon>
          <ListName>{students?.seeStudentList[0].listName}</ListName>
        </ListIcon>
        <FormContainer>
          {studentList?.seeStudentList.length === 0 ? (
            <ListBtn onClick={() => createNewList()}>새로운 명렬표 만들기</ListBtn>
          ) : (
            studentList?.seeStudentList?.map((list) => (
              <ListBtn key={list.listId} listId={list.listId} selected={selectedList} onClick={() => onClickListBtn(list.listId)}>
                {list.listName}
              </ListBtn>
            ))
          )}
        </FormContainer>
        <RoleContainer>
          {students?.seeStudentList[0]?.students.length
            ? students?.seeStudentList[0]?.students.map((data) => (
                <RoleForm key={data._id} onSubmit={(e) => onSubmit(e, data._id)}>
                  {data.studentName}
                  <RoleInput studentId={data._id} type="text" defaultValue={data.role} />
                  <SaveBtn type="submit">저장</SaveBtn>
                  <DelBtn type="button" onClick={(e) => deleteRole(e, data._id)}>
                    삭제
                  </DelBtn>
                </RoleForm>
              ))
            : "등록된 학생이 없습니다."}
        </RoleContainer>
      </Container>
      {isPopup === "seeStudentList" && <StudentList page="managingRoles" />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
      {(studentsLoading || listLoading || roleLoading) && <Loading page="center" />}
      {(studentsError || listError || roleError) && window.alert("에러가 발생했습니다. 다시 시도해주세요.")}
    </BasicContainer>
  );
};

export default ManagingRoles;
