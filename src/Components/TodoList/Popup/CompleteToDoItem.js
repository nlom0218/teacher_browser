import React from "react";
import styled from "styled-components";
import { processSetDate, processSetDay } from "../../../shared";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 10px;
  row-gap: 0.3125rem;
  box-sizing: border-box;
`;

const ToDo = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  font-size: 0.875em;
  font-size: 0.875rem;
  opacity: 0.6;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CompleteToDoItem = ({ item }) => {
  const startDate = new window.Date(parseInt(item.startDate));
  const endDate = new window.Date(parseInt(item.endDate));

  return (
    <Container>
      <ToDo>{item.toDo}</ToDo>
      {item.endDate && (
        <Date>
          {`${processSetDate(startDate)} ${processSetDay(startDate)}`} ~{" "}
          {`${processSetDate(endDate)} ${processSetDay(endDate)}`}
        </Date>
      )}
    </Container>
  );
};

export default CompleteToDoItem;
