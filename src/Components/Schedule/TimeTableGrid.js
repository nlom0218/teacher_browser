import React from "react";
import styled from "styled-components";
import TableInItem from "./TableInItem";
import TableOutItem from "./TableOutItem";
import TableOutDay from "./TableOutDay";
import { class1, class2, class3, class4, class5, class6 } from "./ScheduleData";

const Container = styled.div`
  height: 100%;
  display: grid;
  font-size: 1.25rem;
  font-size: 1.25 em;
  text-align: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  grid-template-columns: repeat(6, 1fr);
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
const TimeTableGrid = ({
  fontSize,
  setFontSize,
  viewTime,
  setViewTime,
  timeResult,
}) => {
  // const classtime1 = ["1", "", [timeResult[0], timeResult[1]]];
  // const classtime2 = ["2", "", [timeResult[2], timeResult[3]]];
  // const classtime3 = ["3", "", [timeResult[4], timeResult[5]]];
  // const classtime4 = ["4", "", [timeResult[6], timeResult[7]]];
  // const classtime5 = ["5", "", [timeResult[8], timeResult[9]]];
  // const classtime6 = ["6", "", [timeResult[10], timeResult[11]]];

  const classtime1 = ["1", "", []];
  const classtime2 = ["2", "", []];
  const classtime3 = ["3", "", []];
  const classtime4 = ["4", "", []];
  const classtime5 = ["5", "", []];
  const classtime6 = ["6", "", []];

  return (
    <Container>
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime1[0]}
        color={classtime1[1]}
        tag={classtime1[2]}
      />
      {class1.map((name, index) => {
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime2[0]}
        color={classtime2[1]}
        tag={classtime2[2]}
      />
      {class2.map((name, index) => {
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime3[0]}
        color={classtime3[1]}
        tag={classtime3[2]}
      />
      {class3.map((name, index) => {
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime4[0]}
        color={classtime4[1]}
        tag={classtime4[2]}
      />
      {class4.map((name, index) => {
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime5[0]}
        color={classtime5[1]}
        tag={classtime5[2]}
      />
      {class5.map((name, index) => {
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
      <TableOutItem
        viewTime={viewTime}
        setViewTime={setViewTime}
        item={classtime6[0]}
        color={classtime6[1]}
        tag={classtime6[2]}
      />
      {class6.map((name, index) => {
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
    </Container>
  );
};

export default TimeTableGrid;
