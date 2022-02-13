// 리액트
import React, { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";

// 팝업
import { outPopup } from "../../../apollo";

// 그래프큐엘
import { useMutation } from "@apollo/client";
import { SEE_ONE_STUDENT_QUERY } from "../../../Graphql/Student/query";
import { WRITE_JOURNAL_MUTATION } from "../../../Graphql/Journal/mutation";

// 라이브러리 컴포넌트
import TextareaAutosize from "react-textarea-autosize";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

// 스타일 & 컴포넌트
import styled from "styled-components";
import { customMedia } from "../../../styles";
import PopupContainer from "../../Shared/PopupContainer";
import IcCalender from "../../../icons/Calender/IcCalender";
import IcCalenderClick from "../../../icons/Calender/IcCalenderClick";

const Form = styled.form`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 20px;
  row-gap: 1.25rem;
  min-height: 100%;
  max-height: 100%;
  textarea {
    all: unset;
    min-height: 100%;
    max-height: 100%;
    width: 100%;
    resize: none;
    padding: 20px;
    padding: 1.25rem;
    box-sizing: border-box;
    border-radius: 5px;
    border-radius: 0.3125rem;
    background-color: #ffffff;
    line-height: 160%;
    color: ${(props) => props.theme.fontColor};
    ::placeholder {
      color: ${(props) => props.theme.fontColor};
      opacity: 0.8;
      transition: color 1s ease, opacity 1s ease;
    }
  }
`;

const Container = styled.div`
  display: grid;
  align-items: center;
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto;
  `}
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
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-items: end;
  column-gap: 10px;
  column-gap: 0.625rem;
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

const Btn = styled.div`
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  div {
    padding: 12px 40px;
    padding: 0.75rem 2.5rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
    text-align: center;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`;

const DelBtn = styled.input`
  padding: 12px 40px;
  padding: 0.75rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
`;

const CancleBtn = styled.div`
  background-color: ${(props) => props.theme.redColor};
  color: ${(props) => props.theme.bgColor};
`;

//
const Pop_WriteJournal = ({ me }) => {
  const [isHover, setIsHover] = useState(false);
  const [date, setDate] = useState(new Date());

  // 학생 정보 불러오기
  const studentObj = JSON.parse(localStorage.getItem("selectedStudent"));
  const { register, handleSubmit } = useForm();
  const [writeJournal, { loading }] = useMutation(WRITE_JOURNAL_MUTATION, {
    refetchQueries: [{ query: SEE_ONE_STUDENT_QUERY, variables: { studentId: studentObj.studentId } }],
  });

  const processSetDate = () => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
  };

  // 학급 일지 저장하는 함수
  function onSubmit(data) {
    if (data.text.trim() === "") return;
    if (loading) return;
    writeJournal({ variables: { userEmail: me.email, ownerId: studentObj.studentId, date, text: data.text } });
    outPopup();
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateContainer ref={ref}>
      <div>{processSetDate(date)}</div>
      <DateIcon onClick={onClick} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        {isHover ? <IcCalenderClick /> : <IcCalender />}
      </DateIcon>
    </DateContainer>
  ));

  return (
    <PopupContainer maxHeight={true}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <div>
            {studentObj.studentNumber && `${studentObj.studentNumber}번`} {studentObj.studentName}
          </div>
          <DatePickers
            dateFormat="yyyy/MM/dd"
            selected={date}
            onChange={(date) => setDate(date)}
            todayButton="오늘"
            locale={ko}
            customInput={<CustomInput />}
          />
        </Container>
        <TextareaAutosize {...register("text")} placeholder="기록을 적어주세요."></TextareaAutosize>
        <Btn>
          <DelBtn type="submit" value="기록하기" />
          <CancleBtn onClick={() => outPopup()}>취소하기</CancleBtn>
        </Btn>
      </Form>
    </PopupContainer>
  );
};

export default Pop_WriteJournal;
