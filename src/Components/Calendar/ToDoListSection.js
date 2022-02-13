import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { SEE_TO_DO_LIST_QUERY } from '../../Graphql/ToDoList/query';
import IcToDoList from '../../icons/ToDoList/IcToDoList';
import SectionContainer from './styled/SectionContainer';
import SectionTitle from './styled/SectionTitle';

const Title = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  font-size: 1.25em;
  font-size: 1.25rem;
`

const TitleIcon = styled.div`
  svg {
    display: flex;
  }
`


const ToDoListSection = ({ urlDate }) => {
  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      date: new Date(parseInt(urlDate))
    }
  })
  return (<SectionContainer>
    <SectionTitle>
      <TitleIcon><IcToDoList /></TitleIcon>
      <div>할 일</div>
    </SectionTitle>
  </SectionContainer>);
}

export default ToDoListSection;