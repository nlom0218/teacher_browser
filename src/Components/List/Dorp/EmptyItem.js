import { useMutation } from "@apollo/client";
import React from "react";
import { useDrop } from "react-dnd";
import { EDIT_STUDENT_LIST_ORDER } from "../../../Graphql/StudentList/mutation";
import { SEE_ALL_STUDENT_LIST_QUERY } from "../../../Graphql/StudentList/query";
import useMe from "../../../Hooks/useMe";

const EmptyItem = ({ moveStudentList, index, listOrder, studentList, setSudentList }) => {
  const me = useMe();
  const [editStudentList, { loading }] = useMutation(EDIT_STUDENT_LIST_ORDER, {
    refetchQueries: [{ query: SEE_ALL_STUDENT_LIST_QUERY }],
  });

  // 학생을 리스트에 추가하기 위한 drop
  const [_, drop] = useDrop({
    accept: "LIST",

    // drop을 하게 되면 아래의 로직이 실행된다.
    drop: (item) => {
      const { listOrder: draggedOrder, index: draggedIndex, listId } = item;

      // 기존 studentList에서 변경되는 리스트의 인덱스
      const fromIndex = studentList.findIndex((item) => item.listOrder === draggedOrder);

      // 기존 studentList에서 변경되는 리스트가 앞으로 차지하게 될 자리의 인덱스
      const toIndex = index;

      let newStudentList = [...studentList];
      newStudentList.splice(fromIndex, 1, { listOrder: draggedOrder });
      newStudentList.splice(toIndex, 1, { ...studentList[fromIndex], listOrder });
      setSudentList(newStudentList);
      editStudentList({
        variables: {
          teacherEmail: me?.email,
          listId,
          listOrder,
        },
      });
    },

    hover: (item) => {},
  });
  return <div ref={drop}></div>;
};

export default EmptyItem;
