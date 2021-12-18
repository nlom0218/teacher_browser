import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

const PopupListItem = ({ itemObj, setItemObj, modifyListArray }) => {
  console.log(itemObj);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { name } = data;
    const newItemObjList = [...itemObj.list, name];
    const newItemObj = {
      order: itemObj.order,
      listName: itemObj.listName,
      list: newItemObjList,
    };
    setItemObj(newItemObj);
    modifyListArray(itemObj?.listName, newItemObj);
  };
  return (
    <div>
      <div>{itemObj.listName}</div>
      {itemObj.list?.length === 0 ? (
        <div>{itemObj?.listName}에 저장된 목록이 없습니다.</div>
      ) : (
        <ul>
          {itemObj.list?.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true })}
          placeholder="이름을 입력해 주세요."
          type="text"
          autoComplete="off"
        />
        <input type="submit" />
      </form>
    </div>
  );
};
export default PopupListItem;
