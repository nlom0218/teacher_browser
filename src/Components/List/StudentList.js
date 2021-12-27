import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import { color } from '../../styles';
import AddStudent from './AddStudent';
import StudentItem from './StudentItem';

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
  padding: 20px;
  padding: 1.25rem;
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
  align-self: flex-start;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  .noStudnet {
    text-align: center;
    color: ${props => props.theme.redColor};
    transition: color 1s ease;
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
  console.log(data);
  const onClickAddBtn = () => inPopup()
  return (<StudentContainer>
    <SStudentList>
      {data?.seeAllStudent?.length === 0 ?
        <div className="noStudnet">생성된 학생이 없습니다.</div>
        :
        data?.seeAllStudent?.map((item, index) => {
          return <StudentItem key={index} item={item} />
        })}
    </SStudentList>
    <AddStudentBtn onClick={onClickAddBtn}><FcPlus /></AddStudentBtn>
    {isPopup && <AddStudent />}
  </StudentContainer>);
}

export default StudentList;