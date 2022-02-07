import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { processSetDate, processSetDay } from '../../shared';
import ToDoItem from './styled/ToDoItem';

const ToDo = styled.div`
  grid-column: 1 / 3;
  padding: 10px 5px;
  padding: 0.625rem 0.3125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 10px;
  border-radius: 0.625rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
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

  const onClickToDo = () => {
    inPopup("detailToDo")
    localStorage.setItem("detailToDo", item._id)
  }

  return (<ToDoItem>
    <ToDo onClick={onClickToDo}>{item.toDo}</ToDo>
    {type === "not" && <Date type={type}>~ {processSetDate(endDate)} {processSetDay(endDate)}</Date>}
    {type === "incoming" && <Date>{processSetDate(startDate)} {processSetDay(startDate)} ~</Date>}
  </ToDoItem>);
}

export default ToDoNotIngItem;