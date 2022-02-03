import React, { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { MdAddCircle } from "react-icons/md"
import styled from 'styled-components';
import { outPopup } from '../../apollo';
import PopupContainer from '../Shared/PopupContainer';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { GrPowerReset } from "react-icons/gr"



const Form = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display : grid;
  grid-template-rows : auto 1fr auto auto; 
  row-gap : 20px;
  row-gap : 1.25rem;
  min-height : 100%;
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
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    background-color: #ffffff;
    line-height: 160%;
    ::placeholder {
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    transition: color 1s ease, opacity 1s ease;
}
}
`;

const Input = styled.input`
width: 100%;
background-color: #ffffff;
padding: 15px 20px;
padding: 0.9375rem 1.25rem;
border-radius: 5px;
border-radius: 0.3125rem;
::placeholder {
  color: ${props => props.theme.fontColor};
  opacity: 0.8;
  transition: color 1s ease, opacity 1s ease;
}
`;


const SubmitBtn = styled.input`
  cursor : pointer;
  background-color : ${props => props.theme.btnBgColor};
  color : ${props => props.theme.bgColor};
  padding : 10px;
  padding : 0.625rem;
  text-align : center;
  border-radius : 5px;
  border-radius : 0.3125rem;
`;

const SetDate = styled.div`
    display : grid;
    grid-template-columns : 1fr 1fr auto;
    column-gap : 20px;
    column-gap : 1.25rem;
    row-gap : 10px;
    row-gap : 0.625rem;
    input,
    .create_todo_no_date {
        width : 100%;
        background-color : #ffffff;
        text-align : center;
        padding : 5px;
        padding : 0.3125rem;
        border-radius : 5px;
        border-radius : 0.3125rem;
        cursor : pointer;
    }
`

const StartDate = styled.div`
  display : grid;
  grid-template-columns : auto 1fr;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
`

const DateType = styled.div`
`

const EndDate = styled.div`
  display : grid;
  grid-template-columns : auto 1fr;
  align-items : center;
  column-gap : 20px;
  column-gap : 1.25rem;
`;
const ResetBtn = styled.div`
  align-self : center;
  svg {
      display : flex;
      font-size : 1.25em;
      font-size : 1.25rem;
  }
`;

const TodoCreate = ({ setToDos, toDos }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { register, handleSubmit, } = useForm({
        mode: "onChange"
    })

    const onSubmit = (data) => {
        if (startDate) {
            if (!endDate) {
                window.alert("종료일을 설정해주세요.")
                return
            }
            if (startDate > endDate) {
                window.alert("시작일과 종료일을 다시 확인해주세요.")
                return
            }
        }
        if (endDate) {
            if (!startDate) {
                window.alert("시작일을 설정해주세요.")
                return
            }
        }

        const { toDo, contents } = data
        const newTodo = {
            teacherEmail: "sksthsaudgml@naver.com",
            toDo,
            ...(contents && { contents }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate })
        }
        const newTodoArr = [...toDos, newTodo]
        setToDos(newTodoArr)
        outPopup()
    }

    const onClickResetDateBtn = () => {
        setStartDate(null)
        setEndDate(null)
    }

    return (
        <PopupContainer maxHeight={true}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register("todo", {
                        required: true
                    })}
                    placeholder="내용을 입력하세요"
                    autoComplete="off"
                >
                </Input>
                <textarea
                    {...register('contents')}
                    placeholder="세부내용을 입력하세요">
                </textarea>
                <SetDate>
                    <StartDate>
                        <DateType>시작일</DateType>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="yyyy/MM/dd"
                            locale={ko}
                            placeholderText="시작일 설정"
                        />
                    </StartDate>
                    <EndDate>
                        <DateType>종료일</DateType>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="yyyy/MM/dd"
                            locale={ko}
                            placeholderText="종료일 설정"
                        />
                    </EndDate>
                    <ResetBtn onClick={onClickResetDateBtn}><GrPowerReset></GrPowerReset></ResetBtn>
                </SetDate>

                <SubmitBtn
                    type="submit"
                    value="등록하기"
                />
            </Form>
        </PopupContainer>

    );
}

export default TodoCreate;