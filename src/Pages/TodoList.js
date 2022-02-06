import React, { useEffect, useState } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import TodoHead from '../Components/TodoList/TodoHead';
import styled from 'styled-components';
import TodoCreate from '../Components/TodoList/Popup/TodoCreate';
import { useQuery, useReactiveVar } from '@apollo/client';
import { isPopupVar } from '../apollo';
import TodoIng from '../Components/TodoList/TodoIng';
import AlertMessage from '../Components/Shared/AlertMessage';
import { SEE_TO_DO_LIST_QUERY } from '../Graphql/ToDoList/query';
import useMe from '../Hooks/useMe';

// const ListContainer = styled.div`
//   margin-left : auto;
//   margin-right : auto;
//   padding-bottom : 20px;
// `

const Container = styled.div`
  padding : 40px;
  padding : 2.5rem;
  display : grid;
  grid-template-rows : auto 1fr;
  row-gap : 30px;
  row-gap : 1.875rem;
  min-height : 100%;
  max-height : 100%;
`;

const TodoBody = styled.div`
  position : relative;
  .todo_body {
    position : absolute;
    background-color : ${props => props.theme.cardBg};
    transition : background-color 1s ease;
    border-radius : 5px;
    border-radius : 0.3125rem;
    overflow: scroll;
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox
    ::-webkit-scrollbar {
      display: none; // Chrome, Safari, Opera
    }
  }  
  .ing_todo {
    top : 0;
    bottom : 0;
    left : 0;
    width : 60%;
  }
  .not_ing_todo {
    top : 0;
    bottom : 0;
    right : 0;
    width : 35%;
  }
`;

const TodoList = () => {
  // 1. 기간 내에 있는 할 일 목록 & 완료가 되지 않는 목록 => 진행중인 목록 ing
  // 2. 기간 내에 있는 할 일 목록 & 완료된 목록이면 => 진행중인 목록 맨 아래에 체크된 표시로 있어야 함 ing, complete
  // 3. 기간 내에 없는 할 일 목록 & 완료가 되지 않는 목록 => 미완료된 목록 notcompleted
  // 4. 기간 내에 없는 할 일 목록 & 완료된 목록이면 => 완료된 공간에 두기(팝업) complete
  // 5. 기간이 설정되지 않은 목록 => 진행중인 목록 ing
  // 6. 기간이 설정되지 않은 목록 => 팝업창 complete

  const me = useMe()

  const isPopup = useReactiveVar(isPopupVar);
  const [ingToDos, setIngToDos] = useState([])
  const [notToDos, setNotToDos] = useState([])
  const [inComingToDos, setInComingToDos] = useState([])
  const [errMsg, setErrMsg] = useState(undefined)

  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      isComplete: false
    }
  })

  useEffect(() => {
    if (data) {
      setIngToDos(data?.seeToDoList?.filter(item => item.ingToDo === true))
      setNotToDos(data?.seeToDoList?.filter(item => item.notToDo === true))
      setInComingToDos(data?.seeToDoList?.filter(item => item.inComingToDo === true))
    }
  }, [data])

  return (
    <BasicContainer>
      <Container>
        <TodoHead ingToDosLength={ingToDos.length} />
        <TodoBody>
          <div className="ing_todo todo_body"><TodoIng ingToDos={ingToDos} /></div>
          <div className="not_ing_todo todo_body"></div>
        </TodoBody>
        {/* <DoList todos={todos} onCheckToggle={onCheckToggle}/> */}
      </Container>
      {isPopup === "todoCreate" && <TodoCreate setErrMsg={setErrMsg} userEmail={me?.email} />}
      <AlertMessage msg={errMsg} time={3000} setMsg={setErrMsg} type="error" />
    </BasicContainer>
  )
};


export default TodoList;