import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { FcSettings } from 'react-icons/fc';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../../apollo';

const Container = styled.div`
  position: absolute;
  top: 10px;
  top: 0.625rem;
  right: 10px;
  right: 0.625rem;
  svg {
    font-size: 1.5em;
    font-size: 1.5rem;
    display: flex;
    cursor: pointer;
  }
`

const SortTagBtn = ({ meTag }) => {
  const isPopup = useReactiveVar(isPopupVar)

  const onClickStudentSetting = () => inPopup("studentSetting")

  return (<Container>
    <FcSettings onClick={onClickStudentSetting} />
  </Container>);
}

export default SortTagBtn;