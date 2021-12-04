import React from 'react';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router';
import routes from '../../routes';
import { color } from '../../styles';

const SBackMenuBtn = styled.div`
  position: absolute;
  right: 20px;
  right: 1.25rem;
  top: 20px;
  top: 1.25rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${color.red};
`

const PreviousPageBtn = () => {
  const navigate = useNavigate()
  const onClickBackBtn = () => {
    navigate(-1)
  }
  return (
    <SBackMenuBtn onClick={onClickBackBtn}><FaTimes /></SBackMenuBtn>
  );
}

export default PreviousPageBtn;