import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
  background-color: ${(props) =>
    props.selectedList ? props.theme.bgColor : props.theme.btnBgColor};
  color: ${(props) =>
    props.selectedList ? props.theme.fontColor : props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
`;

const PopupListName = ({
  item,
  onClickListName,
  modifyListArray,
  selectedList,
  setSelectedList,
}) => {
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
    setSelectedList(newListName);
  };

  return (
    <Form
      onClick={() => {
        onClickListName(item.listName);
      }}
      onSubmit={handleSubmit(onSubmit)}
      selectedList={selectedList === item.listName}
      className="listName"
    >
      <input
        {...register(`newListName`, {
          required: true,
        })}
        type="text"
        autoComplete="off"
      />
    </Form>
  );
};
export default PopupListName;
