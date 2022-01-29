import React from 'react'
import styled from 'styled-components';

const TemplateBox = styled.div`
  // flex : 1;
  // padding-top : 20px;
  // max-height : 100vh;
  // .title {
  // width : 90vw;
  // margin-left : auto;
  // margin-right : auto;
  // padding-bottom : 20px;
  // font-size : 1.5rem;
  // font-weight : bold;
  // color : #6c567b;
  // }
`;

const TodoTemplate = ({ children }) => {
    return(
        <TemplateBox>
         {children}
        </TemplateBox>
    );
};

export default TodoTemplate;