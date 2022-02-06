import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from "react-icons/ri"
import { processSetDate, processSetDay } from '../../shared';
import { BsStarFill } from 'react-icons/bs';
import { useMutation } from '@apollo/client';
import { COMPLETE_TO_DO_LIST_MUTATION } from "../../Graphql/ToDoList/mutation"
import { SEE_TO_DO_LIST_QUERY } from '../../Graphql/ToDoList/query';
import { useNavigate, useParams } from 'react-router';
import routes from '../../routes';

const completeToDoAni = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

const completeToDoItemAni = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ToDoItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: flex-start;
  border-bottom: 1px solid ${props => props.theme.hoverColor};
  transition: border-bottom 1s ease;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
  animation: ${props => props.complete && completeToDoItemAni} 2s ease forwards;
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
  padding: 10px;
  padding: 0.625rem;
  font-size: 1.2em;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  background-color: ${props => props.isSeleted && props.theme.contentBgColor};
  transition: background-color 1s ease;
  border-radius: 10px;
  border-radius: 0.625rem;
  :hover {
    background-color: ${props => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
`

const Star = styled.div`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
  svg {
    :not(:last-child) {
    margin-right: 5px;
    margin-right: 0.3125rem;
  }
  }
`

const Date = styled.div`
  grid-column: 1 / -1;
  padding: 10px;
  padding: 0.625rem;
  background-color: ${props => props.theme.green};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  justify-self: flex-end;
`

const CompleteLine = styled.div`
  position: absolute;
  height: 1px;
  background-color: ${props => props.theme.fontColor};
  top: 50%;
  transform: translate(0, -50%);
  animation: ${completeToDoAni} 1s ease;
`

const ToDoIngItem = ({ item }) => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [endDate, setEndDate] = useState(undefined)
  const [complete, setComplete] = useState(false)

  const [completeToDoList, { loading }] = useMutation(COMPLETE_TO_DO_LIST_MUTATION, {
    refetchQueries: [{ query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } }]
  })

  const onClickCheck = () => {
    setComplete(prev => !prev)
    setTimeout(() => {
      completeToDoList({
        variables: {
          userEmail: item.userEmail,
          id: item._id
        }
      })
    }, 1000)
  }

  const onClickToDo = () => {
    navigate(`${routes.todo}/${item._id}`)
  }

  useEffect(() => {
    if (!item.endDate) {
      setEndDate(undefined)
    }
    if (item.endDate) {
      const date = new window.Date(parseInt(item.endDate))
      setEndDate(`${processSetDate(date)} ${processSetDay(date)}`)
    }
  }, [item])
  return (<ToDoItem complete={complete}>
    {/* <Line></Line> */}
    <CheckIcon onClick={onClickCheck}>{complete ? <RiCheckboxCircleLine /> : <RiCheckboxBlankCircleLine />}</CheckIcon>
    <ToDo onClick={onClickToDo} isSeleted={id === item._id}>{item.toDo}
      {complete && <CompleteLine></CompleteLine>}
    </ToDo>
    <Star star={item.star}>
      {item.star > 0 && <BsStarFill />}
      {item.star > 1 && <BsStarFill />}
      {item.star > 2 && <BsStarFill />}
      {item.star > 3 && <BsStarFill />}
      {item.star > 4 && <BsStarFill />}
    </Star>
    {endDate && <Date>~ {endDate}</Date>}
  </ToDoItem>);
}

export default ToDoIngItem;