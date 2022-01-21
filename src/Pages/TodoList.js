import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import styled from 'styled-components';
import { customMedia } from '../styles';
import { useState } from 'react/cjs/react.development';
import { useForm } from 'react-hook-form';
import { inputLine } from '../Animations/InputLine';
import { BtnFadeIn } from '../Animations/Fade';
import TodoInsert from '../Components/TodoList/TodoInsert';
import { MdAdd } from 'react-icons/md';
import InputBox from '../Components/TodoList/InputBox';

const Container = styled.div`
  display : grid;
  grid-template-rows : auto auto 1fr;
  padding : 40px;
  padding : 2.5rem;
  row-gap : 20px;
  row-gap : 1.25rem;
`;

const TopContents = styled.div`
  display : grid;
  gritd-template-columns : 1fr;
  row-gap : 20px;
  row-gap : 1.25rem;
  align-items : center;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns: 1fr auto;
  column-gap:20px;
  column-gap:1.25rem;
 `}
 ${customMedia.greaterThan("desktop")`
  grid-template-columns: 1fr;
  column-gap: 60px;
  column-gap: 3.75rem;
  `}
  /* padding : 20px 20px 0px 0px;
   padding : 1.25rem 1.25rem 0rem 0rem; */
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
`
const Input = styled.input`
  width : 100%;
  font-size : 1.5rem;
  font-size : 1.5em;
  padding : 10px 0px;
  padding : 0.625rem 0rem;
`

const InputLayout = styled.div`
`;

const LineBox = styled.div`
  position : relative;
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
  width : 100%;
  display : grid;
  row-gap : 20px;
  row-gap : 1.25rem;
  text-align : center;
  ${customMedia.greaterThan("tablet")`
  grid-template-columns : auto auto 1fr;
  column-gap : 20px;
  column-gap : 1.25rem;
  `}
`
const OptionBtn = styled.div`
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px 40px;
  padding: 0.625rem 2.5rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  cursor: pointer;
`

const AddSub = styled.div`
  justify-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  svg {
    display: flex;
    font-size: 1.5em;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const TodoList = () => {

  const [title, setTitle] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, getValues } = useForm({
    mode : "onChange",
    defaultValues : { title : "오늘의 할 일 목록"},
  });

  const onSubmit = (data) => {
    const { title } = data;
    setTitle(title);
    setIsEdit(false);
  };

  const onBlurForm = () => {
    const title = getValues("title");
    onSubmit( {title} );
  };

  const onClickInput = () => {
    setIsEdit(true);
  };


  return (
  <BasicContainer>
    <Container>
      <TopContents>
        <Title onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
          <InputLayout>
            <Input
              {...register("title", {
                required : true,
                onChange : () => setIsEdit(true),
              })}
              type = "text"
              placeholder = "제목을 입력하세요."
              autocomplete = "off"
              onClick = {onClickInput}
            />
            {isEdit && (
            <LineBox>
              <Line></Line>
            </LineBox>
            )}
          </InputLayout>
          {isEdit && <SubmitInput
          type = "submit"
          value = "저장"
          />}
        </Title>
      </TopContents>
      
        <OptionContents>
          <OptionBtn>할 일 목록</OptionBtn>
          <AddSub>
            <MdAdd/>
          </AddSub>
        </OptionContents>
      
      <InputBox></InputBox>
      <TodoInsert></TodoInsert>
    </Container>
  </BasicContainer>);
}

export default TodoList;