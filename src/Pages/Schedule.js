import React, { useMemo, useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { inPopup, isPopupVar } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { useForm } from "react-hook-form";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import TimeTableFont from "../Components/Schedule/TimeTableFont";
import { useReactiveVar } from "@apollo/client";
import ClassRegisterPage from "../Components/Schedule/Popup/ClassRegisterPage";
import PrintScheduleContents from "../Components/Schedule/Popup/PrintScheduleContents";
import { useRef } from "react";
import TimeTableTitle from "../Components/Schedule/TimeTableTitle";
import ClassTimeSet from "../Components/Schedule/Popup/ClassTimeSet";
import { scheduleTime, timeSetData } from "../Components/Schedule/ScheduleData";
import { timeSetCal } from "../Components/Schedule/TimeSetCal";
import ScheduleForm from "../Components/Schedule/ScheduleForm";
import TimeRegisterPage from "../Components/Schedule/Popup/TimeRegisterPage";
import useTitle from "../Hooks/useTitle";

// 시간 설정해야 하는 기초값 데이터베이스에 있는거 연결하기
const basic = timeSetData;
const timeList = scheduleTime[0];

//수업정보를 어떻게 받아서 전달????
//음영한 뒤 다크모드에서 글씨 안 보임.
//수업추가 어떻게?

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
`;

const OptionContents = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 10px;
  column-gap: 0ch.625rem;
  text-align: center;
  grid-template-columns: auto auto 1fr;
`;
const OptionBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const TypeBtn = styled.div`
  align-self: flex-end;
  cursor: pointer;
  display: flex;
  svg {
    margin-right: 5px;
    margin-right: 0.3125rem;
    display: flex;
  }
`;

const Schedule = () => {
  const titleUpdataer = useTitle("티처캔 | 시간표");
  const isPopup = useReactiveVar(isPopupVar);
  const media = useMedia();
  const componentRef = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("우리반 시간표");
  const [fontSize, setFontSize] = useState(1.25);
  const [viewTime, setViewTime] = useState(false);
  const [timeSet, setTimeSet] = useState(basic);

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });

  const onClickTimeSetBtn = () => {
    inPopup("registerTimeSet");
  };

  const onClickTimeviewBtn = () => {
    setViewTime(!viewTime);
  };
  return (
    <BasicContainer menuItem={true} screen="small">
      <Container>
        <TimeTableTitle title={title} setTitle={setTitle} />
        <OptionContents>
          <OptionBtn onClick={onClickTimeSetBtn}> 시간설정 </OptionBtn>
          <TypeBtn onClick={onClickTimeviewBtn}>
            {" "}
            {viewTime === true ? (
              <RiCheckboxLine />
            ) : (
              <RiCheckboxBlankLine />
            )}{" "}
            <div> 시간 보기 </div>
          </TypeBtn>
          {media !== "Mobile" && (
            <TimeTableFont fontSize={fontSize} setFontSize={setFontSize} />
          )}
        </OptionContents>
        <ScheduleForm
          timeResult={timeList}
          fontSize={fontSize}
          setFontSize={setFontSize}
          viewTime={viewTime}
          setViewTime={setViewTime}
        />
      </Container>

      {isPopup === "registerClass" && <ClassRegisterPage />}
      {isPopup === "registerTime" && <TimeRegisterPage />}
      {isPopup === "registerTimeSet" && (
        <ClassTimeSet timeSet={timeSet} setTimeSet={setTimeSet} />
      )}
      {isPopup === "print" && (
        <PrintScheduleContents
          printRef={componentRef}
          title={title}
          viewTime={viewTime}
          timeResult={timeList}
        />
      )}
    </BasicContainer>
  );
};

export default Schedule;
