import styled from "styled-components";
import { customMedia } from "../../../styles";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  row-gap: 30px;
  row-gap: 1.875rem;
  height: 96%;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  position: absolute;
  left: 50%;
  width: 90%;
  transform: translate(-50%, 0);
`

export const List = styled.div`
  max-height: 100%;
  align-self: flex-start;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  display: grid;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    column-gap: 2.5rem;
  `}
  .noStudnet {
    grid-column: 1 / -1;
    text-align: center;
    color: ${props => props.theme.redColor};
  }
`

// student Item
export const Item = styled.div`
  padding: 10px;
  padding: 0.625rem;
  cursor: pointer;
  :hover {
    background-color: ${props => props.theme.hoverColor};
    transition: background-color 0.6s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
  }
  display: ${props => props.addStudent && "grid"};
  grid-template-columns: ${props => props.addStudent && "1fr auto"};
  svg {
    font-size: 1.25rem;
    font-size: 1.25em;
    cursor: pointer;
  }
  align-items: ${props => props.addStudent && "center"};
`

export const Btn = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 10px 20px;
  padding: 0.625rem 1.25rem;
  background-color: ${props => props.theme.btnBgColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
  transition: background-color 1s ease, color 1s ease;
`
