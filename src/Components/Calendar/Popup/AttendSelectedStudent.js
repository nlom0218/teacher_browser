import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { SEE_ALL_STUDENT_QUERY } from '../../../Graphql/Student/query';
import Loading from '../../Shared/Loading';
import PopupContainer from '../../Shared/PopupContainer';
import AttendSelectedStudentItem from './AttendSelectedStudentItem';
import { CalenderPopupTitle } from './PopupLayout';

const Container = styled.form`
  padding : 20px 0px;
  padding : 1.25rem 0rem;
  display: grid;
  row-gap: 20px;
  row-gap: 1.25rem;
  grid-template-rows: auto 1fr;
  min-height: 100%;
`

const StudentList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-self: flex-start;
  column-gap: 1px;
  column-gap: 0.0625rem;
  row-gap: 1px;
  row-gap: 0.0625rem;
  background-color: ${props => props.theme.hoverColor};
  border: 1px solid ${props => props.theme.hoverColor};
`

const AttendSelectedStudent = () => {

  const { data, loading } = useQuery(SEE_ALL_STUDENT_QUERY, {
    variables: { sort: "name" }
  })

  if (loading) {
    return <Loading page="popupPage" />
  }

  return (<PopupContainer maxHeight={true}>
    <Container>
      <CalenderPopupTitle>학생선택</CalenderPopupTitle>
      <StudentList>
        {data?.seeAllStudent.map((item, index) => {
          return <AttendSelectedStudentItem key={index} item={item} />
        })}
        {data?.seeAllStudent.length % 2 === 1 && <AttendSelectedStudentItem />}
      </StudentList>
    </Container>
  </PopupContainer>);
}

export default AttendSelectedStudent;