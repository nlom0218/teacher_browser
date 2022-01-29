import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import styled from 'styled-components';
import { BtnFadeIn } from '../../../Animations/Fade';
import { inputLine } from '../../../Animations/InputLine';

const TodoListNameLayout = styled.form`
  padding : 10px 0px;
  padding : 0.625rem 0rem;
  display : grid;
  row-gap : 20px;
  row-gap : 1.25rem;
  column-gap : 40px;
  column-gap : 2.5rem;
`;

const Title = styled. div`
`;

const InputLayout = styled. div`
  
`;

const Input = styled.input`
  width : 100%;
//   font-size : 1.5em;
//   font-size : 1.5rem;
  padding : 10px 0px;
  padding : 0.625rem 0rem;
`
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
  text-align : center;
`;

const DetailTodoListLayout = styled.div`
  padding: 20px 0px;
  padding: 1.25rem 0rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
`;

const DetailTitle = styled.div`
  font-weight: 600;
  padding: 20px 0px;
  padding: 1.25rem 0rem;
`;

const TodoListNamee = () => {

  const [title, setTitle] = useState(undefined);
  const [isEdit, setIsEdit] = useState(false);


  const { register, handleSubmit, getValues } = useForm({
      mode : "onChange",
      defaultValues : {title : "할 일 목록"},
  });

  const onSubmit = (data) => {
      const {title } = data;
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

    return(
        <DetailTodoListLayout>
          <DetailTitle> 할 일 목록 </DetailTitle>
            <TodoListNameLayout onSubmit={handleSubmit(onSubmit)} onBlur={onBlurForm}>
              <InputLayout>
                <Input
                  {...register("title", {
                    required : true,
                    onChange : () => setIsEdit(true),
                  })}
                  type = "text"
                  placeholder = "할 일 목록을 입력하세요."
                  autoComplete = "off"
                  onClick={onClickInput}
                />

                {isEdit && (
                <LineBox>
                    <Line></Line>
                </LineBox>
                )}
              </InputLayout>
              {isEdit && <SubmitInput type = "submit" value = "저장"/>}
            </TodoListNameLayout>

        </DetailTodoListLayout>
    );
}

export default TodoListNamee; 