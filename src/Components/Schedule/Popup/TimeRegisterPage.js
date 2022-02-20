import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ME_QUERY } from "../../../Hooks/useMe";
import PopupContainer from "../../Shared/PopupContainer";
import { outPopup } from "../../../apollo";
import { DetailTitle } from "../../List/styled/DetailStudent";
import { SET_TIMETABLE_TIME_MUTATION } from "../../../Graphql/TimeTable/mutation";
import { GET_TIMETABLE_TIME_QUERY } from "../../../Graphql/TimeTable/query";

const RegisterForm = styled.form`
  width: 100%;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  grid-template-columns: 1fr;
  align-items: center;
  padding: 20px;
  padding: 1.25rem;
  svg {
    font-size: 1.875em;
    font-size: 1.875rem;
    cursor: pointer;
  }
`;
const LayOut = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  font-size: 1em;
  font-size: 1rem;
  text-align: center;
  justify-items: center;
`;
const InputLayout = styled.input`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 70%;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-bottom: 10px;
  margin-bottom: 0.625rem;
  background-color: ${(props) => props.theme.cardBg};
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

const TimeRegisterPage = ({ userEmail, timeResult }) => {
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

  const { register, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    const {
      start1,
      end1,
      start2,
      end2,
      start3,
      end3,
      start4,
      end4,
      start5,
      end5,
      start6,
      end6,
    } = data;
    setTimetableTime({
      variables: {
        teacherEmail: userEmail,
        start1,
        end1,
        start2,
        end2,
        start3,
        end3,
        start4,
        end4,
        start5,
        end5,
        start6,
        end6,
      },
    });
  };

  return (
    <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <LayOut>
          <div></div>
          <DetailTitle>시작시간</DetailTitle>
          <DetailTitle>종료시간</DetailTitle>
          <DetailTitle>1교시</DetailTitle>
          <InputLayout
            {...register("start1", {
              required: true,
            })}
            defaultValue={timeResult[0]}
          />
          <InputLayout
            {...register("end1", {
              required: true,
            })}
            defaultValue={timeResult[1]}
          />
          <DetailTitle>2교시</DetailTitle>
          <InputLayout
            {...register("start2", {
              required: true,
            })}
            defaultValue={timeResult[2]}
          />
          <InputLayout
            {...register("end2", {
              required: true,
            })}
            defaultValue={timeResult[3]}
          />
          <DetailTitle>3교시</DetailTitle>
          <InputLayout
            {...register("start3", {
              required: true,
            })}
            defaultValue={timeResult[4]}
          />
          <InputLayout
            {...register("end3", {
              required: true,
            })}
            defaultValue={timeResult[5]}
          />
          <DetailTitle>4교시</DetailTitle>
          <InputLayout
            {...register("start4", {
              required: true,
            })}
            defaultValue={timeResult[6]}
          />
          <InputLayout
            {...register("end4", {
              required: true,
            })}
            defaultValue={timeResult[7]}
          />
          <DetailTitle>5교시</DetailTitle>
          <InputLayout
            {...register("start5", {
              required: true,
            })}
            defaultValue={timeResult[8]}
          />
          <InputLayout
            {...register("end5", {
              required: true,
            })}
            defaultValue={timeResult[9]}
          />
          <DetailTitle>6교시</DetailTitle>
          <InputLayout
            {...register("start6", {
              required: true,
            })}
            defaultValue={timeResult[10]}
          />
          <InputLayout
            {...register("end6", {
              required: true,
            })}
            defaultValue={timeResult[11]}
          />
        </LayOut>{" "}
        <AddTagBtn type="submit" value="완료" />
      </RegisterForm>
    </PopupContainer>
  );
};

export default TimeRegisterPage;
