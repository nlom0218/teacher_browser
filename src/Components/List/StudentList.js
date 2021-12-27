import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import { color } from '../../styles';
import AddStudent from './AddStudnet';

export const SEE_ALL_STUDENT_QUERY = gql`
  query Query {
    seeAllStudent {
      _id
      teacherEmail
      studentName
      studentOrder
      listId
    } 
  }
`

const StudentContainer = styled.div`
  position: absolute;
  right: 1%;
  top: 2%;
  width: 24%;
  height: 96%;
  min-height: 96%;
  padding: 30px;
  padding: 1.875rem;
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 30px;
  row-gap: 1.875rem;
  background-color: ${props => props.theme.bgColor};
  transition: background-color 1s ease;
  border-radius: 5px;
  border-radius: 0.3125rem;
  box-shadow: ${color.boxShadow};
`

const SStudentList = styled.div`
  height: 100%;
  min-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`

const AddStudentBtn = styled.div`
  justify-self: center;
  font-size: 2.5em;
  font-size: 2.5rem;
  cursor: pointer;
`

const StudentList = () => {
  const isPopup = useReactiveVar(isPopupVar)
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY)
  const onClickAddBtn = () => inPopup()
  return (<StudentContainer>
    <SStudentList>
      {data?.seeAllStudent?.map((item, index) => {
        return <div key={index}>{item.studentName}</div>
      })}
    </SStudentList>
    <AddStudentBtn onClick={onClickAddBtn}><FcPlus /></AddStudentBtn>
    {isPopup && <AddStudent />}
  </StudentContainer>);
}

export default StudentList;