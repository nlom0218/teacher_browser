import React from 'react';
import TodoItemm from './TodoItemm';
import styled from 'styled-components';

const ListContainer = styled.div`
  margin-left : auto;
  margin-right : auto;
  padding-bottom : 20px;
`;

const ItemBlock = styled.div`
  margin-left : 15px;
  margin-right : 15px;
  border-radius : 5px;
  box-shadow : 1px 2px 5px 1px #f67280;
  padding : 1rem;
  display : flex;
  align-items : center;
  margin-top : 15px;
`;
const DoList = ({ todos, onCheckToggle }) => {
    
    return (
    <ListContainer>
        {todos.map(todo => (
        <ItemBlock>
        <TodoItemm todo={todo} key={todo.id} onCheckToggle={onCheckToggle}/>
        </ItemBlock>
        ))}
    </ListContainer>
    );
};

export default DoList;