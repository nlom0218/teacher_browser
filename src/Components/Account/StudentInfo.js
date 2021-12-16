import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import RegisterContainer from './RegisterContainer';
import StudentInfoItem from './StudentInfoItem';
import AddStudent from "./AddStudent"

export const SEE_ALL_STUDENT_QUERY = gql`
    query SeeAllStudent {
    seeAllStudent {
      _id
      teacherEmail
      name
      order
    }
  }
`

const StudentList = styled.div`
  display: grid;
`

const StudentInfo = ({ setRegisterPage, userEmail }) => {
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY)
  useEffect(() => {
    if (data?.seeAllStudent.length === 0) {
      setRegisterPage(undefined)
    }
  }, [data])
  return (<RegisterContainer setRegisterPage={setRegisterPage}>
    {!loading && <StudentList>
      {data?.seeAllStudent.map((item, index) => {
        return <StudentInfoItem key={index} name={item.name} id={item._id} order={item.order} userEmail={userEmail} />
      })}
    </StudentList>}
    <AddStudent userEmail={userEmail} />
  </RegisterContainer>);
}

export default StudentInfo;