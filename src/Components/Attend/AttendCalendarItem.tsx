import { getDate, getDay, isToday } from "date-fns";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { customMedia } from "../../styles";

interface IDay {
  sun: boolean;
  curMonth: boolean;
}

interface IDate {
  isToday: boolean;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease;
  display: grid;
  align-items: flex-start;
  grid-template-rows: auto 1fr auto;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const Day = styled.div<IDay>`
  justify-self: flex-end;
  color: ${(props) => props.sun && props.theme.redColor};
  opacity: ${(props) => (props.curMonth ? 1 : 0.4)};
  transition: ${(props) => props.sun && "color 1s ease"};
  position: relative;
`;

const Date = styled.div<IDate>`
  display: grid;
  grid-template-columns: 1fr auto;
  margin: 5px;
  margin: 0.3125rem;
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${(props) => props.isToday && props.theme.redColor};
  color: ${(props) => props.isToday && props.theme.bgColor};
  border-radius: 20px;
  border-radius: 1.25rem;
  transition: ${(props) => props.isToday && "background-color 1s ease, color 1s ease"};
  cursor: pointer;
  :hover {
    background-color: ${(props) => (!props.isToday ? props.theme.hoverColor : props.theme.redColor)};
    transition: ${(props) => !props.isToday && "background-color 0.4s ease"};
  }
`;

const AttendInfoList = styled.div`
  display: grid;
  row-gap: 5px;
  row-gap: 0.3125rem;
  padding: 5px;
  padding: 0.3125rem;
`;

const AttendInfoItem = styled.div`
  align-self: flex-start;
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.cardBg};
  line-height: 120%;
  transition: background-color 1s ease;
  font-size: 0.875em;
  font-size: 0.875rem;
  cursor: pointer;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: auto 1fr;
    row-gap: 0px;
    row-gap: 0rem;
  `}
`;

const StudentName = styled.span`
  margin-right: 5px;
  margin-right: 0.3125rem;
`;

interface IAttendType {
  attendType: string;
}

const AttendType = styled.span<IAttendType>`
  color: ${(props) => (props.attendType.includes("결석") ? props.theme.redColor : props.theme.btnBgColor)};
  transition: color 1s ease;
`;

interface ISeeAttendance {
  contents: null | string;
  date: number;
  month: number;
  studentId: string;
  studentName: string;
  _id: string;
  type: string;
}

interface IProps {
  date: Date;
  month: String;
  attend: ISeeAttendance[];
  seletedType: string;
  seletedName: string;
}

const AttendCalendarItem = ({ date, month, attend, seletedType, seletedName }: IProps) => {
  const onClickAttendInfo = (id: string, name: string) => {
    inPopup("eidtAttend");
    localStorage.setItem("summaryAttendId", id);
    localStorage.setItem("summaryAttendName", name);
  };
  return (
    <Container>
      <Day sun={getDay(date) === 0} curMonth={month === "cur"}>
        <Date isToday={isToday(date)}> {getDate(date)}</Date>
      </Day>
      <AttendInfoList>
        {attend &&
          attend
            .filter((item) => {
              if (seletedType === "전체보기" && seletedName === "전체보기") {
                return item;
              } else if (seletedName === "전체보기") {
                return item.type === seletedType;
              } else if (seletedType === "전체보기") {
                return item.studentName === seletedName;
              } else {
                return item.type === seletedType && item.studentName === seletedName;
              }
            })
            .sort((a, b) => (a.studentName > b.studentName ? 1 : -1))
            .map((item, index) => {
              return (
                <AttendInfoItem key={index} onClick={() => onClickAttendInfo(item._id, item.studentName)}>
                  <StudentName>{item.studentName}</StudentName>
                  <AttendType attendType={item.type}>{item.type}</AttendType>
                </AttendInfoItem>
              );
            })}
      </AttendInfoList>
    </Container>
  );
};

export default AttendCalendarItem;
