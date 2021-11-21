import React from 'react';
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router';
import routes from '../../routes';

const SBackMenuBtn = styled.div`
  position: absolute;
  right: 20px;
  right: 1.25rem;
  top: 20px;
  top: 1.25rem;
  font-size: 1.25em;
  font-size: 1.25rem;
  cursor: pointer;
  color: tomato;
`

const BackMenuBtn = () => {
  const navigate = useNavigate()
  const onClickBackBtn = () => {
    navigate(routes.menu)
  }
  return (
    <SBackMenuBtn onClick={onClickBackBtn}><FaTimes /></SBackMenuBtn>
  );
}

export default BackMenuBtn;