import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from "../Hooks/useMe"
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../Components/Test/TodoTemplate';
import TodoHead from '../Components/Test/TodoHead';
import TodoList from '../Components/Test/TodoList';
import TodoCreate from '../Components/Test/TodoCreate';
import { TodoProvider } from "../Components/Test/TodoContext";

const GlobalStyle = createGlobalStyle`

`;

function Todo() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default Todo;