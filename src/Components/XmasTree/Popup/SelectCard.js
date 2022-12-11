import styled from "styled-components";
import React from "react";
import { useState } from "react";

const SelectCardBox = styled.div`
  padding: 1px;
  padding: 0.0625rem;
  height: 60px;
  background: url(${(props) => props.item});
  background-size: cover;
  background-repeat: no-repeat;
  border: ${(props) => (props.isSelected ? "2px solid black" : null)};
  border-radius: 5px;
  border-radius: 0.3125rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

const SelectCard = ({ item, selectedCard, setSelectedCard }) => {
  const onClickBg = () => {
    setSelectedCard(item);
  };
  return <SelectCardBox onClick={onClickBg} isSelected={item === selectedCard} item={item}></SelectCardBox>;
};
export default SelectCard;
