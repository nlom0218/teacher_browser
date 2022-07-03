import React from "react";
import styled from "styled-components";
import { customMedia } from "../../../styles";

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

const PreSetTime = styled.div`
  grid-column: 1 / -1;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: repeat(5, auto);
  column-gap: 5px;
  column-gap: 0.3125rem;
`;

const TimeBox = styled.div`
  font-size: 0.875em;
  font-size: 0.875rem;
  padding: 5px 10px;
  padding: 0.3125rem 0.625rem;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;

const Layout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  div {
    justify-self: flex-end;
    padding: 0px 10px;
    padding: 0rem 0.625rem;
  }
`;

const TimeInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding: 0.9375rem 1.25rem;
  box-sizing: border-box;
  border-radius: 5px;
  border-radius: 0.3125rem;
  border: ${(props) => props.isEdit && `${props.theme.fontColor} 1px solid`};
  background-color: ${(props) => props.theme.originBgColor};
`;

const TimeSettingLayout = ({ register, setValue }) => {
  const setPreTime = (min) => {
    setValue("minutes", min);
  };
  return (
    <Container>
      <PreSetTime>
        <TimeBox onClick={() => setPreTime("30")}>30분</TimeBox>
        <TimeBox onClick={() => setPreTime("20")}>20분</TimeBox>
        <TimeBox onClick={() => setPreTime("10")}>10분</TimeBox>
        <TimeBox onClick={() => setPreTime("5")}>5분</TimeBox>
        <TimeBox onClick={() => setPreTime("3")}>3분</TimeBox>
      </PreSetTime>
      <Layout>
        <TimeInput
          {...register("hours", { required: true })}
          type="number"
          min="0"
          max="24"
        />
        <div>시간</div>
      </Layout>
      <Layout>
        <TimeInput
          {...register("minutes", { required: true })}
          type="number"
          min="0"
          max="59"
        />
        <div>분</div>
      </Layout>
      <Layout>
        <TimeInput
          {...register("seconds", { required: true })}
          type="number"
          min="0"
          max="59"
        />
        <div>초</div>
      </Layout>
    </Container>
  );
};

export default TimeSettingLayout;
