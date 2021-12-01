import React from 'react';
import BasicContainer from '../Components/Shared/BasicContainer';
import useMe from "../Hooks/useMe"


const TodoList = () => {
  const { email } = useMe()
  console.log(email);
  return (<BasicContainer>
    할일
  </BasicContainer>);
}

export default TodoList;