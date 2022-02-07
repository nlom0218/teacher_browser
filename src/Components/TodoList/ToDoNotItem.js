import React from 'react';
import styled from 'styled-components';
import { processSetDate, processSetDay } from '../../shared';
import ToDoItem from './styled/ToDoItem';

const ToDo = styled.div`
  grid-column: 1 / 3;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
`

const EndDate = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  justify-self: flex-end;
`

const ToDoNotItem = ({ item }) => {
  const endDate = new window.Date(parseInt(item.endDate))
  return (<ToDoItem>
    <ToDo>{item.toDo}</ToDo>
    <EndDate>~ {processSetDate(endDate)} {processSetDay(endDate)}</EndDate>
  </ToDoItem>);
}

export default ToDoNotItem;