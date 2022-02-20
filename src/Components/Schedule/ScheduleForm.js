import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableInItem from "./TableInItem";
import TableOutItem from "./TableOutItem";
import TableOutDay from "./TableOutDay";
import { useQuery } from "@apollo/client";
import { GET_TIMETABLE_DATA_QUERY } from "../../Graphql/TimeTable/query";
import { monthsToQuarters } from "date-fns";
import {
  classMon,
  classTue,
  classWed,
  classThur,
  classFri,
} from "../../Components/Schedule/ScheduleData";

const Container = styled.div`
  height: 100%;
  display: grid;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-rows: 0.6fr 6fr;
`;

const DayTop = styled.div`
  height: 100%;
  display: grid;
  font-size: 1rem;
  font-size: 1em;

  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);
`;
const DayDown = styled.div`
  height: 100%;
  display: grid;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-columns: repeat(6, 1fr);
`;
const DayOne = styled.div`
  height: 100%;
  display: grid;
  font-size: 1rem;
  font-size: 1 em;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-rows: repeat(7, 1fr);
`;
const result = [];
let myDate = new Date();
const nowDay = myDate.getDay();
myDate.setDate(myDate.getDate() - nowDay);
for (var i = 0; i < 6; i++) {
  myDate.setDate(myDate.getDate() + 1);
  result.push(myDate.toLocaleDateString().slice(5));
}
const dayValue = [
  [, ,],
  ["월", , result[0]],
  ["화", , result[1]],
  ["수", , result[2]],
  ["목", , result[3]],
  ["금", , result[4]],
];

const ScheduleForm = ({
  timetableTime,
  fontSize,
  setFontSize,
  viewTime,
  setViewTime,
}) => {
  const { data, loading, error } = useQuery(GET_TIMETABLE_DATA_QUERY);
  console.log(data);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return (
    <Container>
      <DayTop>
        {dayValue.map((item, index) => {
          return (
            <TableOutDay
              item={item[0]}
              index={index}
              color={item[1]}
              tag={item[2]}
            />
          );
        })}
      </DayTop>
      <DayDown>
        <DayOne>
          {timetableTime.map((item, index) => {
            return (
              <TableOutItem
                viewTime={viewTime}
                setViewTime={setViewTime}
                item={item[0]}
                index={index}
                tag={item[1]}
              />
            );
          })}
        </DayOne>
        <DayOne>
          {/* {MonArr.map((name, index) => {
            return (
              <TableInItem
                key={index}
                item={name.subName}
                color={name.color}
                tag={name.memo}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            );
          })} */}
        </DayOne>
        <DayOne>
          {classTue.map((name, index) => {
            return (
              <TableInItem
                key={index}
                item={name.subjectname}
                color={name.color}
                tag={name.tag}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            );
          })}
        </DayOne>
        <DayOne>
          {/* {classWed.map((name, index) => {
            return (
              <TableInItem
                key={index}
                item={name.subjectname}
                color={name.color}
                tag={name.tag}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            );
          })} */}
        </DayOne>
        <DayOne>
          {/* {classThur.map((name, index) => {
            return (
              <TableInItem
                key={index}
                item={name.subjectname}
                color={name.color}
                tag={name.tag}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            );
          })} */}
        </DayOne>
        <DayOne>
          {/* {classFri.map((name, index) => {
            return (
              <TableInItem
                key={index}
                item={name.subjectname}
                color={name.color}
                tag={name.tag}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            );
          })} */}
        </DayOne>
      </DayDown>
    </Container>
  );
};

export default ScheduleForm;
