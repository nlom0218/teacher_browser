import React, { useEffect } from "react";
import styled from "styled-components";
import { SelectAudioContainer, SettingTitle } from "../styled/PopupStyled";

const DelBtn = styled.div`
  cursor: pointer;
  column-gap: 5px;
  column-gap: 0.3125rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
`;

const MemoInput = styled.input`
  grid-column: 1 / -1;
  background-color: ${(props) => props.theme.originBgColor};
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  ::placeholder {
    opacity: 0.8;
  }
`;

const MemoSettingLayout = ({ register, setValue, timerMemo, setTimerMemo }) => {
  const onClickDelBtn = () => {
    localStorage.removeItem("timerMemo");
    setValue("timerMemo", "");
    setTimerMemo(undefined);
  };

  useEffect(() => {
    if (timerMemo) {
      setValue("timerMemo", timerMemo);
    }
  }, []);

  return (
    <SelectAudioContainer>
      <SettingTitle>메모</SettingTitle>
      <DelBtn onClick={onClickDelBtn}>삭제하기</DelBtn>
      <MemoInput
        {...register("timerMemo")}
        maxLength={20}
        placeholder="메모를 입력하세요. 메모는 최대 20자까지 가능합니다."
        autoComplete="off"
      />
    </SelectAudioContainer>
  );
};

export default MemoSettingLayout;
