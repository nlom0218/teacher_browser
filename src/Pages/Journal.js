import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { BtnFadeIn } from "../Animations/Fade";
import { inputLine } from "../Animations/InputLine";
import BasicContainer from "../Components/Shared/BasicContainer";
import { customMedia } from "../styles";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 40px;
  padding: 2.5rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
`;

const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns: 1fr auto;
  column-gap:20px;
  column-gap:1.25rem;
 `}
  ${customMedia.greaterThan("desktop")`
  grid-template-columns: 1fr;
  column-gap: 60px;
  column-gap: 3.75rem;
  `} /* padding : 20px 20px 0px 0px;
   padding : 1.25rem 1.25rem 0rem 0rem; */
`;

const Date = styled.div`
  height: 50px;
  background-color: red;
`;

const Select = styled.div``;

const Main = styled.div`
  height: 500px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const 수업 = styled.div`
  background-color: #fbcee1;
  grid-column: ${({ 전체 }) => (전체 ? "1/5" : "1/7")};
  grid-row: ${({ 전체 }) => (전체 ? "1/3" : "1/4")};
`;
const 출결 = styled.div`
  background-color: #f5e6c3;
  grid-column: ${({ 전체 }) => (전체 ? "5/7" : "1/7")};
  grid-row: ${({ 전체 }) => (전체 ? "1/2" : "1/4")};
`;
const 상담 = styled.div`
  background-color: #fff88a;
  grid-column: ${({ 전체 }) => (전체 ? "5/7" : "1/7")};
  grid-row: ${({ 전체 }) => (전체 ? "2/3" : "1/4")};
`;
const 알림장 = styled.div`
  background-color: #bae4ae;
  grid-column: ${({ 전체 }) => (전체 ? "1/4" : "1/7")};
  grid-row: ${({ 전체 }) => (전체 ? "3/4" : "1/4")};
`;
const 메모 = styled.div`
  background-color: #a4e4e9;
  grid-column: ${({ 전체 }) => (전체 ? "4/7" : "1/7")};
  grid-row: ${({ 전체 }) => (전체 ? "3/4" : "1/4")};
`;

const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
   grid-row : 1/2;
  `}
`;

const Input = styled.input`
  width : 100%;
  font-size : 1.5em;
  font-size : 1.5rem;
  padding : 10px 0px;
  padding : 0.625rem 0rem;
`;

const InputLayout = styled.div``;

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

const SubmitInput = styled.input`
  background-color: ${(props) => props.theme.btnBgColor};
  padding: 10px 30px;
  padding: 0.625rem 1.875rem;
  cursor: pointer;
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  animation: ${BtnFadeIn} 0.6s ease;
`;

const Journal = () => {
  const [title, setTitle] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);

  const [전체, set전체] = useState(true);
  const [수업보기, set수업보기] = useState(true);
  const [출결보기, set출결보기] = useState(true);
  const [상담보기, set상담보기] = useState(true);
  const [알림장보기, set알림장보기] = useState(true);
  const [메모보기, set메모보기] = useState(true);

  const 전체보기 = (boolean) => {
    set전체(boolean);
    set수업보기(boolean);
    set출결보기(boolean);
    set상담보기(boolean);
    set알림장보기(boolean);
    set메모보기(boolean);
  };

  const 하나씩보기 = (함수) => {
    전체보기(false);
    함수(true);
  };

  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "학급일지 제목" },
  });

  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit({ title });
  };

  const onClickInput = () => {
    setIsEdit(true);
  };

  return (
    <BasicContainer menuItem={true}>
      <Container>
        <TopContents>
          <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
            <InputLayout>
              <Input
                {...register("title", {
                  required: true,
                  onChange: () => setIsEdit(true),
                })}
                type="text"
                placeholder="제목을 입력하세요."
                autoComplete="off"
                onClick={onClickInput}
              />

              {isEdit && (
                <LineBox>
                  <Line></Line>
                </LineBox>
              )}
            </InputLayout>
            {isEdit && <SubmitInput type="submit" value="저장" />}
          </Title>
        </TopContents>
        <Date>
          <button>이전날</button>
          <button>2021년</button>
          <button>1월</button>
          <button>21일</button>
          <button>금요일</button>
          <button>다음날</button>
        </Date>
        <Select>
          <button onClick={() => 전체보기(true)}>전체보기</button>
          <button onClick={() => 하나씩보기(set수업보기)}>수업</button>
          <button onClick={() => 하나씩보기(set출결보기)}>출결</button>
          <button onClick={() => 하나씩보기(set상담보기)}>상담</button>
          <button onClick={() => 하나씩보기(set알림장보기)}>알림장</button>
          <button onClick={() => 하나씩보기(set메모보기)}>메모</button>
        </Select>
        <Main className="메인">
          <수업 hidden={!수업보기} onClick={() => 하나씩보기(set수업보기)} 전체={전체}>
            수업 화면입니다.
          </수업>
          <출결 hidden={!출결보기} onClick={() => 하나씩보기(set출결보기)} 전체={전체}>
            출결 화면입니다.
          </출결>
          <상담 hidden={!상담보기} onClick={() => 하나씩보기(set상담보기)} 전체={전체}>
            상담 화면입니다.
          </상담>
          <알림장 hidden={!알림장보기} onClick={() => 하나씩보기(set알림장보기)} 전체={전체}>
            알림장 화면입니다.
          </알림장>
          <메모 hidden={!메모보기} onClick={() => 하나씩보기(set메모보기)} 전체={전체}>
            메모 화면입니다.
          </메모>
        </Main>
      </Container>
    </BasicContainer>
  );
};

export default Journal;
