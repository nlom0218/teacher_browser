import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import useMedia from '../../Hooks/useMedia';
import IcHelper from '../../icons/Helper/IcHelper';
import { customMedia } from '../../styles';

const TodoHeadBlock = styled.div`
  display : grid;
  grid-template-columns : 1fr auto;
  column-gap : 20px;
  column-gap : 1.25rem;
  ${customMedia.greaterThan("tablet")`
    column-gap : 40px;
    column-gap : 2.5rem;
  `}
`;

const HeadLayout = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
  h1 {
      font-size : 1.25em;
      font-size : 1.25rem;
      ${customMedia.greaterThan("tablet")`
      font-size : 2em;
      font-size : 2rem;
      `}
  }
  .day {
      font-size : 1em;
      font-size : 1rem;
      opacity : 0.7;
      ${customMedia.greaterThan("tablet")`
      font-size : 1.25em;
      font-size : 1.25rem
      `}
  }
`;

const ButtonContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.5rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-self: flex-start;
  align-items: center;
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr auto auto;
  `}
`;

const ComleteToDo = styled.div`
  cursor: pointer;
  align-self: center;
  background-color : ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  padding: 10px;
  padding: 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  font-size : 0.875rem;
  font-size : 0.875em;
  ${customMedia.greaterThan("tablet")`
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    font-size : 1rem;
    font-size : 1em;
  `}
`

const AddIcon = styled.div`
  cursor: pointer;
  color : ${props => props.theme.btnBgColor};
  transition : color 1s ease;
  font-size : 2rem;
  font-size : 2em;
  grid-row: 1 / 2;
  justify-self: flex-end;
  svg {
      display : flex;
  }
  ${customMedia.greaterThan("tablet")`
    font-size : 2.5rem;
    font-size : 2.5em;
  `}
`

const HelpIcon = styled.div`
  cursor: pointer;
  font-size : 2.5rem;
  font-size : 2.5em;
  grid-row: 1 / 2;
  justify-self: flex-end;
  svg {
      display : flex;
  }
  ${customMedia.greaterThan("tablet")`
    font-size : 3rem;
    font-size : 3em;
  `}
`

const TodoHead = ({ userEmail }) => {
  const media = useMedia()
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
    if (userEmail) {
      inPopup("todoCreate")
    } else {
      inPopup("needLogin")
    }
  }

  const onClickCompleteBtn = () => {
    if (userEmail) {
      inPopup("toDoComplete")
    } else {
      inPopup("needLogin")
    }
  }

  const onClickHelper = () => {
    inPopup("toDoHelper")
  }

  return (
    <TodoHeadBlock>
      <HeadLayout>
        <h1>{processSetDate()}</h1>
        <div className="day">{processSetDay()}</div>
      </HeadLayout>
      <ButtonContent>
        <ComleteToDo onClick={onClickCompleteBtn}>완료된 할 일</ComleteToDo>
        <AddIcon onClick={onClickCreateBtn}><MdAddCircle /></AddIcon>
        {media === "Desktop" && <HelpIcon onClick={onClickHelper}><IcHelper /></HelpIcon>}
      </ButtonContent>
    </TodoHeadBlock>
  );
}

export default TodoHead;