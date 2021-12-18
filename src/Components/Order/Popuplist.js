import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";

const PopupList = () => {
  const [listArray, setListArray] = useState(
    JSON.parse(localStorage.getItem("orderList"))
  );
  // console.log(listArray);
  useEffect(() => {
    const orderList = localStorage.getItem("orderList");
    if (!orderList) {
      const initList = [
        { listName: "리스트1", list: [] },
        { listName: "리스트2", list: [] },
        { listName: "리스트3", list: [] },
        { listName: "리스트4", list: [] },
      ];
      localStorage.setItem("orderList", JSON.stringify(initList));
      setListArray(initList);
    }
  }, []);
  return (
    <div>
      <div>학생명단</div>
      {listArray.map((item, index) => {
        return <div key={index}>{item.listName}</div>;
      })}
    </div>
  );
};

export default PopupList;
