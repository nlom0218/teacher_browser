import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { FcList, FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import ListItem from './ListItem';
import PopupCreateList from './PopupCreateList';

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
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
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
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
  const onClickAddIcon = () => inPopup("createList")
  return (<Conatiner>
    {data?.seeStudentList?.map((item, index) => {
      return <ListItem key={index} listName={item?.listName} />
    })}
    <AddIcon onClick={onClickAddIcon}><FcPlus /></AddIcon>
    {isPopup === "createList" && <PopupCreateList />}
  </Conatiner>);
}

export default AllList;