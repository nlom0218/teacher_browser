import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 20px;
  column-gap: 1.25rem;
  position: relative;
  color: ${props => props.theme.bgColor};
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`

const SortBtn = ({ setSort, sort, onClickShuffleBtn, hasNum, setErrMsg }) => {

  const onClickSortBtn = (type) => {
    if (!hasNum && type === "studentNumber") {
      setErrMsg("모든 학생의 번호가 설정되지 않았습니다. 😅")
      return
    }
    setSort(type)
    onClickShuffleBtn("finish")
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