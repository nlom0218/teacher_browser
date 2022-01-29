import React from 'react';
import { MdDelete, MdDone } from 'react-icons/md';
import styled, { css } from 'styled-components';

const Remove = styled.div`
  display : flex;
  align-items : center;
  justify-contetn : center;
  // color : #dee2e6;
  font-size : 24px;
  font-wieght : bold;
  cursor : pointer;
  &:hover {
      color : #ff6b6b;
  }
  display : none;
`;

const TodoItemBlock = styled.div`
  display : flex;
  align-items : center;
  padding-top : 12px;
  padding-bottom : 12px;
  &:hover {
      // color : #ff6b6b;
      ${Remove} {
        display : initial;
      }
  }
`;

const CheckCirecle = styled.div`
  width : 32px;
  height : 32px;
  border-radius : 16px;
  border : 3px solid #ced4da;
  font-size : 24px;
  font-wieght : bold;
  display : flex;
  align-items : center;
  justify-content : center;
  margin-right : 20px;
  cursor : pointer;
  ${props =>
    props.done &&
    css`
        border : 1px solid;
        color : #38d9a9;
        `}
`;

const Text = styled.div`
  flex : 1;
  font-size : 21px;
  font-wieght : bold;
  // color : #495057;
  ${props =>
    props.done &&
    css`
        // color : #ced4da;
        `}
`;

function TodoItem ( {id, done, text }) {
    return(
        <TodoItemBlock>
            <CheckCirecle done={done}>{done && <MdDone/>}</CheckCirecle>
            <Text done = {done}>{text}</Text>
            <Remove>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );
}

export default TodoItem;
