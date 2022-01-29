import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import styled from 'styled-components';

const Content = styled.div`
  .content{
    cursor : pointer;
    flex : 1;
    display : flex;
    align-items : center;
    font-weight : bold;
  }
  .content svg{
    font-size : 1.5rem;
    color : #f67280;
  }
  .content .text{
    margin-left : 0.5rem;
    flex : 1;
  }
  .content.checked .text {
    color : #6c567b;
    text-decoration : line-through;
    cursor : pointer;
    opacity : 0.6;
  }
`;

const TodoItemm = ({ todo, onCheckToggle }) => {
    const { id, text, checked } = todo;
    return (
      <div className = "TodoItemm">
        <Content>
        <div className = {`content ${checked ? "checked" : ''}`}>
            {checked ? (
            <MdCheckBox 
            onClick={() => {
              onCheckToggle(id);
              }}
              />
              ) : (
              <MdCheckBoxOutlineBlank 
              onClick ={() => {
                onCheckToggle(id);
              }}
              />
              )}
            <div className = "text">{text}</div>
            </div>
            </Content>
      </div>
    );
};

export default TodoItemm;