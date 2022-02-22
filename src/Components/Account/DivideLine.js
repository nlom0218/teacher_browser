import React from 'react';
import styled from 'styled-components';

const SDivideLine = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  column-gap: 10px;
  column-gap: 0.625rem;
  align-items: center;
  font-size: 14px;
  font-size: 0.875rem;
  font-weight: 500;
  height: 1px;
  height: 0.0625rem;
  background: ${props => props.theme.fontColor};
  transition: background 1s ease;
  margin: 20px 0px;
  margin: 1.25rem 0rem;
`

const DivideLine = () => {
  return (<SDivideLine></SDivideLine>);
}

export default DivideLine;