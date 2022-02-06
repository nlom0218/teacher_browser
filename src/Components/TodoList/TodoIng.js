import React from 'react';
import styled from 'styled-components';
import ToDoIngItem from './ToDoIngItem';

const Container = styled.div`
    padding: 20px;
    padding: 1.25rem;
`

const ToDoList = styled.div``

const TodoIng = ({ ingToDos }) => {
    console.log(ingToDos);
    return (<Container>
        <ToDoList>{ingToDos.map((item, index) => {
            return <ToDoIngItem key={index} item={item} />
        })}</ToDoList>
    </Container>

    );
}

export default TodoIng;