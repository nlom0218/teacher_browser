import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import styled from "styled-components";

const STagItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-top: 0.625rem;
  margin-right: 10px;
  margin-right: 0.625rem;
  padding: 5px 10px;
  padding: 0.3215rem 0.625rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
  background-color: ${(props) => props.theme.purple};
  transition: background-color 1s ease;
  svg {
    display: flex;
    cursor: pointer;
    margin-left: 5px;
    margin-left: 0.3125rem;
    font-size: 1.25em;
    font-size: 1.25rem;
  }
`;

const TagItem = ({ item, onClickDelTag }) => {
  return (
    <STagItem>
      <div>{item}</div>
      <IoIosRemoveCircleOutline onClick={() => onClickDelTag(item)} />
    </STagItem>
  );
};

export default TagItem;
