import { useQuery, useReactiveVar } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';
import { SEE_ALL_STUDENT_LIST_QUERY } from '../../Graphql/StudentList/query';
import { customMedia } from '../../styles';
import EmptyItem from './Dorp/EmptyItem';
import Trash from './Dorp/Trash';
import ListItem from './ListItem';
import PopupCreateList from './Popup/CreateList';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, minmax(120px, 1fr)); 
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    `}
  ${customMedia.greaterThan("desktop")`
    padding: 0px;
  `}
`

const AddIcon = styled.div`
  align-self: center;
  justify-self: center;
  cursor: pointer;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const AllList = ({ someDragging, setSuccessMsg, setSomeDragging, successMsg, selectedTag, selectedSort, setDragType, dragType }) => {
  // 학생 리스트가 아니라 명렬표임!!!
  const [studentList, setSudentList] = useState(undefined)

  const isPopup = useReactiveVar(isPopupVar)
  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY)
  const onClickAddIcon = () => inPopup("createList")

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
          listId={item?.listId}
          listIcon={item?.listIcon}
          someDragging={someDragging}
          setSuccessMsg={setSuccessMsg}
          setSomeDragging={setSomeDragging}
          setDragType={setDragType}
        />
      } else {
        return <EmptyItem
          key={index}
          index={index}
          listOrder={item?.listOrder}
          studentList={studentList}
          setSudentList={setSudentList}
        />
      }
    })}
    <AddIcon onClick={onClickAddIcon}><FcPlus /></AddIcon>
    <Trash someDragging={someDragging} setSuccessMsg={setSuccessMsg} successMsg={successMsg} selectedTag={selectedTag} selectedSort={selectedSort} dragType={dragType} />
    {isPopup === "createList" && <PopupCreateList />}

  </Container>);
}

export default AllList;