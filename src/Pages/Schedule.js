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
import { RiCheckboxBlankLine,RiCheckboxLine } from "react-icons/ri";
import TimeTableFont from "../Components/Schedule/TimeTableFont";
import TimeTableGrid from "../Components/Schedule/TimeTableGrid";
import { useReactiveVar } from "@apollo/client";
import ClassRegisterPage from "../Components/Schedule/Popup/ClassRegisterPage";
import ClassTimeSet from "../Components/Schedule/Popup/ClassTimeSet";



const date = new Date()
const processSetDay = () => {
  const day = date.getDay()
  if (day === 1) {
    return "월요일"
  } else if (day === 2) {
    return "화요일"
  } else if (day === 3) {
    return "수요일"
  } else if (day === 4) {
    return "목요일"
  } else if (day === 5) {
    return "금요일"
  } else if (day === 6) {
    return "토요일"
  } else if (day === 0) {
    return "일요일"
  }
}
const processSetDate = () => {
  return `${date.getFullYear()}년 ${(date.getMonth() + 1)
    .toString()
    .padStart(2, 0)}월 ${date.getDate().toString().padStart(2, 0)}일`
}





//시간설정에서 누른 값을 바탕으로 시간 계산 함수 만들기 -> timetable out item으로 보내기
//시간설정 완료 눌렀을 때 outPopup이 안 됨. 
//시간보기 버튼 눌렀을 때 아이콘 안 바뀜
//칸 안에는 삭제아이콘 없앨까?
//수업정보를 어떻게 받아서 전달????
//태그랑 태그 관리 
//음영표시 어떻게? 체크?? 보더??
//음영한 뒤 다크모드에서 글씨 안 보임. 
// 인쇄기능



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
  h1 {
    font-size: 0.9rem;
    font-size: 0.9em;
    opacity: 0.7;
  }
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
  const [fontSize, setFontSize] = useState(1.25)
  const [viewTime, setViewTime] = useState(false);


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
    inPopup("registerTimeSet");
   }

   const onClickTimeviewBtn = () => {
    setViewTime(!viewTime);
   }


   
  


  return (
    <BasicContainer menuItem={true}>
      <DivideLeftContents>
        <Container>
          <TopContents>
            <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
            <InputLayout>
            <h1>{processSetDate()} {processSetDay()}</h1>
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
    
        </TopContents>
        <OptionContents>
        <OptionBtn onClick={onClickTimeSetBtn}> 시간설정 </OptionBtn>
        <TypeBtn onClick={onClickTimeviewBtn}> {viewTime===true?<RiCheckboxLine/>:<RiCheckboxBlankLine/>}  <div> 시간 보기 </div> </TypeBtn>



        <TimeTableFont fontSize={fontSize} setFontSize={setFontSize}/>
        </OptionContents>
  <TimeTableHeight>
  <TimeTableGrid fontSize={fontSize} setFontSize={setFontSize} viewTime={viewTime} setViewTime={setViewTime}/>


  </TimeTableHeight>
        </Container>
        {isPopup === "registerClass" && <ClassRegisterPage/>}
        {isPopup === "registerTimeSet" && <ClassTimeSet />}
      </DivideLeftContents>
    </BasicContainer>
  )
}

export default Schedule;
