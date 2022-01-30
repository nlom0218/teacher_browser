// 리액트
import React from "react";

// 그래프큐엘
import { useQuery } from "@apollo/client";

const TabBar = ({ studentList, setSelectedListId }) => {
  function onClickTabHandle(e) {
    const listId = e.target.id;
    setSelectedListId(listId);
  }

  return (
    <>
      {studentList.map((obj) => (
        <button key={obj.listOrder} id={obj.listId} onClick={onClickTabHandle}>
          {obj.listName}
        </button>
      ))}
    </>
  );
};

export default TabBar;
