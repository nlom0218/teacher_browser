import React, { useEffect, useState } from 'react';
import { FcDocument, FcPlus } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import routes from '../routes';
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

const AddItemBtn = styled.div`
  align-self: center;
  cursor: pointer;
  svg {
    margin: 0 auto;
    font-size: 2.5em;
    font-size: 2.5rem;
  }
`

const List = () => {
  const [localList, setLocalList] = useState(JSON.parse(localStorage.getItem("localList")))
  useEffect(() => {
    const orderList = localStorage.getItem("localList");
    if (!orderList) {
      const initList = [
        { order: "local1", listName: "리스트1", list: [] },
        { order: "local2", listName: "리스트2", list: [] },
        { order: "local3", listName: "리스트3", list: [] },
      ];
      localStorage.setItem("localList", JSON.stringify(initList));
      setLocalList(initList);
    }
  }, []);
  return (<BasicContainer menuItem={true}>
    <ListContainer>
      {localList && localList.map((item, index) => {
        return <Link to={`${routes.list}/${item.order}`} key={index}>
          <ItemContainer>
            <FcDocument />
            <ItemName>{item.listName}</ItemName>
          </ItemContainer>
        </Link>
      })}
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
      <AddItemBtn><FcPlus /></AddItemBtn>
    </ListContainer>
  </BasicContainer>);
}

export default List;