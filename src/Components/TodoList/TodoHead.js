import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { customMedia } from '../../styles';

const TodoHeadBlock = styled.div`
  display : grid;
  grid-template-columns : 1fr auto;
  column-gap : 40px;
  column-gap : 2.5rem;
`;

const HeadLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  h1 {
      font-size : 1.5em;
      font-size : 1.5rem;
      ${customMedia.greaterThan("tablet")`
      font-size : 2em;
      font-size : 2rem;
      `}
  }
  .day {
      font-size : 1.25em;
      font-size : 1.25rem;
      opacity : 0.7;
  }
  .tasks-left {
    color : ${props => props.theme.green};
    transition: color 1s ease;
    font-size : 1.25em;
    font-size : 1.25rem;
    font-weight : bold;
  }
`;

const ButtonContent = styled.div`
  cursor : pointer;
  font-size : 2.5rem;
  font-size : 2.5em;
  color : ${props => props.theme.btnBgColor};
  transition : color 1s ease;
  svg {
      display : flex;
  }
`;

const TodoHead = ({ ingToDosLength }) => {
  const date = new Date()
  const processSetDay = () => {
    const day = date.getDay()
    if (day === 1) {
      return "월요일"
    } else if (day === 2) {
      return "화요일"
    } else if (day === 3) {
      return "수요일"
    } else if (day === 4) {
      return "목요일"
    } else if (day === 5) {
      return "금요일"
    } else if (day === 6) {
      return "토요일"
    } else if (day === 0) {
      return "일요일"
    }
  }
  const processSetDate = () => {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1)
      .toString()
      .padStart(2, 0)}월 ${date.getDate().toString().padStart(2, 0)}일`
  }

  const onClickCreateBtn = () => {
    inPopup("todoCreate")
  }

  return (
    <TodoHeadBlock>
      <HeadLayout>
        <h1>{processSetDate()}</h1>
        <div className="day">{processSetDay()}</div>
        <div className="tasks-left">할 일 {ingToDosLength}개 남음</div>
      </HeadLayout>
      <ButtonContent>
        <MdAddCircle onClick={onClickCreateBtn} />
      </ButtonContent>
    </TodoHeadBlock>
  );
}

export default TodoHead;