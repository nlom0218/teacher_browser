import React from 'react';
import styled from 'styled-components';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const SFolderItem = styled.div`
  font-size: 1.2em;
  font-size: 1.2rem;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
`


const BoxIcon = styled.div`
  cursor: pointer;
  svg {
    display: flex;
    font-size: 1em;
    font-size: 1rem;
  }
`

const TypeItem = ({ item, setSubmitType, submitType }) => {
  const onClickIcon = () => {
    if (submitType === item) {
      setSubmitType(undefined)
    } else {
      setSubmitType(item)
    }
  }
  return (<SFolderItem>
    <BoxIcon onClick={onClickIcon}>{submitType === item ? <GrCheckboxSelected /> : <GrCheckbox />}</BoxIcon>
    <div>{item}</div>
  </SFolderItem>);
}

export default TypeItem;