import { useQuery } from "@apollo/client";
import { addDays, addWeeks, format, getMonth, getWeeksInMonth, startOfMonth, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SEE_ATTENDANCE_QUERY } from "../../Graphql/Attendance/query";
import useMe from "../../Hooks/useMe";
import { customMedia } from "../../styles";
import AttendCalendarItem from "./AttendCalendarItem";

interface IDay {
  sun: boolean;
}

interface ICalendarList {
  weekLength: number | undefined;
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr;
`;

const Day = styled.div<IDay>`
  justify-self: flex-end;
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  color: ${(props) => props.sun && props.theme.redColor};
  transition: ${(props) => props.sun && "color 1s ease"};
`;

const CalendarList = styled.div<ICalendarList>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${(props) => `repeat(${props.weekLength}, 1fr)`};
  background-color: ${(props) => props.theme.girdBorderColor};
  border: 1px solid ${(props) => props.theme.girdBorderColor};
  transition: background-color 1s ease, border 1s ease;
  row-gap: 1px;
  column-gap: 1px;
  ${({ weekLength }) => customMedia.greaterThan("tablet")`
    grid-template-rows: ${`repeat(${weekLength}, minmax(100px, auto))`};
    grid-template-rows: ${`repeat(${weekLength}, minmax(6.25rem, auto))`};
  `}
`;

interface IProps {
  date: Date;
}

interface IDateArr {
  date: Date;
  month: string;
  attend: ISeeAttendance[] | undefined;
}

interface ISeeAttendance {
  contents: null | string;
  date: number;
  month: number;
  studentId: string;
  studentName: string;
  type: string;
  _id: string;
}

interface IDate {
  seeAttendance: ISeeAttendance[];
}

const AttendCalendar = ({ date }: IProps) => {
  const me = useMe();
  const [dateArr, setDateArr] = useState<IDateArr[] | undefined>(undefined);
  const [weekLength, setWeekLength] = useState<number | undefined>(undefined);

  const { data, loading, refetch } = useQuery<IDate>(SEE_ATTENDANCE_QUERY, {
    variables: {
      month: parseInt(format(date, "yyMM")),
    },
    skip: !me,
  });

  useEffect(() => {
    if (data) {
      const newDateArr = [];
      const monthStart = startOfMonth(date);
      const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      const weekLength = getWeeksInMonth(date);
      for (let i = 0; i < weekLength; i++) {
        const tempWeekStart = addWeeks(weekStart, i);
        for (let i = 0; i < 7; i++) {
          const tempDate = addDays(tempWeekStart, i);
          const tempDateNumber = new window.Date(tempDate).setHours(0, 0, 0, 0);
          const attend = data?.seeAttendance?.filter((item) => item.date === tempDateNumber);
          if (getMonth(tempDate) === getMonth(date)) {
            newDateArr.push({
              date: tempDate,
              month: "cur",
              attend,
            });
          } else if (getMonth(tempDate) < getMonth(date)) {
            newDateArr.push({
              date: tempDate,
              month: "pre",
              attend,
            });
          } else if (getMonth(tempDate) > getMonth(date)) {
            newDateArr.push({
              date: tempDate,
              month: "next",
              attend,
            });
          }
        }
      }
      setDateArr(newDateArr);
      setWeekLength(weekLength);
    }
  }, [data]);

  return (
    <Layout>
      {["일", "월", "화", "수", "목", "금", "토"].map((item, index) => {
        return (
          <Day key={index} sun={item === "일"}>
            {item}
          </Day>
        );
      })}
      <CalendarList weekLength={weekLength}>
        {dateArr &&
          dateArr?.map((item, index) => {
            return (
              <AttendCalendarItem
                //   media={media}
                key={index}
                {...item}
                //   userEmail={me?.email}
                //   schedule={schedule?.seeSchedule}
                //   calendarType={calendarType}
                //   attendData={attendData}
                //   selectedAttendOption={selectedAttendOption}
              />
            );
          })}
      </CalendarList>
    </Layout>
  );
};

export default AttendCalendar;
