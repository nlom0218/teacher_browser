import React from 'react';
import { FcDocument, FcPlus } from 'react-icons/fc';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import { customMedia } from '../styles';

const ListContainer = styled.div`
    min-height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 60px;
  row-gap: 3.75rem;
  column-gap: 30px;
  column-gap: 1.875rem;
  align-content: flex-start;
  justify-items: center;
  padding: 40px;
  padding: 2.5rem;
 ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  `}
  svg {
    margin: 0 auto;
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const List = () => {
  return (<BasicContainer menuItem={true}>
    <ListContainer>
      <div><FcDocument /></div>
      <div><FcDocument /></div>
      <div><FcDocument /></div>
      <div><FcDocument /></div>
      <div><FcPlus /></div>
    </ListContainer>
  </BasicContainer>);
}

export default List;