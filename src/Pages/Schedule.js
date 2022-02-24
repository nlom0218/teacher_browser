import React, { useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { inPopup, isPopupVar, outPopup } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import TimeTableFont from "../Components/Schedule/TimeTableFont";
import { useReactiveVar } from "@apollo/client";
import ClassRegisterPage from "../Components/Schedule/Popup/ClassRegisterPage";
import PrintScheduleContents from "../Components/Schedule/Popup/PrintScheduleContents";
import { useRef } from "react";
import TimeTableTitle from "../Components/Schedule/TimeTableTitle";
import ClassTimeSet from "../Components/Schedule/Popup/ClassTimeSet";
import TimeRegisterPage from "../Components/Schedule/Popup/TimeRegisterPage";
import useTitle from "../Hooks/useTitle";
import useMe from "../Hooks/useMe";
import ScheduleForm from "../Components/Schedule/ScheduleForm";
import { useQuery } from "@apollo/client";
import { GET_TIMETABLE_TIME_QUERY } from "../Graphql/TimeTable/query";
import { GET_TIMETABLE_DATA_QUERY } from "../Graphql/TimeTable/query";
import { customMedia } from "../styles";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 40px;
  padding: 2.5rem;
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
  const [timeResult, setTimeResult] = useState([]);
  const [timetableTime, setTimetableTime] = useState([]);
  const {
    data: timetableData,
    loading: timetableLoading,
    error: timetableError,
  } = useQuery(GET_TIMETABLE_DATA_QUERY);

  const { data, loading, error } = useQuery(GET_TIMETABLE_TIME_QUERY, {
    onCompleted: ({ getTimetableTime: data }) => {
      setTimeResult([
        data.start1,
        data.end1,
        data.start2,
        data.end2,
        data.start3,
        data.end3,
        data.start4,
        data.end4,
        data.start5,
        data.end5,
        data.start6,
        data.end6,
      ]);
      setTimetableTime([
        ["1", [data.start1, data.end1]],
        ["2", [data.start2, data.end2]],
        ["3", [data.start3, data.end3]],
        ["4", [data.start4, data.end4]],
        ["5", [data.start5, data.end5]],
        ["6", [data.start6, data.end6]],
      ]);
    },
  });

  const isPopup = useReactiveVar(isPopupVar);
  const media = useMedia();
  const componentRef = useRef(null);
  const me = useMe();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState("우리반 시간표");
  const [fontSize, setFontSize] = useState(1.25);
  const [viewTime, setViewTime] = useState(false);

  const onClickTimeSetBtn = () => {
    inPopup("registerTimeSet");
  };

  const onClickTimeviewBtn = () => {
    setViewTime(!viewTime);
  };
  return (
    <BasicContainer menuItem={true} screen="small">
      <Container>
        <TimeTableTitle setTitle={setTitle} />
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
          fontSize={fontSize}
          setFontSize={setFontSize}
          viewTime={viewTime}
          setViewTime={setViewTime}
          timetableTime={timetableTime}
          setTimetableTime={setTimetableTime}
        />
      </Container>

      {isPopup === "registerClass" && (
        <ClassRegisterPage
          userEmail={me?.email}
          timetableData={timetableData}
        />
      )}
      {isPopup === "registerTime" && (
        <TimeRegisterPage timeResult={timeResult} userEmail={me?.email} />
      )}
      {isPopup === "registerTimeSet" && <ClassTimeSet userEmail={me?.email} />}
      {isPopup === "print" && (
        <PrintScheduleContents
          printRef={componentRef}
          title={title}
          viewTime={viewTime}
          timeResult={timeResult}
        />
      )}
    </BasicContainer>
  );
};

export default Schedule;
