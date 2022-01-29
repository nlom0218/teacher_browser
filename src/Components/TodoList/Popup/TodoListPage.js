import React, { useState } from 'react';
import PopupContainer from '../../Shared/PopupContainer';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import useMe from '../../../Hooks/useMe';
import TodoListName from './TodoListName';
import TodoListDate from './TodoListDate';
import TodoListNamee from './TodoListNamee';

const RegisterForm = styled.form`
width: 100%;
display: grid;
column-gap: 20px;
column-gap: 1.25rem;
grid-template-columns: 1fr;
align-items: center;
svg {
  font-size: 1.875em;
  font-size: 1.875rem;
  cursor: pointer;
}
`

const TodoListPage = (item={item}) => {

    // const {
    //   date : lmDate}
    //   = JSON.parse(localStorage.getItem("lmSetting"))

    // const [date, setDate] = useState(lmDate ? new window.Date(lmDate) : new window.Date());

    const me = useMe()

    // const processSetDate = () => {
    //   return `${date.getFullYear()}년 ${(date.getMonth() + 1)
    //     .toString()
    //     .padStart(2, 0)}월 ${date.getDate().toString().padStart(2, 0)}일`
    // }

    const [ prevetSubmit, setPreventSubmit ] = useState(false)

    const { register, handleSubmit, setValue, getValues } = useForm()
    const onSubmit = (data) => {

    }

    return( <PopupContainer>
      <RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <TodoListName/>
        {/* <TodoListDate date={date} setDate={setDate} processSetDate={processSetDate} /> */}
        <TodoListNamee/>
      </RegisterForm>
    </PopupContainer>
    );
}

export default TodoListPage; 