import { useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../../apollo";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../Graphql/StudentList/query";
import IcHelper from "../../icons/Helper/IcHelper";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import EmptyItem from "./Dorp/EmptyItem";
import Trash from "./Dorp/Trash";
import ListItem from "./ListItem";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: repeat(4, minmax(120px, 1fr));  */
  grid-template-rows: repeat(8, 1fr);
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  padding: 20px;
  padding: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    `}
  ${customMedia.greaterThan("desktop")`
    padding: 0px;
  `}
`;

const AddIcon = styled.div`
  align-self: center;
  justify-self: center;
  cursor: pointer;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`;

const HelpIcon = styled.div`
  align-self: center;
  justify-self: center;
  cursor: pointer;
  svg {
    font-size: 3em;
    font-size: 3rem;
  }
`;

const AllList = ({
  someDragging,
  setSuccessMsg,
  setErrorMsg,
  setSomeDragging,
  selectedTag,
  selectedSort,
  setDragType,
  dragType,
  me,
}) => {
  // 학생 리스트가 아니라 명렬표임!!!
  const [studentList, setSudentList] = useState(undefined);

  const { data, loading } = useQuery(SEE_ALL_STUDENT_LIST_QUERY);
  const onClickAddIcon = () => {
    if (data?.seeStudentList.length === 10) {
      setErrorMsg("명렬표는 최대 10개까지 생성 가능합니다. 😅");
    } else if (me) {
      inPopup("createList");
    } else {
      inPopup("needLogin");
    }
  };

  useEffect(() => {
    if (data) {
      const initStudentList = [];
      for (let order = 1; order < 14; order++) {
        const existStudentList = data?.seeStudentList.filter(
          (item) => item.listOrder === order
        )[0];
        if (existStudentList) {
          initStudentList.push(existStudentList);
        } else {
          initStudentList.push({ listOrder: order });
        }
      }
      setSudentList(initStudentList);
    }
  }, [data]);

  if (loading) {
    return <Loading page="subPage" />;
  }
  return (
    <Container>
      {studentList &&
        studentList.map((item, index) => {
          if (item?.listId) {
            return (
              <ListItem
                key={index}
                listName={item?.listName}
                index={index}
                listOrder={item?.listOrder}
                listId={item?.listId}
                listIcon={item?.listIcon}
                someDragging={someDragging}
                setSuccessMsg={setSuccessMsg}
                setErrorMsg={setErrorMsg}
                setSomeDragging={setSomeDragging}
                setDragType={setDragType}
              />
            );
          } else {
            return (
              <EmptyItem
                key={index}
                index={index}
                listOrder={item?.listOrder}
                studentList={studentList}
                setSudentList={setSudentList}
              />
            );
          }
        })}
      <HelpIcon>
        <IcHelper />
      </HelpIcon>
      <AddIcon onClick={onClickAddIcon}>
        <FcPlus />
      </AddIcon>
      <Trash
        someDragging={someDragging}
        setSuccessMsg={setSuccessMsg}
        selectedTag={selectedTag}
        selectedSort={selectedSort}
        dragType={dragType}
      />
    </Container>
  );
};

export default AllList;
