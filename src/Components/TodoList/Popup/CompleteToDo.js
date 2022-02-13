import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { SEE_TO_DO_LIST_QUERY } from '../../../Graphql/ToDoList/query';
import { compare } from '../../../shared';
import { customMedia } from '../../../styles';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import CompleteToDoItem from './CompleteToDoItem';

const Container = styled.div`
  padding: 20px 10px;
  padding: 1.25rem 0.625rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
`

const Top = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`

const Title = styled.div`
  font-size: 1.25em;
  font-size: 1.25rem;
`

const DelAllBtn = styled.div`
  padding: 10px 20px;
  background-color: ${props => props.theme.redColor};
  color: ${props => props.theme.bgColor};
  border-radius: 5px;
  border-radius: 0.3125rem;
`

const CompletToDoList = styled.div`
  display: grid;
  border: 1px solid ${props => props.theme.cardHoverBg};
  background-color: ${props => props.theme.cardHoverBg};
  row-gap: 1px;
  column-gap: 1px;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr;
  `}
`

const CompleteToDo = () => {

  const { data, loading } = useQuery(SEE_TO_DO_LIST_QUERY, {
    variables: {
      isComplete: true
    }
  })

  console.log(data);

  if (loading) {
    return (<Loading page="popupPage" />)
  }

  return (<PopupContainer maxHeight={true}>
    <Container>
      <Top>
        <Title>완료된 할 일 {data?.seeToDoList.length}개</Title>
        <DelAllBtn>모두 삭제하기</DelAllBtn>
      </Top>
      <CompletToDoList>
        {[...data?.seeToDoList].sort(compare("startDate")).map((item, index) => {
          return <CompleteToDoItem key={index} item={item} />
        })}
        {data?.seeToDoList.length % 2 === 1 && <CompleteToDoItem item={{ toDo: undefined, startDate: undefined, endDate: undefined }} />}
      </CompletToDoList>
    </Container>
  </PopupContainer>);
}

export default CompleteToDo;