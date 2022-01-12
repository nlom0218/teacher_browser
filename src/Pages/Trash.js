import { useQuery } from '@apollo/client';
import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import { SEE_ALL_STUDENT_QUERY } from '../Graphql/Student/query';

const Trash = () => {
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: {
      trash: true
    }
  })
  console.log(data);
  return (<BasicContainer menuItem={true}>
    휴지통입니다.
  </BasicContainer>);
}

export default Trash;