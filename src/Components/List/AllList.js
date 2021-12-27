import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import CreateList from './CreateList';

export const SEE_STUDENT_LIST_QUERY = gql`
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
  grid-template-rows: 1fr 1fr 1fr 1fr; 
  align-items: center;
  justify-items: center;
`

const AddIcon = styled.div`
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
  }
`

const AllList = () => {
  const isPopup = useReactiveVar(isPopupVar)
  console.log(isPopup);
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
  const onClickAddIcon = () => inPopup("createList")
  console.log(data);
  return (<Conatiner>
    {data?.seeStudentList?.map((item, index) => {
      return <div>{item.listName}</div>
    })}
    <AddIcon onClick={onClickAddIcon}><FcPlus /></AddIcon>
    {isPopup === "createList" && <CreateList />}
  </Conatiner>);
}

export default AllList;