import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from "../Hooks/useMe"


const TodoList = () => {
  const me = useMe()
  console.log(me?.email);
  return (<BasicContainer>
    할일
  </BasicContainer>);
}

export default TodoList;