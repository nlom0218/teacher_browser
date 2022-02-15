import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { outPopup } from "../../../apollo";
import {
  DetailStudentLayout,
  DetailTitle,
} from "../../List/styled/DetailStudent";
import { timeSetData } from "../ScheduleData";

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
  grid-gap: 0.625rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  color: ${(props) => props.theme.bgColor};
`;

const Input = styled.input`
  padding: 10px;
  background-color: ${(props) => props.theme.cardBg};
  color: ${(props) => props.theme.fontColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`;
const Font = styled.div`
  color: black;
  font-weight: 600;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`;
const AddTagBtn = styled.div`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
const DetailStartTime = () => {
  const [time, setTime] = useState(timeSetData[0]);
  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const {
      hour,
      minutes,
      classtime,
      resttime,
      lunchhour,
      lunchminutes,
      breaktime,
      breakminutes,
    } = data;
    setTime(data);
  };
  const onBlurTimeSet = () => {
    const hour = getValues("hour");
    const minutes = getValues("minutes");
    const classtime = getValues("classtime");
    const resttime = getValues("resttime");
    const lunchhour = getValues("lunchhour");
    const lunchminutes = getValues("lunchminutes");
    const breaktime = getValues("breaktime");
    const breakminutes = getValues("breakminutes");
    onSubmit({
      hour,
      minutes,
      classtime,
      resttime,
      lunchhour,
      lunchminutes,
      breaktime,
      breakminutes,
    });
  };

  const onCompleted = () => {
    outPopup();
    setTime(time); //변경된 값 어떻게 받아오나..
  };

  return (
    <DetailStudentLayout>
      <DetailTitle>수업 시작</DetailTitle>
      <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurTimeSet}>
        <Input
          {...register("hour", {
            required: true,
          })}
          type="number"
          min="1"
          max="24"
          defaultValue={time.hour}
        />{" "}
        <Font>시 </Font>
        <Input
          {...register("minutes", {
            required: true,
          })}
          type="number"
          min="00"
          max="59"
          step="5"
          defaultValue={time.minutes}
        />
        <Font>분 </Font>
      </Form>
      <DetailTitle>수업 시간</DetailTitle>
      <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurTimeSet}>
        <Input
          {...register("classtime", {
            required: true,
          })}
          type="number"
          min="00"
          max="59"
          step="5"
          defaultValue={time.classtime}
        />
        <Font>분 </Font>
      </Form>
      <DetailTitle>쉬는 시간</DetailTitle>
      <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurTimeSet}>
        <Input
          {...register("resttime", {
            required: true,
          })}
          type="number"
          min="00"
          max="59"
          step="5"
          defaultValue={time.resttime}
        />
        <Font>분 </Font>
      </Form>
      <DetailTitle>점심 시간</DetailTitle>
      <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurTimeSet}>
        <Input
          {...register("lunchhour", {
            required: true,
          })}
          type="number"
          max="6"
          min="1"
          defaultValue={time.lunchhour}
        />{" "}
        <Font>교시 후 </Font>
        <Input
          {...register("lunchminutes", {
            required: true,
          })}
          type="number"
          min="00"
          max="80"
          step="5"
          defaultValue={time.lunchminutes}
        />
        <Font>분 </Font>
      </Form>
      <DetailTitle>중간 놀이</DetailTitle>
      <Form onSubmit={handleSubmit(onSubmit)} onBlur={onBlurTimeSet}>
        <Input
          {...register("breaktime", {
            required: true,
          })}
          type="number"
          max="6"
          min="1"
          defaultValue={time.breaktime}
        />{" "}
        <Font>교시 후 </Font>
        <Input
          {...register("breakminutes", {
            required: true,
          })}
          type="number"
          min="00"
          max="80"
          step="5"
          defaultValue={time.breakminutes}
        />
        <Font>분 </Font>
      </Form>
      <div />
      <AddTagBtn onClick={onCompleted}>완료</AddTagBtn>
    </DetailStudentLayout>
  );
};

export default DetailStartTime;
