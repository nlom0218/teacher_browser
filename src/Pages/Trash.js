import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import { SEE_ALL_STUDENT_QUERY } from '../Graphql/Student/query';

const Container = styled.div`
  padding: 60px;
  padding: 3.75rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
`

const Student = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 20px;
  column-gap: 20px;
`


const Trash = () => {
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      trash: true
    }
  })
  console.log(data);
  return (<BasicContainer menuItem={true}>
    <Container>
      <Title>휴지통</Title>
      <Student>
        {data?.seeAllStudent?.map((item, index) => {
          return <div key={index}>{item.studentName}</div>
        })}
        {data?.seeAllStudent?.map((item, index) => {
          return <div key={index}>{item.studentName}</div>
        })}
        {data?.seeAllStudent?.map((item, index) => {
          return <div key={index}>{item.studentName}</div>
        })}
        {data?.seeAllStudent?.map((item, index) => {
          return <div key={index}>{item.studentName}</div>
        })}
        {data?.seeAllStudent?.map((item, index) => {
          return <div key={index}>{item.studentName}</div>
        })}
      </Student>
    </Container>
  </BasicContainer>);
}

export default Trash;