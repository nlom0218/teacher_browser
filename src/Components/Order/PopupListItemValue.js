import React from "react";
import { useForm } from "react-hook-form";

const PopupListItemValue = ({ item, modifyListArray, itemObj }) => {
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  setValue("newItemName", item);

  const onClickDelBtn = (name) => {
    const newItemObjList = itemObj.list.filter((item) => item !== name);

    modifyListArray(itemObj?.listName, newItemObjList, "changedListItem");
  };
  const onSubmit = (data) => {
    const { newItemName } = data;
    const existName = itemObj.list.filter((item) => item === newItemName);
    // 같은 이름이 없으면 => [] /같은 이름이 있으면 => [하나] : 동일 이름 발생되지 않도록 함.
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
  //리스트 불러오는데 기존 학생목록에 있는 것은 읽기만 가능함.
  //로컬 저장소에서 불러온 학생목록은 추가, 수정, 삭제, 초기화가 가능함.
  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("newItemName", {
          required: true,
        })}
        type="text"
        autoComplete="off"
        readOnly={itemObj.listName === "학생목록"}
      />
      {itemObj.listName !== "학생목록" && (
        <div style={{ marginLeft: "10px" }} onClick={() => onClickDelBtn(item)}>
          제거
        </div>
      )}
    </form>
  );
};

export default PopupListItemValue;
