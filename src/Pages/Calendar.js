import React, { useEffect, useState } from "react";
import {
  format,
  startOfWeek,
  getWeeksInMonth,
  addMonths,
  startOfMonth,
  addDays,
  addWeeks,
  getMonth,
  getDay,
} from "date-fns";
import styled, { keyframes } from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery, useReactiveVar } from "@apollo/client";
import CalendarItem from "../Components/Calendar/CalendarItem";
import AddSchedule from "../Components/Calendar/Popup/AddSchedule";
import { inPopup, isPopupVar } from "../apollo";
import BasicContainer from "../Components/Shared/BasicContainer";
import useMe from "../Hooks/useMe";
import AlertMessage from "../Components/Shared/AlertMessage";
import EditSchedule from "../Components/Calendar/Popup/EditSchedule";
import { useParams } from "react-router";
import useMedia from "../Hooks/useMedia";
import { customMedia } from "../styles";
import CalendarDetail from "../Components/Calendar/CalendarDetail";
import { SEE_SCHEDULE_QUERY } from "../Graphql/Schedule/query";
import Loading from "../Components/Shared/Loading";
import DetailToDo from "../Components/TodoList/Popup/DetailToDo";
import SeeAllergy from "../Components/Lunchmenu/Popup/SeeAllergy";
import MoveStudentPage from "../Components/Calendar/Popup/MoveStudentPage";
import AddAttend from "../Components/Calendar/Popup/AddAttend";
import AttendSelectedStudent from "../Components/Calendar/Popup/AttendSelectedStudent";
import EditAttend from "../Components/Calendar/Popup/EditAttend";
import TodoCreate from "../Components/TodoList/Popup/TodoCreate";
import useTitle from "../Hooks/useTitle";
import IcHelper from "../icons/Helper/IcHelper";
import AddJournal from "../Components/Journal/Popup/AddJournal";
import EditJournal from "../Components/Journal/Popup/EditJournal";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
import CalendarHelper from "../Components/Calendar/Popup/CalendarHelper";
import { SEE_ATTENDANCE_QUERY } from "../Graphql/Attendance/query";
import AttendSortBtn from "../Components/Calendar/AttendSortBtn";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`;

const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 20px;
  padding: 1.25rem;
  padding-bottom: 0px;
  padding-bottom: 0rem;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  .calendar_btn {
    cursor: pointer;
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.btnBgColor};
    transition: color 1s ease, background-color 1s ease;
  }
`;

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  grid-column: 1 / 3;
  align-self: flex-start;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
    font-size: 2em;
    font-size: 2rem;
  `}
`;

const BtnContainer = styled.div`
  grid-template-columns: repeat(4, auto);
  display: grid;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  position: relative;
  ${customMedia.greaterThan("tablet")`
    grid-row: 1 / 2;
    grid-template-columns: repeat(5, auto);
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(6, auto);
  `}
`;

const TodayBtn = styled.div`
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
`;

const Btn = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const HelpIcon = styled.div`
  cursor: pointer;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
    display: flex;
  }
`;

const BottomContainerLayout = styled.div`
  position: relative;
`;

const BottomContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  min-height: 100%;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  padding-top: 0px;
  padding-top: 0rem;
  overflow: ${(props) => (props.notScroll ? "scroll" : "scroll")};
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  ${customMedia.greaterThan("tablet")`
    padding-top: 20px;
    padding-top: 1.25rem;
  `}
`;

const Day = styled.div`
  justify-self: flex-end;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  color: ${(props) => props.sun && props.theme.redColor};
  transition: ${(props) => props.sun && "color 1s ease"};
`;

const CalendarList = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${(props) => `repeat(${props.weekLength}, 1fr)`};
  background-color: ${(props) => props.theme.girdBorderColor};
  border: 1px solid ${(props) => props.theme.girdBorderColor};
  transition: background-color 1s ease, border 1s ease;
  row-gap: 1px;
  column-gap: 1px;
  ${customMedia.greaterThan("tablet")`
    grid-template-rows: ${(props) =>
      `repeat(${props.weekLength}, minmax(100px, auto))`};
    grid-template-rows: ${(props) =>
      `repeat(${props.weekLength}, minmax(6.25rem, auto))`};
  `}
`;

const CalendarType = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  position: relative;
`;

const CalendarTypeBtn = styled.div`
  cursor: pointer;
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  opacity: 0.8;
`;

const MoveRight = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(100%);
  }
`;

const MoveLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const CalendarTypeBackground = styled.div`
  position: absolute;
  left: 0;
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  cursor: pointer;
  animation: ${(props) =>
      props.typeAniInit
        ? "none"
        : props.calendarType === "calendar"
        ? MoveLeft
        : MoveRight}
    1s ease forwards;
  transform: ${(props) =>
    props.typeAniInit && props.calendarType === "calendar"
      ? "translateX(0%)"
      : "translateX(100%)"};
`;

const Calendar = () => {
  const titleUpdataer = useTitle("티처캔 | 달력");
  const { date: urlDate } = useParams();

  const isPopup = useReactiveVar(isPopupVar);
  const media = useMedia();

  const me = useMe();

  const [date, setDate] = useState(
    new Date(localStorage.getItem("calendarDate"))
  );

  const [calendarType, setCalendarType] = useState("calendar");
  const [attendOption, setAttendOption] = useState([]);
  const [selectedAttendOption, setSelectedAttendOption] = useState({
    attend: "전체보기",
    studentName: "전체보기",
  });
  const [typeAniInit, setTypeAniInit] = useState(true);

  const [weekLength, setWeekLength] = useState(1);
  const [dateArr, setDateArr] = useState(undefined);
  const [schedule, setSchedule] = useState(undefined);
  const [errMsg, setErrMsg] = useState(undefined);
  const [msg, setMsg] = useState(undefined);
  const [refetchQuery, setRefetchQuery] = useState(1);

  const { data, loading } = useQuery(SEE_SCHEDULE_QUERY, {
    variables: {
      userEmail: me?.email,
      month: parseInt(format(date, "yyMM")),
    },
    skip: !me,
  });

  const {
    data: attendData,
    loading: attendLoading,
    refetch,
  } = useQuery(SEE_ATTENDANCE_QUERY, {
    variables: {
      month: parseInt(format(date, "yyMM")),
    },
    skip: !me || calendarType === "calendar",
  });

  const onClickTodayBtn = () => {
    const newDate = new Date();
    setDate(newDate);
  };

  const onClickBtn = () => {
    const newDate = addMonths(date, 1);
    localStorage.setItem("calendarDate", newDate);
    setDate(newDate);
  };
  const onClickBtnMinus = () => {
    const newDate = addMonths(date, -1);
    localStorage.setItem("calendarDate", newDate);
    setDate(newDate);
  };

  const onClickPlusBtn = () => {
    if (me) {
      inPopup("addSchedule");
    } else {
      inPopup("needLogin");
    }
  };

  const onClickHelper = () => {
    inPopup("CalendarHelper");
  };

  const onClickCalendarTypeBtn = () => {
    if (calendarType === "calendar") {
      setCalendarType("attend");
    } else {
      setCalendarType("calendar");
    }
    setTypeAniInit(false);
    setTimeout(() => {
      setTypeAniInit(true);
    }, 1000);
  };

  useEffect(() => {
    const newDateArr = [];
    const monthStart = startOfMonth(date);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const weekLength = getWeeksInMonth(date);
    for (let i = 0; i < weekLength; i++) {
      const tempWeekStart = addWeeks(weekStart, i);
      for (let i = 0; i < 7; i++) {
        const tempDate = addDays(tempWeekStart, i);
        if (getMonth(tempDate) === getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: "cur",
          });
        } else if (getMonth(tempDate) < getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: "pre",
          });
        } else if (getMonth(tempDate) > getMonth(date)) {
          newDateArr.push({
            date: tempDate,
            month: "next",
          });
        }
      }
    }
    setDateArr(newDateArr);
    setWeekLength(weekLength);
  }, [date]);

  useEffect(() => {
    if (data) {
      setSchedule(data);
    }
  }, [data]);

  useEffect(() => {
    if (media === "Mobile") {
      setCalendarType("calendar");
      setTypeAniInit(true);
    }
  }, [media]);

  useEffect(() => {
    if (attendData) {
      const attendType = [
        ...new Set(attendData?.seeAttendance?.map((item) => item.type)),
      ].map((item) => {
        return { option: item, subject: "attendType" };
      });
      const studentName = [
        ...new Set(
          attendData?.seeAttendance?.map((item) => item.studentName).sort()
        ),
      ].map((item) => {
        return { option: item, subject: "studentName" };
      });
      const newAttendOption = [...attendType, ...studentName];
      setAttendOption(newAttendOption);
    }
  }, [attendData]);

  useEffect(() => {
    refetch();
  }, [refetchQuery]);

  return (
    <BasicContainer>
      {urlDate ? (
        <CalendarDetail
          userEmail={me?.email}
          urlDate={urlDate}
          refetchQuery={refetchQuery}
          me={me}
        />
      ) : (
        <Container>
          <TopContainer>
            <Title>{format(date, "yyyy년 MM월")}</Title>
            <BtnContainer>
              {media !== "Mobile" && (
                <CalendarType>
                  <CalendarTypeBtn onClick={onClickCalendarTypeBtn}>
                    일정
                  </CalendarTypeBtn>
                  <CalendarTypeBtn onClick={onClickCalendarTypeBtn}>
                    출결
                  </CalendarTypeBtn>
                  <CalendarTypeBackground
                    calendarType={calendarType}
                    onClick={onClickCalendarTypeBtn}
                    typeAniInit={typeAniInit}
                  >
                    {calendarType === "calendar" ? (
                      <div>일정</div>
                    ) : (
                      <div>출결</div>
                    )}
                  </CalendarTypeBackground>
                </CalendarType>
              )}
              <TodayBtn className="calendar_btn" onClick={onClickTodayBtn}>
                TODAY
              </TodayBtn>
              <Btn className="calendar_btn" onClick={onClickBtnMinus}>
                <IoIosArrowBack />
              </Btn>
              <Btn className="calendar_btn" onClick={onClickBtn}>
                <IoIosArrowForward />
              </Btn>
              <Btn className="calendar_btn" onClick={onClickPlusBtn}>
                <AiOutlinePlus />
              </Btn>
              {media === "Desktop" && (
                <HelpIcon onClick={onClickHelper}>
                  <IcHelper />
                </HelpIcon>
              )}
              {calendarType === "attend" && (
                <AttendSortBtn
                  attendOption={attendOption}
                  selectedAttendOption={selectedAttendOption}
                  setSelectedAttendOption={setSelectedAttendOption}
                />
              )}
            </BtnContainer>
          </TopContainer>
          {loading || attendLoading ? (
            <Loading page="subPage" />
          ) : (
            <BottomContainerLayout>
              <BottomContainer>
                {["일", "월", "화", "수", "목", "금", "토"].map(
                  (item, index) => {
                    return (
                      <Day key={index} sun={item === "일"}>
                        {item}
                      </Day>
                    );
                  }
                )}
                <CalendarList weekLength={weekLength}>
                  {dateArr &&
                    dateArr?.map((item, index) => {
                      return (
                        <CalendarItem
                          media={media}
                          key={index}
                          item={item}
                          userEmail={me?.email}
                          schedule={schedule?.seeSchedule}
                          calendarType={calendarType}
                          attendData={attendData}
                          selectedAttendOption={selectedAttendOption}
                        />
                      );
                    })}
                </CalendarList>
              </BottomContainer>
            </BottomContainerLayout>
          )}
        </Container>
      )}
      {isPopup === "addSchedule" && (
        <AddSchedule
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          urlDate={urlDate}
        />
      )}
      {isPopup === "editSchedule" && (
        <EditSchedule
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
        />
      )}
      {isPopup === "createToDo" && (
        <TodoCreate
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
          urlDate={urlDate}
        />
      )}
      {isPopup === "detailToDo" && (
        <DetailToDo
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
        />
      )}
      {isPopup === "seeAllergy" && <SeeAllergy />}
      {isPopup === "moveToStudentPage" && (
        <MoveStudentPage
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
        />
      )}
      {isPopup === "addJournal" && (
        <AddJournal
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
          urlDate={urlDate}
        />
      )}
      {isPopup === "editJournal" && (
        <EditJournal
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
          urlDate={urlDate}
        />
      )}
      {isPopup === "addAttend" && (
        <AddAttend
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
          urlDate={urlDate}
        />
      )}
      {isPopup === "eidtAttend" && (
        <EditAttend
          setErrMsg={setErrMsg}
          userEmail={me?.email}
          setMsg={setMsg}
          setRefetchQuery={setRefetchQuery}
        />
      )}
      {isPopup === "selectedStudent" && <AttendSelectedStudent />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
      {isPopup === "CalendarHelper" && <CalendarHelper />}
      {errMsg && (
        <AlertMessage
          msg={errMsg}
          setMsg={setErrMsg}
          type="error"
          time={3000}
        />
      )}
      {msg && (
        <AlertMessage msg={msg} setMsg={setMsg} type="success" time={3000} />
      )}
    </BasicContainer>
  );
};

export default Calendar;
