import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";

const PopupListItem = ({ itemObj, modifyListArray }) => {
  const [errMsg, setErrMsg] = useState(undefined);
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { name } = data;
    const existName = itemObj.list.filter((item) => item === name);
    console.log(existName);
    if (existName.length !== 0) {
      setErrMsg("동일한 이름이 있습니다.");
      return;
    }
    const newItemObjList = [...itemObj.list, name];

    modifyListArray(itemObj?.listName, newItemObjList);
    setValue("name", "");
  };
  const onClickDelBtn = (name) => {
    const newItemObjList = itemObj.list.filter((item) => item !== name);

    modifyListArray(itemObj?.listName, newItemObjList);
  };
  const onClickResetBtn = () => {
    const newItemObjList = [];
    modifyListArray(itemObj?.listName, newItemObjList);
  };

  const onChangeInput = () => {
    setErrMsg(undefined);
  };
  return (
    <div>
      <div>{itemObj.listName}</div>
      {itemObj.list?.length === 0 ? (
        <div>{itemObj?.listName}에 저장된 목록이 없습니다.</div>
      ) : (
        <ul>
          {itemObj.list?.map((item, index) => {
            return (
              <li key={index} style={{ display: "flex" }}>
                {item}
                <div
                  style={{ marginLeft: "10px" }}
                  onClick={() => onClickDelBtn(item)}
                >
                  제거
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div onClick={onClickResetBtn}>초기화</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name", { required: true, onChange: onChangeInput })}
          placeholder="이름을 입력해 주세요."
          type="text"
          autoComplete="off"
        />
        <input type="submit" />
      </form>
      {errMsg && <div>{errMsg}</div>}
    </div>
  );
};
export default PopupListItem;
