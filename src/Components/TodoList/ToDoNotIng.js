import React from 'react';
import styled from 'styled-components';
import ToDoNotItem from './ToDoNotItem';

const Container = styled.div`
    padding: 20px;
    padding: 1.25rem;
    display: grid;
    row-gap: 40px;
    row-gap: 2.5rem;
`

const ToDoListLayout = styled.div`
  display: grid;
`

const DivideLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.hoverColor};
  transition: background-color 1s ease;
`

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
`

const NoToDo = styled.div`
  text-align: center;
  color: ${props => props.theme.redColor};
  transition: color 1s ease;
`

const ToDoNotIng = ({ notToDos, inComingToDos }) => {
  console.log(notToDos);
  console.log(inComingToDos);
  return (<Container>
    <ToDoListLayout>
      <Title>미완료된 할 일</Title>
      {notToDos.lenght === 0 ? <NoToDo>미완료된 할 일이 없습니다. 😄</NoToDo> :
        notToDos.map((item, index) => {
          return <ToDoNotItem key={index} item={item} />
        })
      }
    </ToDoListLayout>
    {/* <DivideLine></DivideLine> */}
    <ToDoListLayout>
      <Title>다가오는 할 일</Title>
      {inComingToDos.lenght !== 0 ? <NoToDo>다가오는 할 일이 없습니다. 😄</NoToDo> : <div></div>}
    </ToDoListLayout>
  </Container>);
}

export default ToDoNotIng;