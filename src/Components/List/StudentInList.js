import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../styles';
import StudentInItem from './StudentInItem';

const StudentNum = styled.div`
  justify-self: flex-end;
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

const StudentInList = ({ students }) => {

  return (<React.Fragment>
    <StudentNum>{students.length}명</StudentNum>
    <Container>
      {students?.length !== 0 && students?.map((item, index) => {
        return <StudentInItem key={index} item={item} />
      })}
    </Container>
  </React.Fragment>);
}

export default StudentInList;