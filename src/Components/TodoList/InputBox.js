import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useState } from 'react/cjs/react.development';

const TodoListBlock = styled.div`
  flex : 1;
  padding : 20px 32px;
  padding-bottom : 48px;
  overflow-y : auto;
`;

const InputBox = () => {

  const [todos, setTodos] = useState([
    {
      id : 1,
      text : "할 일 1",
      checked : true
    },
    {
      id : 2,
      text : "할 일2",
      checked : false
    }
  ]);
    return(
      <TodoListBlock>
        <TodoItem text = "테스트1" done={true} />
        <TodoItem text = "테스트2" done={false} />
      </TodoListBlock>
    );
}

export default InputBox;