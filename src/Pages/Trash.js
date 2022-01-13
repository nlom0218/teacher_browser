import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BasicContainer from '../Components/Shared/BasicContainer';
import { SuccessMsg } from '../Components/Shared/styled/SuccessMsg';
import StudentInTrash from '../Components/Trash/StudentInTrash';
import { SEE_ALL_STUDENT_QUERY } from '../Graphql/Student/query';

const Container = styled.div`
  padding: 60px;
  padding: 3.75rem;
  display: grid;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const Title = styled.div`
  font-size: 1.5em;
  font-size: 1.5rem;
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
  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
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
      <Title>휴지통</Title>
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