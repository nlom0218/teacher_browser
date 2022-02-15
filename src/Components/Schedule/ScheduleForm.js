import React from "react";
import styled from "styled-components";
import TableInItem from "./TableInItem";
import TableOutItem from "./TableOutItem";
import TableOutDay from "./TableOutDay";
import {
  classFri,
  classMon,
  classThur,
  classTue,
  classWed,
} from "./ScheduleData";

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
  fontSize,
  setFontSize,
  viewTime,
  setViewTime,
  timeResult,
}) => {
  const classtime1 = ["1", "", [timeResult[0], timeResult[1]]];
  const classtime2 = ["2", "", [timeResult[2], timeResult[3]]];
  const classtime3 = ["3", "", [timeResult[4], timeResult[5]]];
  const classtime4 = ["4", "", [timeResult[6], timeResult[7]]];
  const classtime5 = ["5", "", [timeResult[8], timeResult[9]]];
  const classtime6 = ["6", "", [timeResult[10], timeResult[11]]];

  const timeValue = [
    ["1", "", [timeResult[0], timeResult[1]]],
    ["2", "", [timeResult[2], timeResult[3]]],
    ["3", "", [timeResult[4], timeResult[5]]],
    ["4", "", [timeResult[6], timeResult[7]]],
    ["5", "", [timeResult[8], timeResult[9]]],
    ["6", "", [timeResult[10], timeResult[11]]],
  ];

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
          {timeValue.map((item, index) => {
            return (
              <TableOutItem
                viewTime={viewTime}
                setViewTime={setViewTime}
                item={item[0]}
                index={index}
                color={item[1]}
                tag={item[2]}
              />
            );
          })}
        </DayOne>
        <DayOne>
          {classMon.map((name, index) => {
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
          {classWed.map((name, index) => {
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
          {classThur.map((name, index) => {
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
          {classFri.map((name, index) => {
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
      </DayDown>
    </Container>
  );
};

export default ScheduleForm;
