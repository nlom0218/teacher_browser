import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { SEE_ALL_STUDENT_QUERY } from "../Account/StudentInfo";

import PopupListItem from "./Popuplistitem";
import PopupListName from "./Popuplistname";

const PopupList = () => {
  const [listArray, setListArray] = useState(
    JSON.parse(localStorage.getItem("orderList"))
  ); // 각각 리스트 보내기
  const [itemObj, setItemObj] = useState({}); // 각각 리스트 안에 있는 배열 보내기
  //compare => 재사용 가능한 함수로 만들기(export하기)
  const [studentList, setStudentList] = useState([]);
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY);
  const compare = (key) => {
    return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
  };

  const modifyListArray = (name, changedItemList, type) => {
    const newItemObj =
      type === "changedListName"
        ? changedItemList
        : {
            order: itemObj.order,
            listName: itemObj.listName,
            list: changedItemList,
          };
    const existItem = listArray.filter((item) => item.listName !== name);
    const newListArray = [...existItem, newItemObj].sort(compare("order"));
    setItemObj(newItemObj);
    setListArray(newListArray);
    localStorage.setItem("orderList", JSON.stringify(newListArray));
  };

  const onClickListName = (name) => {
    if (name !== "studentList") {
      const selectedItem = listArray.filter((item) => item.listName === name);
      setItemObj(...selectedItem);
    } else {
      const newItemObj = { listName: "학생목록", list: studentList };
      setItemObj(newItemObj);
    }
  };

  useEffect(() => {
    const orderList = localStorage.getItem("orderList");
    if (!orderList) {
      const initList = [
        { order: 1, listName: "리스트1", list: [] },
        { order: 2, listName: "리스트2", list: [] },
        { order: 3, listName: "리스트3", list: [] },
        { order: 4, listName: "리스트4", list: [] },
      ];
      localStorage.setItem("orderList", JSON.stringify(initList));
      setListArray(initList);
    }
  }, []);
  useEffect(() => {
    if (loading) {
      return;
    }
    const myStuentList = data.seeAllStudent.map((item) => item.name);
    setStudentList(myStuentList);
    setItemObj({ listName: "학생목록", list: myStuentList });
  }, [data]);

  return (
    <div>
      <div
        onClick={() => {
          onClickListName("studentList");
        }}
      >
        학생명단
      </div>
      {listArray?.map((item, index) => {
        return (
          <PopupListName
            key={index}
            item={item}
            onClickListName={onClickListName}
            modifyListArray={modifyListArray}
          />
        );
      })}
      <PopupListItem
        itemObj={itemObj}
        modifyListArray={modifyListArray}
        listArray={listArray}
      />
    </div>
  );
};

export default PopupList;
