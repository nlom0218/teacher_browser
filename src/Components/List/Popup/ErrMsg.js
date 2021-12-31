import React from 'react';
import styled from 'styled-components';

const SErrMsg = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  color: ${props => props.theme.redColor};
`

const ErrMsg = ({ errMsg }) => {
  return (<SErrMsg>{errMsg}</SErrMsg>);
}

export default ErrMsg;