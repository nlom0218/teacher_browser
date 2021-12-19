import React from "react";
import { useForm } from "react-hook-form";

const PopupListItemValue = ({ item, modifyListArray, itemObj }) => {
  console.log(item);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: { newItemName: item },
  });

  const onClickDelBtn = (name) => {
    const newItemObjList = itemObj.list.filter((item) => item !== name);

    modifyListArray(itemObj?.listName, newItemObjList, "changedListItem");
  };
  const onSubmit = (data) => {
    const { newItemName } = data;
    const existName = itemObj.list.filter((item) => item === newItemName); // 같은 이름이 없으면 => [] /같은 이름이 있으면 => [하나]
    if (existName.length !== 0) {
      return;
    }
    const newItemObjList = itemObj.list.map((name) => {
      if (name === item) {
        return newItemName;
      } else {
        return name;
      }
    });
    modifyListArray(itemObj?.listName, newItemObjList, "changedListItem");
  };
  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("newItemName", {
          required: true,
        })}
      />
      <div style={{ marginLeft: "10px" }} onClick={() => onClickDelBtn(item)}>
        제거
      </div>
    </form>
  );
};

export default PopupListItemValue;
