import React from "react";
import PopupContainer from "../../Shared/PopupContainer";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import StudentListItem from "./StudentListItem";
import { useParams } from "react-router-dom";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";

const Container = styled.div`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display : grid;
  grid-template-columns : repeat(4, 1fr);
  column-gap : 20px;
  column-gap : 1.25rem;
  row-gap : 20px;
  row-gap : 1.25rem;
  justify-items : center;
  text-align: center;
`

const StudentList = ({ setIsShuffle }) => {
  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY)
  return (<PopupContainer>
    <Container>
      {data?.seeStudentList.map((item, index) => {
        return <StudentListItem key={index} item={item} setIsShuffle={setIsShuffle} />
      })}
    </Container>
  </PopupContainer>
  );
};

export default StudentList;
