import React, { useEffect, useState } from 'react';
import { FcDocument, FcPlus } from 'react-icons/fc';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AllList from '../Components/List/AllList';
import StudentList from '../Components/List/StudentList';
import BasicContainer from '../Components/Shared/BasicContainer';
import { customMedia } from '../styles';



const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: flex-start;
`

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 60px;
  row-gap: 3.75rem;
  column-gap: 30px;
  column-gap: 1.875rem;
  align-items: flex-start;
  justify-items: center;
  padding: 40px;
  padding: 2.5rem;
 ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}

`

const ItemContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
  row-gap: 0.625rem;
  cursor: pointer;
  svg {
    margin: 0 auto;
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const ItemName = styled.div`
  font-weight: 400;
  text-align: center;
`

const List = () => {
  const { type, id } = useParams()


  return (<BasicContainer menuItem={true}>
    <Container>
      {!type && <AllList />}
      {type === "student" && "학생 상세 정보 보기 및 수정"}
      <StudentList />
    </Container>
  </BasicContainer>);
}

export default List;