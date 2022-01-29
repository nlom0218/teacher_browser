import React, { useState } from 'react';
import { MdAddCircle } from "react-icons/md"
import styled from 'styled-components';
import PopupContainer from '../Shared/PopupContainer';

// const BackgroundLayout = styled.div`
// //   position : relative;
//   z-index : 980;
//   top : 0;
//   overflow : hidden;
//   width : 70vw;
//   height : 20vh;
//   display : flex;
//   justify-content : center;
//   align-items : center;
//   background : #6c567b;
//   opacity : 0.8;
// `
// const RegisterForm = styled.form`
// width: 100%;
// display: grid;
// column-gap: 20px;
// column-gap: 1.25rem;
// grid-template-columns: 1fr;
// align-items: center;
// svg {
//   font-size: 1.875em;
//   font-size: 1.875rem;
//   cursor: pointer;
// `;

const Form = styled.form`
    //   margin-left : 10%;
    //   position: : relative:
    //   top : 40%;
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
    z-index : 990;
    height : 300px;
    border-radius : 5px;
    box-shadow : 1px 2px 5px 1px #f67280;
`

const Input = styled.input`
  background : none;
  outline : none;
  border : none;
  border-bottom : 1px solid #f67280;
  padding : 0.5rem;
  font-size : 1.125rem;
  line-height : 1.5;
`

const Button = styled.button`
  padding-top : 20px;
  background : none;
  outline : none;
  border : none;
  color : #f67280;
  padding-left : 1rem;
  padding-right : 1rem;
  font-size : 1.5rem;
  align-items : center;
  cursor : pointer;
  transition : 01s background ease-in;
`

const TodoCreate = ({ onInsertToggle, onInsertTodo }) => {

    const [value, setValue] = useState("");
    const onChange = e => {
        setValue(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        onInsertTodo(value);
        setValue("");
        onInsertToggle();
    }

    return(
            <PopupContainer>
            <div className="background" onClick={onInsertToggle}></div>
            <Form onSubmit={onSubmit}>
                <Input 
                placeholder = "내용을 입력하세요"
                value = {value} onChange = {onChange}
                >
                </Input>
                <Button type ="submit">
                    <MdAddCircle/>
                </Button>
            </Form>
            </PopupContainer>
        
    );
}

export default TodoCreate;