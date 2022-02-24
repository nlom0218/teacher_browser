import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableInItem from "./TableInItem";
import TableOutItem from "./TableOutItem";
import TableOutDay from "./TableOutDay";
import { useQuery } from "@apollo/client";
import { GET_TIMETABLE_DATA_QUERY } from "../../Graphql/TimeTable/query";

const Container = styled.div`
  min-height: 100%;
  display: grid;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 8fr;
`;

const DayTop = styled.div`
  grid-column: 1 / -1;
  display: grid;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  grid-template-columns: repeat(6, 1fr);
`;


const DayOne = styled.div`
  display: grid;
  text-align: center;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-rows: repeat(6, 1fr);
`;

const DayAll = styled.div`
  display: grid;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const result = [];
let myDate = new Date();
const nowDay = myDate.getDay();
myDate.setDate(myDate.getDate() - nowDay);
for (var i = 0; i < 6; i++) {
  myDate.setDate(myDate.getDate() + 1);
  result.push(myDate.toLocaleDateString().slice(5));
}
const dayValue = [[], ["월", , result[0]], ["화", , result[1]], ["수", , result[2]], ["목", , result[3]], ["금", , result[4]],];

const ScheduleForm = ({ timetableTime, fontSize, setFontSize, viewTime, setViewTime }) => {
  const { data, loading, error } = useQuery(GET_TIMETABLE_DATA_QUERY);
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  console.log(data);

  return (
    <Container>
      <DayTop>
        {dayValue.map((item, index) => {
          return (
            <TableOutDay
              key={index}
              item={item[0]}
              index={index}
              color={item[1]}
              tag={item[2]}
            />
          );
        })}
      </DayTop>
      <DayOne>
        {timetableTime.map((item, index) => {
          return (
            <TableOutItem
              key={index}
              viewTime={viewTime}
              setViewTime={setViewTime}
              item={item[0]}
              index={index}
              tag={item[1]}
            />
          );
        })}
      </DayOne>
      <DayAll>
        {data?.getTimetableData.map((name, index) => {
          return (
            <TableInItem
              key={index}
              num={name.index}
              subName={name.subName}
              color={name.color}
              tag={name.memo}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          );
        })}
      </DayAll>
    </Container>
  );
};

export default ScheduleForm;
