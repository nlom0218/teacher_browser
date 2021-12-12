import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import RegisterContainer from './RegisterContainer';
import StudentInfoItem from './StudentInfoItem';

export const SEE_ALL_STUDENT_QUERY = gql`
    query SeeAllStudent {
    seeAllStudent {
      _id
      teacherEmail
      name
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
        return <StudentInfoItem key={index} name={item.name} id={item._id} userEmail={userEmail} />
      })}
    </StudentList>}
  </RegisterContainer>);
}

export default StudentInfo;