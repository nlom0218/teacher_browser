import React from 'react';
import styled from 'styled-components';
import ToDoNotIngItem from './ToDoNotIngItem';

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
  justify-self: flex-start;
  position: relative;
`

const Text = styled.div`
`

const TitleLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0.625rem;
  height: 0.625rem;
  background-color: ${props => props.not ? props.theme.redColor : props.theme.btnBgColor};
  opacity: 0.2;
  transition: background-color 1s ease;
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
      <Title>
        <Text>미완료된 할 일</Text>
        <TitleLine not={true}></TitleLine>
      </Title>
      {notToDos.lenght === 0 ? <NoToDo>미완료된 할 일이 없습니다. 😄</NoToDo> :
        notToDos.map((item, index) => {
          return <ToDoNotIngItem key={index} item={item} type="not" />
        })
      }
    </ToDoListLayout>
    {/* <DivideLine></DivideLine> */}
    <ToDoListLayout>
      <Title>
        <Title>다가오는 할 일</Title>
        <TitleLine></TitleLine>
      </Title>
      {inComingToDos.lenght === 0 ? <NoToDo>다가오는 할 일이 없습니다. 😄</NoToDo> :
        inComingToDos.map((item, index) => {
          return <ToDoNotIngItem key={index} item={item} type="incoming" />
        })
      }
    </ToDoListLayout>
  </Container>);
}

export default ToDoNotIng;