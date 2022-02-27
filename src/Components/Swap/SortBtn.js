import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const Container = styled.div`
  align-self: flex-end;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`

const SortBtn = ({ setSort, sort }) => {

  const onClickSortBtn = (type) => {
    if (type === sort) {
      setSort(undefined)
      return
    }
    setSort(type)
  }

  return (<Container>
    <Layout onClick={() => onClickSortBtn("studentName")}>
      {sort === "studentName" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      <div>이름 순</div>
    </Layout>
    <Layout onClick={() => onClickSortBtn("studentNumber")}>
      {sort === "studentNumber" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
      <div>번호 순</div>
    </Layout>
  </Container>);
}

export default SortBtn;