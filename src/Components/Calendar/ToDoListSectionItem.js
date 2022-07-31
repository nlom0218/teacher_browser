import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { useParams } from "react-router";
import styled, { keyframes } from "styled-components";
import { COMPLETE_TO_DO_LIST_MUTATION } from "../../Graphql/ToDoList/mutation";
import { SEE_TO_DO_LIST_QUERY } from "../../Graphql/ToDoList/query";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import { processSetDate, processSetDay } from "../../shared";
import { inPopup } from "../../apollo";

const completeToDoAni = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

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
`;

const ToDoItem = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.notComplete ? "auto 1fr auto" : "1fr auto")};
  column-gap: 5px;
  column-gap: 0.3125rem;
  row-gap: 5px;
  row-gap: 0.3125rem;
  align-items: flex-start;
  border-bottom: 1px solid ${(props) => props.theme.hoverColor};
  transition: border-bottom 1s ease;
  padding-bottom: 10px;
  padding-bottom: 0.625rem;
  margin-bottom: 0.625rem;
  animation: ${(props) => props.complete && completeToDoItemAni} 2s ease forwards;
`;

const CheckIcon = styled.div`
  padding: 5px 0px;
  padding: 0.3125rem 0rem;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1em;
    font-size: 1rem;
  }
`;

const ToDo = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  border-radius: 0.3125rem;
  :hover {
    background-color: ${(props) => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
`;

const Star = styled.div`
  grid-column: -2 / -1;
  padding: 5px 0px;
  padding: 0.3125rem 0rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  justify-self: flex-end;
  svg {
    :not(:last-child) {
      margin-right: 5px;
      margin-right: 0.3125rem;
    }
  }
`;

const BottomContents = styled.div`
  column-gap: 5px;
  column-gap: 0.3125rem;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: ${(props) => props.notComplete && "1fr auto"};
  align-items: center;
`;

const ToDoType = styled.div`
  justify-self: flex-end;
  align-self: center;
  position: relative;
`;
const TitleLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 8px;
  top: 0.5rem;
  height: 8px;
  height: 0.5rem;
  background-color: ${(props) => props.type === "ing" && props.theme.green};
  background-color: ${(props) => props.type === "not" && props.theme.redColor};
  background-color: ${(props) => props.type === "inComing" && props.theme.btnBgColor};
  opacity: 0.2;
  /* transition: background-color 1s ease; */
`;

const Date = styled.div`
  padding: 5px;
  padding: 0.3125rem;
  background-color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.type === "ing" && props.theme.green};
  background-color: ${(props) => props.type === "not" && props.theme.redColor};
  background-color: ${(props) => props.type === "inComing" && props.theme.btnBgColor};
  color: ${(props) => props.theme.bgColor};
  /* transition: background-color 1s ease, color 1s ease; */
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  justify-self: flex-end;
`;

const CompleteLine = styled.div`
  position: absolute;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor};
  top: 50%;
  transform: translate(0, -50%);
  animation: ${completeToDoAni} 1s ease;
`;

const ToDoListSectionItem = ({ item, urlDate }) => {
  const { id } = useParams();

  const [endDate, setEndDate] = useState(undefined);
  const [complete, setComplete] = useState(false);

  const onCompleted = (result) => {
    const {
      completeToDoList: { ok },
    } = result;
    if (ok) {
      setComplete(false);
    }
  };

  const [completeToDoList, { loading }] = useMutation(COMPLETE_TO_DO_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: true } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { date: new window.Date(parseInt(urlDate)) } },
    ],
  });

  const onClickCheck = () => {
    setComplete((prev) => !prev);
    setTimeout(() => {
      completeToDoList({
        variables: {
          userEmail: item.userEmail,
          id: item._id,
        },
      });
    }, 1000);
  };

  const onClickToDo = () => {
    inPopup("detailToDo");
    localStorage.setItem("detailToDo", item._id);
  };

  useEffect(() => {
    if (!item.endDate) {
      setEndDate(undefined);
    }
    if (item.endDate) {
      const endDdate = new window.Date(parseInt(item.endDate));
      const startDate = new window.Date(parseInt(item.startDate));
      setEndDate(
        `${processSetDate(startDate)} ${processSetDay(startDate)} ~ ${processSetDate(endDdate)} ${processSetDay(
          endDdate,
        )}`,
      );
    }
  }, [item]);
  return (
    <ToDoItem notComplete={item.type === "complete" ? false : true} complete={complete} ing={true}>
      {item.type !== "complete" && (
        <CheckIcon onClick={onClickCheck}>
          {complete ? <RiCheckboxCircleLine /> : <RiCheckboxBlankCircleLine />}
        </CheckIcon>
      )}
      <ToDo onClick={onClickToDo} isSeleted={id === item._id}>
        {item.toDo}
        {complete && <CompleteLine></CompleteLine>}
      </ToDo>
      <Star star={item.star}>
        {item.star > 0 && <BsStarFill />}
        {item.star > 1 && <BsStarFill />}
        {item.star > 2 && <BsStarFill />}
        {item.star > 3 && <BsStarFill />}
        {item.star > 4 && <BsStarFill />}
      </Star>
      <BottomContents notComplete={item.type === "complete" ? false : true}>
        {item.type !== "complete" && (
          <ToDoType>
            <div>{item.type === "ing" && "진행중인 할 일"}</div>
            <div>{item.type === "not" && "미완료된 할 일"}</div>
            <div>{item.type === "inComing" && "다가오는 할 일"}</div>
            <TitleLine type={item.type}></TitleLine>
          </ToDoType>
        )}
        {endDate && <Date type={item.type}>{endDate}</Date>}
      </BottomContents>
    </ToDoItem>
  );
};

export default ToDoListSectionItem;
