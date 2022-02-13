// 리액트
import React, { useState, forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";

// 그래프큐엘
import { useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { EDIT_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";

// 컴포넌트
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import TextareaAutosize from "react-textarea-autosize";
import styled, { keyframes } from "styled-components";
import IcCalender from "../../../icons/Calender/IcCalender";
import { BiEdit } from "react-icons/bi";
import { customMedia } from "../../../styles";
import IcCloseTrash from "../../../icons/Trash/IcCloseTrash";
import { inPopup } from "../../../apollo";

const Container = styled.form`
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  textarea {
    all: unset;
    grid-column: 1/ -1;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 16px;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    background-color: ${(props) => props.theme.originBgColor};
    line-height: 160%;
    color: ${(props) => props.theme.fontColor};
    transition: background-color 1s ease, color 1s ease;
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.8;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const RightContainer = styled.div`
  align-self: flex-start;
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`;

const LeftContainer = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625;
  column-gap: 20px;
  column-gap: 0.625rem;
  justify-items: flex-end;
`;

const TextareaLayout = styled.div`
  position: relative;
  width: 100%;
`;

const EditIcon = styled.div`
  position: absolute;
  bottom: 5px;
  bottom: 0.3125rem;
  right: 5px;
  right: 0.3125rem;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const btnAni = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 1;
}
`;

const BtnLayout = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  animation: ${btnAni} 1s ease;
`;

const DatePickers = styled(DatePicker)`
  grid-row: 1/2;
  font-size: 2em;
  text-align: center;
  border-radius: 10px;
  margin: 15px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  box-shadow: 5px 5px 5px;
  transition: 0.1s;
  &:active {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
    box-shadow: none;
  }
`;

const DateContainer = styled.div`
  display: grid;
  justify-items: flex-start;
`;

const DateIcon = styled.div`
  cursor: pointer;
  display: flex;
  font-size: 2em;
  font-size: 2rem;
  ${customMedia.greaterThan("tablet")`
    font-size: 2.5em;
    font-size: 2.5rem;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  `}
`;

const ModifyBtn = styled.input`
  cursor: pointer;
  padding: 10px 16px;
  padding: 0.625rem 1rem;
  background-color: ${(props) => props.theme.btnBgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
`;

const DelBtn = styled.div`
  cursor: pointer;
  padding: 10px 16px;
  padding: 0.625rem 1rem;
  background-color: ${(props) => props.theme.redColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  color: ${(props) => props.theme.bgColor};
  animation: ${btnAni} 1s ease;
  transition: background-color 1s ease, color 1s ease;
`;

const TrashIcon = styled.div`
  font-size: 2.25em;
  font-size: 2.25rem;
  cursor: pointer;
  svg {
    display: flex;
    filter: drop-shadow(1px 1px 1px rgb(0, 0, 0));
  }
`;

//
const Content = ({ me, studentId, journal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(null);
  const [text, setText] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  const [editJournal] = useMutation(EDIT_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId } }],
  });

  const processSetDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  };

  function onSubmit(data) {
    setIsEditing(false);
    setText(data.text);
    editJournal({
      variables: {
        userEmail: me.email,
        journalId: journal._id,
        ...(date ? { date } : { date: journal.date }),
        text: data.text,
      },
    });
    setDate(null);
  }

  function delBtnHandle() {
    const variables = { userEmail: me.email, journalId: journal._id };
    inPopup("deleteJournal");
    localStorage.setItem("selectedStudent", JSON.stringify(variables));
    setIsEditing(false);
  }

  function onChangeTextarea() {
    setIsEditing(true);
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateContainer ref={ref}>
      <DateIcon onClick={onClick}>
        <IcCalender />
      </DateIcon>
    </DateContainer>
  ));
  function onClickCancle() {
    setDate(null);
    setValue("text", journal?.text);
    setIsEditing(false);
  }

  useEffect(() => {
    if (journal) setValue("text", journal?.text);
  }, [journal, setValue]);
  useEffect(() => {
    if (text) setValue("text", text);
  }, [text, setValue]);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <RightContainer>
        <div>{date ? processSetDate(date) : processSetDate(new Date(parseInt(journal.date)))}</div>
        {isEditing && (
          <DatePickers
            dateFormat="yyyy/MM/dd"
            selected={date}
            onChange={(date) => setDate(date)}
            todayButton="오늘"
            locale={ko}
            customInput={<CustomInput />}
          />
        )}
      </RightContainer>
      <LeftContainer>
        <TextareaLayout>
          <TextareaAutosize {...register("text", { onChange: onChangeTextarea })} maxRows="2" minRows="2"></TextareaAutosize>
          {!isEditing && (
            <EditIcon onClick={() => setIsEditing(true)}>
              <BiEdit />
            </EditIcon>
          )}
        </TextareaLayout>
        {isEditing && (
          <BtnLayout>
            {/* <CalIcon>
              <IcCalender />
            </CalIcon> */}

            <TrashIcon onClick={delBtnHandle}>
              <IcCloseTrash />
            </TrashIcon>
            <ModifyBtn type="submit" value="수정하기" />
            <DelBtn onClick={onClickCancle}>취소하기</DelBtn>
          </BtnLayout>
        )}
      </LeftContainer>
    </Container>
  );
};

export default Content;
