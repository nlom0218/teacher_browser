import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from "../Hooks/useMe"
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from '../Components/Test/TodoTemplate';
import TodoHead from '../Components/Test/TodoHead';
import TodoList from '../Components/Test/TodoList';
import TodoCreate from '../Components/Test/TodoCreate';

// const TodoList = () => {
//   const me = useMe()
//   console.log(me?.email);
//   return (<BasicContainer>
//     할일
//   </BasicContainer>);
// }

// export default TodoList;


const GlobalStyle = createGlobalStyle`

`;

function Todo() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default Todo;