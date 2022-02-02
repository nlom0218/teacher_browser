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

// mainPage => 명렬표, 학급일지, 순서정하기 등 가장 메인이 되는 페이지인지 아닌지 확인
const Loading = ({ mainPage }) => {
  return (mainPage ?
    <BasicContainer>
      <Container>
        <RandomCircle />
      </Container>
    </BasicContainer>
    :
    <Container>
      <RandomCircle />
    </Container>
  );
}

export default Loading;