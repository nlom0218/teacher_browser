import React from 'react';
import styled from 'styled-components';
import BasicContainer from './BasicContainer';
import RandomCircle from './RandomCircle';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 50%);
`

const Loading = () => {
  return (<BasicContainer>
    <Container>
      <RandomCircle />
    </Container>
  </BasicContainer>);
}

export default Loading;