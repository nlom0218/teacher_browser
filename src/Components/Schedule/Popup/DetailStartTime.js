import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { outPopup } from "../../../apollo";
import { DetailTitle } from "../../List/styled/DetailStudent";
import timeSetCal from "../TimeSetCal";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "../../../Hooks/useMe";
import { SET_TIMETABLE_TIME_MUTATION } from "../../../Graphql/TimeTable/mutation";
import { GET_TIMETABLE_TIME_QUERY } from "../../../Graphql/TimeTable/query";

const FormContainer = styled.form`
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`;
const LayOut = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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
const AddTagBtn = styled.input`
  text-align: center;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
const DetailStartTime = ({ userEmail }) => {
  const onCompleted = (result) => {
    const {
      setTimetableTime: { ok },
    } = result;
    if (ok) {
      outPopup();
    }
  };
  const [setTimetableTime, { loading }] = useMutation(
    SET_TIMETABLE_TIME_MUTATION,
    {
      onCompleted,
      refetchQueries: [
        { query: ME_QUERY },
        { query: GET_TIMETABLE_TIME_QUERY, variables: { userEmail } },
      ],
    }
  );

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const { hour, minutes, classtime, resttime, lunchhour, lunchminutes } =
      data;
    const thour = parseInt(hour);
    const tminutes = parseInt(minutes);
    const tclasstime = parseInt(classtime);
    const tresttime = parseInt(resttime);
    const tlunchhour = parseInt(lunchhour);
    const tlunchminutes = parseInt(lunchminutes);
    const timeResult = timeSetCal(
      thour,
      tminutes,
      tclasstime,
      tresttime,
      tlunchhour,
      tlunchminutes
    );
    setTimetableTime({
      variables: {
        teacherEmail: userEmail,
        start1: timeResult[0],
        end1: timeResult[1],
        start2: timeResult[2],
        end2: timeResult[3],
        start3: timeResult[4],
        end3: timeResult[5],
        start4: timeResult[6],
        end4: timeResult[7],
        start5: timeResult[8],
        end5: timeResult[9],
        start6: timeResult[10],
        end6: timeResult[11],
      },
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <LayOut>
        <DetailTitle>수업 시작</DetailTitle>
        <Input
          {...register("hour", {
            required: true,
          })}
          type="number"
          min="1"
          max="24"
          defaultValue="9"
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
          defaultValue="00"
        />
        <Font>분 </Font>
      </LayOut>

      <LayOut>
        <DetailTitle>수업 시간</DetailTitle>
        <Input
          {...register("classtime", {
            required: true,
          })}
          type="number"
          min="00"
          max="59"
          step="5"
          defaultValue="40"
        />
        <Font>분 </Font>
        <div></div>
        <div></div>
      </LayOut>
      <LayOut>
        <DetailTitle>쉬는 시간</DetailTitle>
        <Input
          {...register("resttime", {
            required: true,
          })}
          type="number"
          min="00"
          max="59"
          step="5"
          defaultValue="10"
        />
        <Font>분 </Font>
        <div></div>
        <div></div>
      </LayOut>
      <LayOut>
        <DetailTitle>점심 시간</DetailTitle>
        <Input
          {...register("lunchhour", {
            required: true,
          })}
          type="number"
          max="6"
          min="1"
          defaultValue="4"
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
          defaultValue="50"
        />
        <Font>분 </Font>
      </LayOut>
      <div />
      <AddTagBtn type="submit" value="완료" />
    </FormContainer>
  );
};

export default DetailStartTime;
