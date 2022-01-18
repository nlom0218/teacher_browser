import React, { useMemo,useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import styled from "styled-components";
import { DivideLeftContents } from "../Components/Shared/styled/DivideContents";
import { customMedia } from "../styles";
import { inputLine } from "../Animations/InputLine";
import { BtnFadeIn } from "../Animations/Fade";
import { inPopup, isPopupVar } from "../apollo";
import useMedia from "../Hooks/useMedia";
import { useForm } from "react-hook-form";
import { RiCheckboxBlankLine } from "react-icons/ri";
import TimeTableFont from "../Components/Schedule/TimeTableFont";
import {TiPlusOutline} from "react-icons/ti";
import TimeTableGrid from "../Components/Schedule/TimeTableGrid";
import { useReactiveVar } from "@apollo/client";
import ClassRegisterPage from "../Components/Schedule/ClassRegisterPage";

const Container = styled.div`
  min-height: "100%";
  display: grid;
  grid-template-rows: auto auto 1fr;
  padding: 20px;
  padding: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: flex-start;
  ${customMedia.greaterThan("desktop")`
   padding:0`}
`;
const TopContents = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  row-gap: 1.25rem;
  align-items: center;
`;

const Title = styled.form`
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: 2em;
  font-size: 2rem;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  //text-align:center;
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
const OptionContents = styled.div`
  width: 100%;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 10px;
  column-gap: 0ch.625rem;
  text-align: center;
  grid-template-columns : auto auto 1fr;
`;
const OptionBtn = styled.div`
  background-color: ${(props) => props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`;
const AddSub = styled.div`
  grid-row: 1/2;
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 2.5em;
    font-size: 2.5rem;
    cursor: pointer;
  }
`;
const AddSubBtn = styled.div``;



const TypeBtn = styled.div`
align-self: flex-end;
cursor: pointer;
display: flex;
svg{
    margin-right: 5px;
    margin-right:0.3125rem;
    display:flex;
}
`


const TimeTableHeight = styled.div`
height: 100%;
width: 100%;
`

const Schedule = () => {

  const isPopup = useReactiveVar(isPopupVar);


  const media = useMedia();

  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(undefined);
  const [fontSize, setFontSize] = useState(1)


  const { register, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: { title: "우리반 시간표" },
  });


  const onClickInput = () => {setIsEdit(true);};
  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit({ title });
  };
  
   const onClickTimeSetBtn = () => {

   }
   const onClickAddSub = () =>{}



  return (
    <BasicContainer menuItem={true}>
      <DivideLeftContents>
        <Container>
          <TopContents>
            <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
            <InputLayout>
            <Input
            {...register("title",{
              required:true,
              onChange : () => setIsEdit(true),
            })}
            type="text"
            placeholder="제목을 입력하세요"
            autoComplete="off"
            onClick={onClickInput} />
            {isEdit && (
                <LineBox>
                  <Line></Line>
                </LineBox>
              )}
            </InputLayout>
            {isEdit && <SubmitInput type="submit" value="저장" />}
          </Title>
          <AddSub>
            <AddSubBtn>수업추가/변경</AddSubBtn>
            <TiPlusOutline onClick={onClickAddSub}/>
          </AddSub>
        </TopContents>
        <OptionContents>
        <OptionBtn onClick={() => onClickTimeSetBtn}> 시간설정하기 </OptionBtn>
        <TypeBtn> <RiCheckboxBlankLine/> <div> 시간 보기 </div> </TypeBtn>
        <TimeTableFont fontSize={fontSize} setFontSize={setFontSize}/>
        </OptionContents>
  <TimeTableHeight>
  <TimeTableGrid fontSize={fontSize}/>

  </TimeTableHeight>
        </Container>
        {isPopup === "registerSchool" && <ClassRegisterPage />}

      </DivideLeftContents>
    </BasicContainer>
  )
}

export default Schedule;
