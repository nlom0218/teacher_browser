import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../List/AllList";
import StudentListItem from "./StudentListItem";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display : grid;
  grid-template-columns : repeat(4, 1fr);
  column-gap : 20px;
  column-gap : 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  jutify-items : center;
`

 const StudentList = () => {
   const {id} = useParams()
   console.log(id);
  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY)
  console.log(data);
  return (<PopupContainer>
    <Container>
      {data?.seeStudentList.map((item, index) => {
        return <StudentListItem key={index} item={item}/>
      })}
    </Container>
  </PopupContainer>
  );
};

export default StudentList;
