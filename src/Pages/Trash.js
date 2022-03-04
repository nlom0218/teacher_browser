import { useQuery, useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { inPopup, isPopupVar } from '../apollo';
import AlertMessage from '../Components/Shared/AlertMessage';
import BasicContainer from '../Components/Shared/BasicContainer';
import Loading from '../Components/Shared/Loading';
import DeleteAllStudent from '../Components/Trash/Popup/DeleteAllStudent';
import RestoreAllStudent from '../Components/Trash/Popup/RestoreAllStudent';
import StudentInTrash from '../Components/Trash/StudentInTrash';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY } from '../Graphql/Student/query';
import useMe from '../Hooks/useMe';
import { customMedia } from '../styles';

const Container = styled.div`
  padding: 20px;
  padding: 1.25rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
  ${customMedia.greaterThan("tablet")`
    padding: 40px;
    padding: 2.5rem;
  `}
`

const TopLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  column-gap: 1.25rem;
  row-gap: 20px;
  row-gap: 1.25rem;
  .trashBtn {
    text-align: center;
    color: ${props => props.theme.bgColor};
    padding: 10px 20px;
    padding: 0.625rem 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    cursor: pointer;
  }
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr auto auto;
    align-items: flex-end;
  `}
`

const AllRestore = styled.div`
  background-color: ${props => props.theme.btnBgColor};
`

const AllDelete = styled.div`
  background-color: ${props => props.theme.redColor};
`

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
  grid-column: 1 / -1;
  justify-self: flex-end;
  ${customMedia.greaterThan("tablet")`
    justify-self: flex-start;
    grid-column: 1 / 2;
  `}
`

const Student = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: repeat(4, 1fr);
  `}
  ${customMedia.greaterThan("desktop")`
    grid-template-columns: repeat(6, 1fr);
  `}
`


const Trash = () => {
  const me = useMe()
  const isPopup = useReactiveVar(isPopupVar)

  const selectedTag = JSON.parse(localStorage.getItem("selectedTag")) ? JSON.parse(localStorage.getItem("selectedTag")) : []
  const selectedSort = localStorage.getItem("selectedSort") ? localStorage.getItem("selectedSort") : undefined

  const [successMsg, setSuccessMsg] = useState(undefined)
  const { data, loading } = useQuery(SEE_ALL_STUDENT_IN_TRASH_QUERY, {
    variables: {
      trash: true
    }
  })

  const onClickAllDelete = () => {
    inPopup("deleteAllStudent")
  }
  const onClickAllRestore = () => {
    inPopup("restoreAllStudent")
  }

  if (loading) {
    return <Loading page="mainPage" />
  }

  return (<BasicContainer menuItem={true}>
    <Container>
      <TopLayout>
        <Title>휴지통</Title>
        {data?.seeAllStudent?.length !== 0 && <React.Fragment>
          <AllRestore onClick={onClickAllRestore} className="trashBtn">전체 복구</AllRestore>
          <AllDelete onClick={onClickAllDelete} className="trashBtn">전체 삭제</AllDelete>
        </React.Fragment>}
      </TopLayout>
      {data?.seeAllStudent?.length !== 0 ?
        <Student>
          {data?.seeAllStudent?.map((item, index) => {
            return <StudentInTrash
              key={index}
              item={item}
              setSuccessMsg={setSuccessMsg}
              selectedTag={selectedTag}
              selectedSort={selectedSort}
            />
          })}
        </Student>
        : <div>휴지통으로 이동된 학생이 없습니다.</div>
      }
    </Container>
    <AlertMessage msg={successMsg} setMsg={setSuccessMsg} time={5000} type="success" />
    {isPopup === "deleteAllStudent" &&
      <DeleteAllStudent
        teacherEmail={me?.email}
        setSuccessMsg={setSuccessMsg}
      />}
    {isPopup === "restoreAllStudent" &&
      <RestoreAllStudent
        teacherEmail={me?.email}
        selectedTag={selectedTag}
        selectedSort={selectedSort}
        setSuccessMsg={setSuccessMsg}
      />}
  </BasicContainer>);
}

export default Trash;