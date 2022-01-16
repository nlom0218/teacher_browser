import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import { SuccessMsg } from '../Components/Shared/styled/SuccessMsg';
import StudentInTrash from '../Components/Trash/StudentInTrash';
import { SEE_ALL_STUDENT_IN_TRASH_QUERY } from '../Graphql/Student/query';
import { customMedia } from '../styles';

const Container = styled.div`
  padding: 60px;
  padding: 3.75rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
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
  ${customMedia.greaterThan("tablet")`
    grid-column: 1 / 2;
  `}
`

const Student = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  row-gap: 20px;
  row-gap: 1.25rem;
  column-gap: 20px;
  column-gap: 1.25rem;
`


const Trash = () => {
  const [successMsg, setSuccessMsg] = useState(undefined)
  const { data, loading } = useQuery(SEE_ALL_STUDENT_IN_TRASH_QUERY, {
    variables: {
      trash: true
    }
  })
  useEffect(() => {
    if (successMsg) {
      let timer = setTimeout(() => {
        setSuccessMsg(undefined)
      }, 5000)

      // setTimeout 타이머를 사용한 경우 타이머를 해재해야 한다.
      // 컴포넌트가 사라질 때 타이머를 없애는 코드 추가 필요
      return () => { clearTimeout(timer) }
    }
  }, [successMsg])
  return (<BasicContainer menuItem={true}>
    <Container>
      <TopLayout>
        <Title>휴지통</Title>
        <AllRestore className="trashBtn">전체 복구</AllRestore>
        <AllDelete className="trashBtn">전체 삭제</AllDelete>
      </TopLayout>
      <Student>
        {data?.seeAllStudent?.map((item, index) => {
          return <StudentInTrash key={index} item={item} setSuccessMsg={setSuccessMsg} />
        })}
      </Student>
    </Container>
    {successMsg && <SuccessMsg>{successMsg.msg}</SuccessMsg>}
  </BasicContainer>);
}

export default Trash;