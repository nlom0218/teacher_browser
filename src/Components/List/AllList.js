import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import EmptyItem from './Dorp/EmptyItem';
import ListItem from './ListItem';
import PopupCreateList from './Popup/CreateList';

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
  align-self: center;
  justify-self: center;
  cursor: pointer;
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
  }
`

const AllList = ({ someDragging, setSuccessMsg, setSomeDragging }) => {
  // 학생 리스트가 아니라 명렬표임!!!
  const [studentList, setSudentList] = useState(undefined)
  console.log(studentList);

  const isPopup = useReactiveVar(isPopupVar)
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
  const onClickAddIcon = () => inPopup("createList")

  const moveStudentList = (studentListId, toIndex) => {
    const index = studentList.findIndex((item) => item.listId === studentListId)
    let newStudnetList = [...studentList]
    newStudnetList.splice(index, 1);
    newStudnetList.splice(toIndex, 0, studentList[index])
    setSudentList(newStudnetList)
  }

  useEffect(() => {
    if (data) {
      const initStudentList = []
      for (let order = 1; order < 15; order++) {
        const existStudentList = data?.seeStudentList.filter(item => item.listOrder === order)[0]
        if (existStudentList) {
          initStudentList.push(existStudentList)
        } else {
          initStudentList.push({ listOrder: order })
        }
      }
      setSudentList(initStudentList)
    }
  }, [data])
  return (<Container>
    {studentList && studentList.map((item, index) => {
      if (item?.listId) {
        return <ListItem
          key={index}
          listName={item?.listName}
          index={index}
          listOrder={item?.listOrder}
          moveStudentList={moveStudentList}
          listId={item?.listId}
          someDragging={someDragging}
          setSuccessMsg={setSuccessMsg}
          setSomeDragging={setSomeDragging}
        />
      } else {
        return <EmptyItem
          key={index}
          index={index}
          moveStudentList={moveStudentList}
          listOrder={item?.listOrder}
          studentList={studentList}
          setSudentList={setSudentList}
        />
      }
    })}
    <AddIcon onClick={onClickAddIcon}><FcPlus /></AddIcon>
    {isPopup === "createList" && <PopupCreateList />}
  </Container>);
}

export default AllList;