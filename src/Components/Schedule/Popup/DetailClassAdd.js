import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DetailStudentLayout,
  DetailTitle,
} from "../../List/styled/DetailStudent";
import useMedia from "../../../Hooks/useMedia";
import { BsCheck } from "react-icons/bs";
import {
  class1,
  class2,
  class3,
  class4,
  class5,
  class6,
} from "../ScheduleData";

const AddClassContainer = styled.div`
  padding: 10px;
  padding: 0.625rem;
  display: grid;
  line-height: 130%;
  border-radius: 5px;
  border-radius: 0.625rem;
  grid-template-columns: 1.5fr repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;

const TimeTable = styled.div`
  display: grid;
  text-align: center;
  flex-wrap: wrap;
  border: 1px solid;
  line-height: 190%;
  cursor: pointer;
  align-items: center;
  justify-items: center;
`;

const DetailClassAdd = ({}) => {
  const [pick, setPick] = useState(false);
  const [viewTimeDay, setViewTimeDay] = useState(false);

  const onClickBtn = (item) => {
    setPick(item);
  };

  const onClickViewTimeDay = () => {
    setViewTimeDay(!viewTimeDay);
  };

  //useEffect

  const timeday = ["", "월", "화", "수", "목", "금"];

  console.log(pick);
  return (
    <DetailStudentLayout>
      <DetailTitle style={{ marginTop: "15px", marginTop: "0.9375rem" }}>
        수업 추가
      </DetailTitle>
      <AddClassContainer>
        {}
        {timeday.map((item, index) => {
          return (
            <TimeTable item={item} index={index}>
              {item}
            </TimeTable>
          );
        })}
        <TimeTable>1교시</TimeTable>
        {class1.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
        <TimeTable>2교시</TimeTable>
        {class2.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
        <TimeTable>3교시</TimeTable>
        {class3.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
        <TimeTable>4교시</TimeTable>
        {class4.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
        <TimeTable>5교시</TimeTable>
        {class5.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
        <TimeTable>6교시</TimeTable>
        {class6.map((name, index) => {
          return (
            <TimeTable
              key={index}
              item={name.time}
              onClick={() => onClickBtn(name.time)}
            >
              {pick === name.time && <BsCheck />}
            </TimeTable>
          );
        })}
      </AddClassContainer>
    </DetailStudentLayout>
  );
};

export default DetailClassAdd;
