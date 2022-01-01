import React from 'react';
import styled from 'styled-components';
import StudentInItem from './StudentInItem';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 40px;
  column-gap: 2.5rem;
  row-gap: 40px;
  row-gap: 2.5rem;
`

const StudentInList = ({ students }) => {

  return (<Container>
    {students?.length !== 0 && students?.map((item, index) => {
      return <StudentInItem key={index} item={item} />
    })}
  </Container>);
}

export default StudentInList;