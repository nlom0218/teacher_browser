import React, { useState } from "react";
import styled from "styled-components";
import { inputLine } from "../../Animations/InputLine";
import { BtnFadeIn } from "../../Animations/Fade";
import useMedia from "../../Hooks/useMedia";
import { useForm } from "react-hook-form";
import { processSetDay } from "../../shared";
import PrintSchedule from "../../Components/Schedule/PrintSchedule";

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
`;

const Title = styled.form`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  h2 {
    opacity: 0.7;
    grid-column: 1 / -1;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.5em;
  font-size: 1.5rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`;


const LineBox = styled.div`
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  height: 2px;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => props.theme.fontColor};
  opacity: 0.6;
  transition: background 1s ease, opacity 1s ease;
  animation: ${inputLine} 0.6s ease forwards;
`;

const Eles = styled.div`
  display: grid;
  grid-template-columns: ${props => props.isEdit ? "auto auto" : "auto"};
  column-gap: 20px;
  column-gap: 1.25rem;
  align-self: flex-end;
`

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  align-self: center;
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease;
`;

const TimeTableTitle = ({ setTitle }) => {
  const media = useMedia();
  const date = new Date();
  const processSetDate = () => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}월 ${date.getDate().toString().padStart(2, 0)}일`;
  };
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "우리반 시간표" },
  });

  const onClickInput = () => {
    setIsEdit(true);
  };
  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit({ title });
  };

  return (
    <TopContents>
      <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
        <h2>{processSetDate(date)} {processSetDay(date)}요일</h2>
        <Input
          {...register("title", {
            required: true,
            onChange: () => setIsEdit(true),
          })}
          type="text"
          placeholder="제목을 입력하세요"
          autoComplete="off"
          onClick={onClickInput}
        />
        {isEdit && (
          <LineBox>
            <Line></Line>
          </LineBox>
        )}
      </Title>
      <Eles isEdit={isEdit}>
        {isEdit && <SubmitInput type="submit" value="저장" />}
        {media === "Desktop" && <PrintSchedule />}
      </Eles>
    </TopContents>
  );
};
export default TimeTableTitle;
