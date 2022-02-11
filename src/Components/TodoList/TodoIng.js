import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import ToDoIngItem from './ToDoIngItem';

const Container = styled.div`
    padding: 20px;
    padding: 1.25rem;
    display: grid;
`

const Title = styled.div`
  font-size: 1em;
  font-size: 1rem;
  padding-bottom: 20px;
  padding-bottom: 1.25rem;
  justify-self: flex-start;
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: flex-end;
  ${customMedia.greaterThan("tablet")`
    font-size: 1.25em;
    font-size: 1.25rem;
  `}
`

const Text = styled.div`
`

const Number = styled.div`
  font-size: 0.875em;
  font-size: 0.875rem;
  color: ${props => props.not ? props.theme.redColor : props.theme.green};
  transition: color 1s ease;
  font-weight: 600;
  ${customMedia.greaterThan("tablet")`
    font-size: 1em;
    font-size: 1rem;
  `}
`

const TitleLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0.625rem;
  height: 0.625rem;
  background-color: ${props => props.not ? props.theme.redColor : props.theme.green};
  opacity: 0.2;
  transition: background-color 1s ease;
`

const ToDoList = styled.div`
    display: grid;
    /* row-gap: 20px;
    row-gap: 1.25rem; */
`

const NoToDo = styled.div`
  text-align: center;
  line-height: 160%;
`

const TodoIng = ({ ingToDos }) => {
  return (<Container>
    <Title>
      <Text>진행중인 할 일</Text>
      <Number>{ingToDos.length}개</Number>
      <TitleLine></TitleLine>
    </Title>
    {ingToDos.length === 0 && <NoToDo>
      <div>진행중인 할 일이 없습니다.</div>
      <div>우측 상단의 +버튼을 눌러 할 일을 생성하세요! 👊</div>
    </NoToDo>}
    <ToDoList>{ingToDos.map((item, index) => {
      return <ToDoIngItem key={index} item={item} />
    })}</ToDoList>
  </Container>

  );
}

export default TodoIng;