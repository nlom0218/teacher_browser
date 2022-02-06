import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankCircleLine } from "react-icons/ri"
import { processSetDate, processSetDay } from '../../shared';

const ToDoItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  align-items: center;
  :not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.hoverColor};
    transition: border-bottom 1s ease;
    padding-bottom: 10px;
    padding-bottom: 0.625rem;
    margin-bottom: 0.625rem;
  }
`

const Line = styled.div`
  height: 100%;
  width: 8px;
  width: 0.5rem;
  background-color: ${props => props.theme.green};
  transition: background-color 1s ease;
`

const CheckIcon = styled.div`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  svg {
    display: flex;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`

const ToDo = styled.div`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  font-size: 1.2em;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
`

const Date = styled.div`
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
`

const ToDoIngItem = ({ item }) => {
  const [endDate, setEndDate] = useState(undefined)

  useEffect(() => {
    if (item.endDate) {
      const date = new window.Date(parseInt(item.endDate))
      setEndDate(`${processSetDate(date)} ${processSetDay(date)}`)
    }
  }, [item])
  return (<ToDoItem>
    {/* <Line></Line> */}
    <CheckIcon><RiCheckboxBlankCircleLine /></CheckIcon>
    <ToDo>{item.toDo}</ToDo>
    {endDate && <Date>~ {endDate}</Date>}
  </ToDoItem>);
}

export default ToDoIngItem;