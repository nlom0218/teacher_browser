import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import styled from 'styled-components';

const Background = styled.div`
  position : fixed;
  z-index : 980;
  top : 0;
  overflow : hidden;
  width : 100vw;
  height : 100vh;
  display : flex;
  justify-content : center;
  align-items : center;
  background : #6c567b;
  opacity : 0.8;
`;

const Form = styled.div`
  margin-left : 10%;
  position : fixed;
  top : 40%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  z-index : 900;
  width : 300px;
  height : 150px;
  border-radius : 5px;
  box-shadow : 1px 2px 5px 1px #f67280;
  background : white;
`;

const Input = styled.input`
  background : none;
  outline : none;
  border : none;
  border-radius : 1px solid #f67280;
  padding : 0.5rem;
  font-size : 1.125rem;
  line-height : 1.5;
  .button {
      padding-top : 20px;
      background : none;
      outline : none;
      color : #f67280;
      padding-left : 1rem;
      padding-right : 1rem;
      font-size : 1.5rem;
      display : flex;
      align-items : center;
      cursor : pointer;
      transition : 0.1s background ease-in;
  }
`;

const TodoInsertt = ({ onInsertToggle }) => {
    return (
      <Background onClick={onInsertToggle}>
          <Form>
              <Input></Input>
              <button type = "submit">
              <MdAddCircle/>
              </button>
          </Form>
      </Background>
        );
    
};

export default TodoInsertt;