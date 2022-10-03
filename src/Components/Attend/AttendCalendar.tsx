import { useQuery } from "@apollo/client";
import { addDays, addWeeks, format, getMonth, getWeeksInMonth, startOfMonth, startOfWeek } from "date-fns";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SEE_ATTENDANCE_QUERY } from "../../Graphql/Attendance/query";
import { customMedia } from "../../styles";
import Loading from "../Shared/Loading";
import AttendCalendarItem from "./AttendCalendarItem";

interface IDay {
  sun: boolean;
}

interface ICalendarList {
  weekLength: number | undefined;
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  grid-template-columns: repeat(5, 1fr);
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

interface ISeeAttendance {
  contents: null | string;
  date: number;
  month: number;
  studentId: string;
  studentName: string;
  type: string;
  _id: string;
}

interface IProps {
  date: Date;
  email: string | undefined;
}

interface IDateArr {
  date: Date;
  month: string;
}

interface IDate {
  seeAttendance: ISeeAttendance[];
}

const AttendCalendar = ({ date, email }: IProps) => {
  const [dateArr, setDateArr] = useState<IDateArr[] | undefined>(undefined);
  const [attends, setAttends] = useState<ISeeAttendance[][]>([]);
  const [weekLength, setWeekLength] = useState<number | undefined>(undefined);

  const { data, loading } = useQuery<IDate>(SEE_ATTENDANCE_QUERY, {
    variables: {
      month: parseInt(format(date, "yyMM")),
    },
    skip: !email,
  });

  useEffect(() => {
    const newDateArr = [];
    const monthStart = startOfMonth(date);
    const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const weekLength = getWeeksInMonth(date);
    for (let i = 0; i < weekLength; i++) {
      const tempWeekStart = addWeeks(weekStart, i);
      for (let i = 0; i < 7; i++) {
        const tempDate = addDays(tempWeekStart, i);
        if (i === 0 || i === 6) continue;
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
      const attends = [];
      const monthStart = startOfMonth(date);
      const weekStart = startOfWeek(monthStart, { weekStartsOn: 0 });
      const weekLength = getWeeksInMonth(date);
      for (let i = 0; i < weekLength; i++) {
        const tempWeekStart = addWeeks(weekStart, i);
        for (let i = 0; i < 7; i++) {
          if (i === 0 || i === 6) continue;
          const tempDate = addDays(tempWeekStart, i);
          const tempDateNumber = new window.Date(tempDate).setHours(0, 0, 0, 0);
          const attend = data?.seeAttendance?.filter((item) => item.date === tempDateNumber);
          attends.push(attend);
        }
      }
      setAttends(attends);
    }
  }, [data]);

  return (
    <Layout>
      {loading && <Loading page="center" />}
      {["월", "화", "수", "목", "금"].map((item, index) => {
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
                key={index}
                {...item}
                attend={attends[index]}
                //   selectedAttendOption={selectedAttendOption}
              />
            );
          })}
      </CalendarList>
    </Layout>
  );
};

export default AttendCalendar;
