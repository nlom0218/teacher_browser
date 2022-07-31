import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { inPopup } from "../../apollo";
import { compare } from "../../shared";
import { customMedia } from "../../styles";

const Container = styled.div`
  padding: 5px;
  row-gap: 0.3125rem;
`;

const AttendInfoList = styled.div`
  display: grid;
  row-gap: 5px;
  row-gap: 0.3125rem;
`;

const AttendInfoItem = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.cardBg};
  line-height: 120%;
  transition: background-color 1s ease;
  cursor: pointer;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: auto 1fr;
    row-gap: 0px;
    row-gap: 0rem;
  `}
`;

const StudentName = styled.span`
  /* font-weight: 600; */
  margin-right: 5px;
  margin-right: 0.3125rem;
`;

const AttendType = styled.span`
  /* font-weight: 600; */
  color: ${(props) => (props.attendType.includes("결석") ? props.theme.redColor : props.theme.btnBgColor)};
  transition: color 1s ease;
`;

const AttendCalendar = ({ attendData, item, selectedAttendOption, refetchQuery }) => {
  const [attendInfo, setAttendInfo] = useState([]);

  const onClickAttendInfo = (id, studentName) => {
    inPopup("eidtAttend");
    localStorage.setItem("summaryAttendId", id);
    localStorage.setItem("summaryAttendName", studentName);
  };

  const processAttendInfo = () => {
    const { attend, studentName } = selectedAttendOption;
    if (attend === "전체보기" && studentName === "전체보기") {
      return attendInfo.sort(compare("studentName"));
    } else if (attend === "전체보기") {
      return attendInfo.filter((item) => item.studentName === studentName).sort(compare("studentName"));
    } else if (studentName === "전체보기") {
      return attendInfo.filter((item) => item.type === attend).sort(compare("studentName"));
    } else {
      return attendInfo
        .filter((item) => item.studentName === studentName && item.type === attend)
        .sort(compare("studentName"));
    }
  };

  useEffect(() => {
    if (attendData) {
      const newAttendInfo = attendData?.seeAttendance
        ?.filter((attend) => attend.date === new window.Date(item.date).setHours(0, 0, 0, 0))
        .sort(compare("studentName"));
      setAttendInfo(newAttendInfo);
    }
  }, [attendData]);

  return (
    <Container>
      <AttendInfoList>
        {processAttendInfo().map((item, index) => {
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

export default AttendCalendar;
