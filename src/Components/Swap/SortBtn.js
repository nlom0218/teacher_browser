import React from 'react';
import styled from 'styled-components';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  column-gap: 0.625rem;
  position: relative;
  color: ${props => props.theme.bgColor};
`

const Layout = styled.div`
  display: grid;
  cursor: pointer;
  background-color: ${props => props.theme.btnBgColor};
  text-align: center;
  padding: 10px 0px;
  padding: 0.625rem 0rem;
  border-radius: 5px;
  border-radius: 0.3125rem;
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
      <div>이름 순</div>
    </Layout>
    <Layout onClick={() => onClickSortBtn("studentNumber")}>
      <div>번호 순</div>
    </Layout>
  </Container>);
}

export default SortBtn;