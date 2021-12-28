import React, { useState } from 'react';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  row-gap: 10px;
  row-gap: 0.625rem;
  cursor: pointer;
`

const ListIcon = styled.div`
  align-self: flex-end;
  svg {
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const ListName = styled.div`
  align-self: flex-start;
  text-align: center;
`

const ListItem = ({ listName }) => {
  const [mouseEnter, setMouseEnter] = useState(false)
  const onMouseEnterList = () => setMouseEnter(true)
  const onMouseLeaveList = () => setMouseEnter(false)
  return (<Container onMouseEnter={onMouseEnterList} onMouseLeave={onMouseLeaveList}>
    <ListIcon>{mouseEnter ? <FcOpenedFolder /> : <FcFolder />}</ListIcon>
    <ListName>{listName}</ListName>
  </Container>
  );
}

export default ListItem;