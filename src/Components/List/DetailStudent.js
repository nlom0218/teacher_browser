import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-height: 100%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
  background-color: red;
`

const DetailStudent = () => {
  return (<Container>
    학생 정보 및 수정
  </Container>);
}

export default DetailStudent;