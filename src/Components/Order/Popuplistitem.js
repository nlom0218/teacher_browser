import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useForm } from "react-hook-form";
import PopupListItemValue from "./PopupListItemValue";

const PopupListItem = ({ itemObj, modifyListArray }) => {
  const [errMsg, setErrMsg] = useState(undefined);
  const { register, handleSubmit, setValue } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { name } = data;
    const existName = itemObj.list.filter((item) => item === name);
    if (existName.length !== 0) {
      setErrMsg("동일한 이름이 있습니다.");
      return;
    }
    const newItemObjList = [...itemObj.list, name];
    modifyListArray(itemObj?.listName, newItemObjList, "changedListItem");
    setValue("name", "");
  };

  const onClickResetBtn = () => {
    const newItemObjList = [];
    modifyListArray(itemObj?.listName, newItemObjList, "changedListItem");
  };

  const onChangeInput = () => {
    setErrMsg(undefined);
  };
  //리스트를 불러올 때 저장된 목록이 없으면 목록 없다고 뜸.
  //리스트값이 0이 아니면 몇명인지, 리스트 명단 불러옴.
  //학생 이름을 수정, 삭제, 초기화가 가능함. 수정할 때 같은 이름은 에러 메세지 뜸.
  return (
    <div>
      <div>{itemObj.listName}</div>
      {itemObj.list?.length === 0 ? (
        <div>{itemObj?.listName}에 저장된 목록이 없습니다.</div>
      ) : (
        <div>
          (총 {itemObj.list?.length} 명)
          {itemObj.list?.map((item, index) => {
            return (
              <PopupListItemValue
                item={item}
                key={index}
                modifyListArray={modifyListArray}
                itemObj={itemObj}
              />
            );
          })}
        </div>
      )}
      {itemObj.listName !== "학생목록" && (
        <React.Fragment>
          <div onClick={onClickResetBtn}>초기화🗑</div>
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
        </React.Fragment>
      )}
    </div>
  );
};
export default PopupListItem;
