import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { RiCheckboxBlankCircleLine, RiCheckboxCircleLine } from "react-icons/ri";
import { processSetDate, processSetDay } from "../../shared";
import { BsStarFill } from "react-icons/bs";
import { useMutation } from "@apollo/client";
import { COMPLETE_TO_DO_LIST_MUTATION } from "../../Graphql/ToDoList/mutation";
import { SEE_TO_DO_LIST_QUERY } from "../../Graphql/ToDoList/query";
import { useNavigate, useParams } from "react-router";
import routes from "../../routes";
import ToDoItem from "./styled/ToDoItem";
import { customMedia } from "../../styles";
import useMedia from "../../Hooks/useMedia";
import { inPopup } from "../../apollo";

const completeToDoAni = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

const CheckIcon = styled.div`
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1em;
    font-size: 1rem;
    ${customMedia.greaterThan("tablet")`
      font-size: 1.25em;
      font-size: 1.25rem;
    `}
  }
`;

const ToDo = styled.div`
  grid-column: 2 / -1;
  padding: 10px;
  padding: 0.625rem;
  font-size: 1em;
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  border-radius: 0.625rem;
  :hover {
    background-color: ${(props) => props.theme.contentBgColor};
    transition: background-color 0.6s ease;
  }
  ${customMedia.greaterThan("tablet")`
    grid-column: 2 / 3;
    font-size: 1.2em;
    font-size: 1.2rem;
  `}
`;

const Star = styled.div`
  grid-column: 1 / 3;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  font-size: 0.875em;
  font-size: 0.875rem;
  color: ${(props) => props.theme.redColor};
  transition: color 1s ease;
  svg {
    :not(:last-child) {
      margin-right: 5px;
      margin-right: 0.3125rem;
    }
  }
  ${customMedia.greaterThan("tablet")`
    grid-column: 3 / 4;
    font-size: 1em;
    font-size: 1rem;
  `}
`;

const Date = styled.div`
  grid-column: 3 / 4;
  padding: 10px;
  padding: 0.625rem;
  background-color: ${(props) => props.theme.green};
  color: ${(props) => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  border-radius: 20px;
  border-radius: 1.25rem;
  font-size: 0.75em;
  font-size: 0.75rem;
  justify-self: flex-end;
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / -1;
    font-size: 0.875em;
    font-size: 0.875rem;
  `}
`;

const CompleteLine = styled.div`
  position: absolute;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor};
  top: 50%;
  transform: translate(0, -50%);
  animation: ${completeToDoAni} 1s ease;
`;

const ToDoIngItem = ({ item }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const media = useMedia();

  const [endDate, setEndDate] = useState(undefined);
  const [complete, setComplete] = useState(false);

  const onCompleted = (result) => {
    const {
      completeToDoList: { ok },
    } = result;
    if (ok) {
      setComplete(false);
      if (id === item._id) {
        navigate(routes.todo);
      }
    }
  };

  const [completeToDoList, { loading }] = useMutation(COMPLETE_TO_DO_LIST_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: false } },
      { query: SEE_TO_DO_LIST_QUERY, variables: { isComplete: true } },
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
    if (media === "Desktop") {
      navigate(`${routes.todo}/${item._id}`);
    } else {
      inPopup("detailToDo");
      localStorage.setItem("detailToDo", item._id);
    }
  };

  useEffect(() => {
    if (!item.endDate) {
      setEndDate(undefined);
    }
    if (item.endDate) {
      const date = new window.Date(parseInt(item.endDate));
      setEndDate(`${processSetDate(date)} ${processSetDay(date)}`);
    }
  }, [item]);
  return (
    <ToDoItem complete={complete} ing={true}>
      {/* <Line></Line> */}
      <CheckIcon onClick={onClickCheck}>
        {complete ? <RiCheckboxCircleLine /> : <RiCheckboxBlankCircleLine />}
      </CheckIcon>
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
      {endDate && <Date>~ {endDate}</Date>}
    </ToDoItem>
  );
};

export default ToDoIngItem;
