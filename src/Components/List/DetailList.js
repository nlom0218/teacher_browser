import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* height: 100%; */
  max-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  overflow: scroll;
  -ms-overflow-style: none; // IE and Edge
  scrollbar-width: none; // Firefox
  ::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
  padding: 40px;
  padding: 2.5rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  column-gap: 40px;
  column-gap: 2.5rem;
`

const DetailList = () => {
  return (<Container>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
    <div>디테일</div>
  </Container>);
}

export default DetailList;