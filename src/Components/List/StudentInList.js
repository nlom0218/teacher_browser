import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import StudentInItem from './StudentInItem';
import { RiCheckboxBlankLine, RiCheckboxLine } from 'react-icons/ri';

const SortAndNumContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`

const SortBtnLayout = styled.div`
  justify-self: flex-start;
  display: grid;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: auto auto auto 1fr;
  `}
`

const SortBtn = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
`

const StudentNum = styled.div`
`

const Container = styled.div`
  display: grid;
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(4, 1fr);
  `}
`

const StudentInList = ({ students, listId, setSort, sort }) => {

  const onClickSortBtn = (type) => {
    if (type === "none") {
      setSort(undefined)
    } else {
      setSort(type)
    }
  }

  return (<React.Fragment>
    {students.length !== 0 && <SortAndNumContainer>
      <SortBtnLayout>
        <SortBtn onClick={() => onClickSortBtn("num")}>
          {sort === "num" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>번호 순</div>
        </SortBtn>
        <SortBtn onClick={() => onClickSortBtn("name")}>
          {sort === "name" ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>이름 순</div>
        </SortBtn>
        <SortBtn onClick={() => onClickSortBtn("none")}>
          {!sort ? <RiCheckboxLine /> : <RiCheckboxBlankLine />}
          <div>생성일 순</div>
        </SortBtn>
      </SortBtnLayout>
      <StudentNum>{students.length}명</StudentNum>
    </SortAndNumContainer>}
    <Container>
      {students?.length !== 0 && students?.map((item, index) => {
        return <StudentInItem key={index} item={item} listId={listId} />
      })}
    </Container>
  </React.Fragment>);
}

export default StudentInList;