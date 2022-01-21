import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex : 1;
  padding : 20px 32px;
  padding-bottom : 48px;
  overflow-y : auto;
`;

const InputBox = () => {
    return(
      <TodoListBlock>
        <TodoItem text = "테스트1" done={true} />
        <TodoItem text = "테스트2" done={false} />
      </TodoListBlock>
    );
}

export default InputBox;