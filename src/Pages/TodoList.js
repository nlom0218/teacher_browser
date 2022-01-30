import React, { useEffect, useState } from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import TodoHead from '../Components/TodoList/TodoHead';
import styled from 'styled-components';
import TodoCreate from '../Components/TodoList/TodoCreate';
import { useReactiveVar } from '@apollo/client';
import { isPopupVar } from '../apollo';
import TodoIng from '../Components/TodoList/TodoIng';

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
  .not_completed_todo {
    top : 0;
    bottom : 0;
    right : 0;
    width : 35%;
  }
`;

  const toDoListArr = [
    { 
      teacherEmail : "sksthsaudgml@naver.com", // 필수값
      startDate : "string", // startDate, endDate는 세트로 있으면 기간이 있음
      endDate : "string", // 무기한... 현재 날짜가 endDate보다 앞설 경우 미완료된 투두리스트로 이동
      toDo : "사과 먹기", // 필수값
      contents : "맛있는 사과 먹기",  // => 제목만으로 부족할 때 추가 설명
      isComplete : false, // 기본값 => false
      ingTodo : "Boolean",
      notTodo : "Boolean"
    },
    {
      teacherEmail : "sksthsaudgml@naver.com", // 필수값
      startDate : "string", // startDate, endDate는 세트로 있으면 기간이 있음
      endDate : "string", // 무기한... 현재 날짜가 endDate보다 앞설 경우 미완료된 투두리스트로 이동
      toDo : "토마토 먹기", // 필수값
      isComplete : false, // 기본값 => false
      ingTodo : "Boolean",
      notTodo : "Boolean"
    },
  
    {
      teacherEmail : "sksthsaudgml@naver.com", // 필수값
      startDate : "string", // startDate, endDate는 세트로 있으면 기간이 있음
      endDate : "string", // 무기한... 현재 날짜가 endDate보다 앞설 경우 미완료된 투두리스트로 이동
      toDo : "포도 먹기", // 필수값
      contents : "맛있는 포도 먹기",  // => 제목만으로 부족할 때 추가 설명
      isComplete : false, // 기본값 => false
      ingTodo : "Boolean",
      notTodo : "Boolean"
    }
  ]

const TodoList = () => {
    // 1. 기간 내에 있는 할 일 목록 & 완료가 되지 않는 목록 => 진행중인 목록 ing
    // 2. 기간 내에 있는 할 일 목록 & 완료된 목록이면 => 진행중인 목록 맨 아래에 체크된 표시로 있어야 함 ing, complete
    // 3. 기간 내에 없는 할 일 목록 & 완료가 되지 않는 목록 => 미완료된 목록 notcompleted
    // 4. 기간 내에 없는 할 일 목록 & 완료된 목록이면 => 완료된 공간에 두기(팝업) complete
    // 5. 기간이 설정되지 않은 목록 => 진행중인 목록 ing
    // 6. 기간이 설정되지 않은 목록 => 팝업창 complete

  const isPopup = useReactiveVar(isPopupVar);
  const [toDos, setToDos] = useState(toDoListArr);
  const [ingTodos, setIngTodos] = useState([])

  useEffect(() => {
    //ing 로 갈 할 일 목록
    const newIngTodos = () => {

    } 
  }, [toDos])

  console.log(toDos);

  return(
    <BasicContainer>
      <Container>
      <TodoHead todoLength={toDos.length}/>
      <TodoBody>
        <div className="ing_todo todo_body"><TodoIng toDos={toDos}/></div>
        <div className="not_completed_todo todo_body"></div>
      </TodoBody>
      {/* <DoList todos={todos} onCheckToggle={onCheckToggle}/> */}
      {isPopup === "todoCreate" && <TodoCreate setToDos={setToDos} toDos={toDos}/>}
      </Container>
    </BasicContainer>
  )
};


export default TodoList;