import React from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

const InsertFormPositioner = styled.div`
  width : 100%;
  bottom : 0;
  left : 10;
  position : absolute;  
`;

const InsertForm = styled.form`
  background :
  padding-left : 32px;
  padding-top : 32px;
  padding-right : 32px;
  padding-bottom : 72px;

  border-bottom-left-radius : 16px;
  border-bottom-right-radius : 16px;
  border-top : 1px;
`;

const Input = styled.input`
  padding : 12px;
  border-radius : 4px;
  border : 1px;
  width : 100%;
  outline : none;
  font-size : 18px;
  box-sizing : border-box;
`;

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
`;  


const TodoInsert = () => {
    const [open, setOpen] = useState(false);
    const onToggle = () => setOpen(!open);

    return(
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm>
                        <Input autoFocus placeholder = "할 일을 입력하세요."/>
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd/>
            </CircleButton>
        </>
    );
}

export default TodoInsert;