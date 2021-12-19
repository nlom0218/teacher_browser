import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

const PopupListName = ({ item, onClickListName, modifyListArray }) => {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      newListName: item.listName,
    },
  });

  const onSubmit = (data) => {
    const { newListName } = data;
    const newItemObjList = { ...item, listName: newListName };
    modifyListArray(item.listName, newItemObjList, "changedListName");
  };

  return (
    <form
      onClick={() => {
        onClickListName(item.listName);
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register(`newListName`, {
          required: true,
        })}
        type="text"
        autoComplete="off"
      />
    </form>
  );
};
export default PopupListName;
