import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
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

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  height: 100%;
  max-height: 100%;
  padding: 40px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr; 
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

const AllList = ({ someDragging }) => {
  const [studentList, setSudentList] = useState(undefined)
  const isPopup = useReactiveVar(isPopupVar)
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
  const onClickAddIcon = () => inPopup("createList")
  const moveStudentList = (sutdentListOrder, toIndex) => {
    const index = studentList.indexOf(sutdentListOrder)
    let newStudnetList = [...studentList]
    newStudnetList.splice(index, 1);
    newStudnetList.splice(toIndex, 0, studentList[index])
    setSudentList(newStudnetList)
  }
  useEffect(() => {
    if (data) {
      setSudentList(data.seeStudentList)
    }
  }, [data])
  return (<Container>
    {studentList && studentList.map((item, index) => {
      return <ListItem
        key={index}
        listName={item?.listName}
        index={index}
        listOrder={item?.listOrder}
        moveStudentList={moveStudentList}
        listId={item?.listId}
        someDragging={someDragging}
      />
    })}
    <AddIcon onClick={onClickAddIcon}><FcPlus /></AddIcon>
    {isPopup === "createList" && <PopupCreateList />}
  </Container>);
}

export default AllList;