import React, { useEffect, useState } from "react";
import BasicContainer from "../Components/Shared/BasicContainer";
import NeedLoginPopupContainer from "../Components/Shared/NeedLoginPopupContainer";
import TodoHead from "../Components/TodoList/TodoHead";
import styled from "styled-components";
import TodoCreate from "../Components/TodoList/Popup/TodoCreate";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isPopupVar } from "../apollo";
import TodoIng from "../Components/TodoList/TodoIng";
import AlertMessage from "../Components/Shared/AlertMessage";
import { SEE_TO_DO_LIST_QUERY } from "../Graphql/ToDoList/query";
import useMe from "../Hooks/useMe";
import { useParams } from "react-router";
import ToDoDetail from "../Components/TodoList/ToDoDetail";
import Loading from "../Components/Shared/Loading";
import ToDoNotIng from "../Components/TodoList/ToDoNotIng";
import { compare } from "../shared";
import DetailToDo from "../Components/TodoList/Popup/DetailToDo";
import { customMedia } from "../styles";
import CompleteToDo from "../Components/TodoList/Popup/CompleteToDo";
import DelAllToDos from "../Components/TodoList/Popup/DelAllToDos";
import useTitle from "../Hooks/useTitle";
import ToDoHelper from "../Components/TodoList/Popup/ToDoHelper";

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  grid-template-rows: auto 1fr;
  row-gap: 30px;
  row-gap: 1.875rem;
  min-height: 100%;
  max-height: 100%;
  ${customMedia.greaterThan("tablet")`
    padding : 40px;
    padding : 2.5rem;
  `}
`;

const TodoBody = styled.div`
  position: relative;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("desktop")`
      display: block;
      row-gap: 0px;
      row-gap: 0rem;
   `}
  .todo_container {
    background-color: ${(props) => props.theme.cardBg};
    transition: background-color 1s ease;
    border-radius: 5px;
    border-radius: 0.3125rem;
    ${customMedia.greaterThan("desktop")`
      position : absolute;
      overflow: scroll;
      -ms-overflow-style: none; // IE and Edge
      scrollbar-width: none; // Firefox
      ::-webkit-scrollbar {
        display: none; // Chrome, Safari, Opera
      }
    `}
  }
`;

const IngToDoContainer = styled.div`
  ${customMedia.greaterThan("desktop")`
    top : 0;
    bottom : 0;
    left : 0;
    width : 55%;
  `}
`;

const NotIngToDoContainer = styled.div`
  margin-bottom: 40px;
  margin-bottom: 2.5rem;
  ${customMedia.greaterThan("desktop")`
    top : 0;
    bottom : 0;
    right : 0;
    width : 40%;
    margin-bottom: 0px;
    margin-bottom: 0rem;
  `}
`;

const TodoList = () => {
  useTitle("티처캔 | 할 일");

  const me = useMe();
  const { id } = useParams();

  const isPopup = useReactiveVar(isPopupVar);
  const [ingToDos, setIngToDos] = useState([]);
  const [notToDos, setNotToDos] = useState([]);
  const [inComingToDos, setInComingToDos] = useState([]);
  const [errMsg, setErrMsg] = useState(undefined);
  const [msg, setMsg] = useState(undefined);

  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      isComplete: false,
    },
  });

  useEffect(() => {
    if (data) {
      const newIngToDo = [];
      const newNotToDo = [];
      const newInComintToDo = [];
      data?.seeToDoList?.forEach((item) => {
        if (!item.startDate) {
          newIngToDo.push({ ...item, type: "ing" });
        } else if (new Date(parseInt(item.startDate)) > new Date().setHours(0, 0, 0, 0)) {
          newInComintToDo.push({ ...item, type: "inComing" });
        } else if (new Date(parseInt(item.endDate)) < new Date().setHours(0, 0, 0, 0)) {
          newNotToDo.push({ ...item, type: "not" });
        } else {
          newIngToDo.push({ ...item, type: "ing" });
        }
      });
      setIngToDos(newIngToDo.sort(compare("endDate")));
      setNotToDos(newNotToDo.sort(compare("endDate")));
      setInComingToDos(newInComintToDo.sort(compare("startDate")));
    }
  }, [data]);

  if (loading) {
    return <Loading page="mainPage" />;
  }

  return (
    <BasicContainer screen="small">
      <Container>
        <TodoHead userEmail={me?.email} />
        <TodoBody>
          <IngToDoContainer className="todo_container">
            <TodoIng ingToDos={ingToDos} />
          </IngToDoContainer>
          <NotIngToDoContainer className="todo_container">
            {id && <ToDoDetail id={id} userEmail={me?.email} setErrMsg={setErrMsg} setMsg={setMsg} />}
            {!id && <ToDoNotIng notToDos={notToDos} inComingToDos={inComingToDos} />}
          </NotIngToDoContainer>
        </TodoBody>
        {/* <DoList todos={todos} onCheckToggle={onCheckToggle}/> */}
      </Container>
      {isPopup === "todoCreate" && <TodoCreate setErrMsg={setErrMsg} userEmail={me?.email} setMsg={setMsg} />}
      {isPopup === "toDoComplete" && <CompleteToDo setErrMsg={setErrMsg} userEmail={me?.email} />}
      {isPopup === "detailToDo" && <DetailToDo setErrMsg={setErrMsg} userEmail={me?.email} setMsg={setMsg} />}
      {isPopup === "confirmDelAll" && <DelAllToDos setMsg={setMsg} userEmail={me?.email} />}
      {isPopup === "toDoHelper" && <ToDoHelper />}
      {isPopup === "needLogin" && <NeedLoginPopupContainer />}
      <AlertMessage msg={errMsg} time={3000} setMsg={setErrMsg} type="error" />
      <AlertMessage msg={msg} time={3000} setMsg={setMsg} type="success" />
    </BasicContainer>
  );
};

export default TodoList;
