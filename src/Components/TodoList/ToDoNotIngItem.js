import React from 'react';
import styled from 'styled-components';
import { processSetDate, processSetDay } from '../../shared';
import ToDoItem from './styled/ToDoItem';

const ToDo = styled.div`
  grid-column: 1 / 3;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Date = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.type === "not" ? props.theme.redColor : props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  justify-self: flex-end;
`

const ToDoNotIngItem = ({ item, type }) => {
  const endDate = new window.Date(parseInt(item.endDate))
  const startDate = new window.Date(parseInt(item.startDate))
  return (<ToDoItem>
    <ToDo>{item.toDo}</ToDo>
    {type === "not" && <Date type={type}>~ {processSetDate(endDate)} {processSetDay(endDate)}</Date>}
    {type === "incoming" && <Date>{processSetDate(endDate)} {processSetDay(endDate)} ~</Date>}
  </ToDoItem>);
}

export default ToDoNotIngItem;