import { format } from "date-fns";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { customMedia } from "../../styles";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import routes from "../../routes";
import ScheduleSection from "./ScheduleSection";
import ToDoListSection from "./ToDoListSection";
import LunchmenuSection from "./LunchmenuSection";
import JournalSection from "./JournalSection";
import AttendSection from "./AttendSection";
import { processSetDay } from "../../shared";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import useMedia from "../../Hooks/useMedia";
import { BsCalendarDate } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { SEE_ATTENDANCE_QUERY } from "../../Graphql/Attendance/query";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: flex-start;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`;

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto auto auto auto;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr auto auto auto auto;
  `}
`;

const Title = styled.div`
  grid-column: 1 / -1;
  font-size: 1.25em;
  font-size: 1.25rem;
  text-transform: uppercase;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
    font-size: 2em;
    font-size: 2rem;
  `}
`;

const TodayBtn = styled.div`
  cursor: pointer;
  padding: 5px 16px;
  padding: 0.3125rem 1rem;
  border-radius: 20px;
  border-radius: 1.25rem;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
`;

const Btn = styled.div`
  justify-self: flex-end;
  padding: 5px;
  padding: 0.3125rem;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.btnBgColor};
  transition: color 1s ease, background-color 1s ease;
  svg {
    font-size: 1.25em;
    font-size: 1.25rem;
    display: flex;
  }
`;

const BottomContainer = styled.div`
  min-height: 100%;
  display: grid;
  align-items: flex-start;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const LeftSection = styled.div`
  display: grid;
  grid-template-rows: repeat(2, minmax(160px, auto));
  grid-template-rows: repeat(2, minmax(10rem, auto));
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const RightSection = styled.div`
  display: grid;
  grid-template-rows: minmax(160px, auto) repeat(2, minmax(160px, auto));
  grid-template-rows: minmax(10rem, auto) repeat(2, minmax(10rem, auto));
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const CalendarDetail = ({ urlDate, refetchQuery, me }) => {
  const navigate = useNavigate();
  const media = useMedia();

  const { data, loading, refetch } = useQuery(SEE_ATTENDANCE_QUERY, {
    variables: {
      date: parseInt(urlDate),
    },
  });

  const onClickTodayBtn = () => {
    const newDate = new Date().setHours(0, 0, 0, 0);
    navigate(`${routes.calendar}/${newDate}`);
  };

  const onClickBtnMinus = () => {
    const newDate = parseInt(urlDate) - 86400000;
    navigate(`${routes.calendar}/${newDate}`);
  };

  const onClickBtn = () => {
    const newDate = parseInt(urlDate) + 86400000;
    navigate(`${routes.calendar}/${newDate}`);
  };

  const onClickCalendar = () => {
    navigate(routes.calendar);
  };

  useEffect(() => {
    refetch();
  }, [urlDate]);

  return (
    <Container>
      <TopContents>
        <Title>
          {format(new Date(parseInt(urlDate)), "yyyy년 MM월 dd일")} {processSetDay(new Date(parseInt(urlDate)))}요일
        </Title>
        {media === "Mobile" && <div></div>}
        <TodayBtn className="calendar_btn" onClick={onClickTodayBtn}>
          TODAY
        </TodayBtn>
        <Btn className="calendar_btn" onClick={onClickBtnMinus}>
          <IoIosArrowBack />
        </Btn>
        <Btn className="calendar_btn" onClick={onClickBtn}>
          <IoIosArrowForward />
        </Btn>
        <Btn className="calendar_btn" onClick={onClickCalendar}>
          <BsCalendarDate />
        </Btn>
      </TopContents>
      <BottomContainer>
        <LeftSection>
          <ScheduleSection urlDate={urlDate} refetchQuery={refetchQuery}></ScheduleSection>
          <ToDoListSection urlDate={urlDate} refetchQuery={refetchQuery}></ToDoListSection>
        </LeftSection>
        <RightSection>
          <LunchmenuSection urlDate={urlDate} me={me}></LunchmenuSection>
          <JournalSection urlDate={urlDate} refetchQuery={refetchQuery}></JournalSection>
          <AttendSection data={data} loading={loading} refetch={refetch} refetchQuery={refetchQuery}></AttendSection>
        </RightSection>
      </BottomContainer>
    </Container>
  );
};

export default CalendarDetail;
