import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';

const SEE_STUDENT_LIST_QUERY = gql`
  query SeeStudentList {
    seeStudentList {
      listId
      listOrder
      listName
    }
  }
`

const Conatiner = styled.div`
  min-height: 100%;
  padding: 40px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
`

const AddIcon = styled.div`
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
  }
`

const AllList = () => {
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
  console.log(data);
  return (<Conatiner>
    <AddIcon><FcPlus /></AddIcon>
  </Conatiner>);
}

export default AllList;