import { useQuery } from "@apollo/client";
import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import StudentListItem from "./StudentListItem";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";

const Container = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 30px;
  row-gap: 1.875rem;
  justify-items: center;
`;

const StudentList = () => {
  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);

return (
    <PopupContainer>
         {/* { data == undefined ? <div> 로그인을 해서 명단 등록 안내 메세지, 일회성 명단 input 화면하는 건 어떨지 </div> : } */}
      <Container>
      <div>학생명단입력 </div>
        <input></input>
        {data?.seeStudentList.map((item, index) => {
          return <StudentListItem key={index} item={item} />;
        })}
      </Container>
    </PopupContainer>
  );
};

export default StudentList;
