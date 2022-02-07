import styled, { keyframes } from "styled-components";
import { customMedia } from "../../../styles";

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
  grid-template-columns: ${props => props.ing ? "auto 1fr auto" : "1fr auto"};
  column-gap: 10px;
  column-gap: 0.625rem;
  row-gap: 10px;
  row-gap: 0.625rem;
  align-items: flex-start;
  border-bottom: 1px solid ${props => props.theme.hoverColor};
  transition: border-bottom 1s ease;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
  animation: ${props => props.complete && completeToDoItemAni} 2s ease forwards;
  ${customMedia.greaterThan("tablet")`
    column-gap: 20px;
    column-gap: 1.25rem;
  `}  
`

export default ToDoItem