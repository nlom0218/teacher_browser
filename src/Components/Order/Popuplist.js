import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import PopupContainer from "./PopupContainer";
import styled from "styled-components";
import PopupListItem from "./Popuplistitem";
import PopupListName from "./Popuplistname";
import { SEE_ALL_STUDENT_QUERY } from "../../Graphql/Student/query";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  text-align: center;
  .listName {
    padding: 16px 0px;
    padding: 1rem 0rem;
    :first-child {
      border-top-left-radius: 10px;
      border-top-left-radius: 0.625rem;
    }
    :last-child {
      border-top-right-radius: 10px;
      border-top-right-radius: 0.625rem;
    }
  }
  form {
    width: 100%;
  }
  input {
    max-width: 125px;
    //균등 5분할
  }
`;
const StudeuntListName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) => (props.selectedList ? props.theme.bgColor : props.theme.btnBgColor)};
  color: ${(props) => (props.selectedList ? props.theme.fontColor : props.theme.bgColor)};
  transition: background-color 1s ease, color 1s ease;
`;

const PopupList = ({ setPopup }) => {
  const [listArray, setListArray] = useState(JSON.parse(localStorage.getItem("orderList"))); // 각각 리스트 보내기
  const [itemObj, setItemObj] = useState({}); // 각각 리스트 안에 있는 배열 보내기
  const [studentList, setStudentList] = useState([]);

  // 정렬 방법, 휴지통에 있는 학생은 제외하게 만들기
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY);
  const [selectedList, setSelectedList] = useState("학생목록");
  //compare 리스트 순서 유지 => 재사용 가능한 함수로 만들기(export하기)
  const compare = (key) => {
    return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
  };
  //바뀐 리스트가 있으면 교체
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
  //리스트 이름 변경하기
  const onClickListName = (name) => {
    setSelectedList(name);
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
  //리스트가 나오고 리스트명을 클릭하면 해당 리스트를 불러옴.
  //리스트명과 리스트 내 명단 이름 변경/삭제가 가능하도록 불러옴.
  return (
    <PopupContainer setPopup={setPopup}>
      <Container>
        <StudeuntListName
          selectedList={itemObj.listName === "학생목록"}
          className="listName"
          onClick={() => {
            onClickListName("studentList");
          }}
        >
          학생목록
        </StudeuntListName>
        {listArray?.map((item, index) => {
          return (
            <PopupListName
              key={index}
              item={item}
              onClickListName={onClickListName}
              modifyListArray={modifyListArray}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          );
        })}
      </Container>
      <PopupListItem itemObj={itemObj} modifyListArray={modifyListArray} listArray={listArray} />
    </PopupContainer>
  );
};

export default PopupList;
