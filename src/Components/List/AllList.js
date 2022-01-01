import { useQuery, useReactiveVar } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { FcEmptyTrash, FcPlus } from 'react-icons/fc';
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
  height: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  padding: 40px;
  padding: 2.5rem;
`

const Layout = styled.div`
  max-height: 100%;
  min-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(4, minmax(120px, 1fr)); 
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

const DelIcon = styled.div`
  align-self: center;
  justify-self: center;
  svg {
    font-size: 2.5rem;
    font-size: 2.5em;
  }
`

const AllList = ({ someDragging, setSuccessMsg, setSomeDragging }) => {
  // 학생 리스트가 아니라 명렬표임!!!
  const [studentList, setSudentList] = useState(undefined)

  const isPopup = useReactiveVar(isPopupVar)
  const { data, loading } = useQuery(SEE_STUDENT_LIST_QUERY)
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
    <Layout>
      {studentList && studentList.map((item, index) => {
        if (item?.listId) {
          return <ListItem
            key={index}
            listName={item?.listName}
            index={index}
            listOrder={item?.listOrder}
            listId={item?.listId}
            someDragging={someDragging}
            setSuccessMsg={setSuccessMsg}
            setSomeDragging={setSomeDragging}
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
      <DelIcon><FcEmptyTrash /></DelIcon>
      {isPopup === "createList" && <PopupCreateList />}
    </Layout>
  </Container>);
}

export default AllList;