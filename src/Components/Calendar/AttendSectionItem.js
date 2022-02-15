import { useQuery } from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import { inPopup } from '../../apollo';
import { SEE_ONE_STUDENT_QUERY } from '../../Graphql/Student/query';
import { processStudentIcon } from '../../shared';
import { color } from '../../styles';

const Container = styled.div`
  display: grid;
  row-gap: 10px;
  row-gap: 0.625rem;
`

const StudentInfo = styled.div`
  justify-self: flex-start;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  column-gap: 5px;
  column-gap: 0.3125rem;
  cursor: pointer;
`

const StudnetIcon = styled.div`
  svg {
    display: flex;
  }
`

const StudentName = styled.div`
`

const StudentNumber = styled.div`
  opacity: 0.6;
`

const StudentAttend = styled.div`
    background-color: rgba(104, 255, 122, 0.2);
    box-shadow: ${color.boxShadow};
    padding: 20px;
    padding: 1.25rem;
    border-radius: 5px;
    border-radius: 0.3125rem;
    border: ${props => props.isEdit && `${props.theme.fontColor} 1px solid`};
    cursor: pointer;
`

const AttendSectionItem = ({ item }) => {
  const { data, loading } = useQuery(SEE_ONE_STUDENT_QUERY, {
    variables: {
      studentId: item.studentId
    },
    skip: !item
  })

  const onClickStudentAttend = () => {
    inPopup("eidtAttend")
    localStorage.setItem("summaryAttendId", item._id)
    localStorage.setItem("summaryAttendName", data?.seeAllStudent[0]?.studentName)
  }

  const onClickStudentInfo = () => {
    inPopup("moveToStudentPage")
    localStorage.setItem("summaryStudentId", item.ownerId)
  }

  return (<Container>
    <StudentInfo onClick={onClickStudentInfo}>
      {data?.seeAllStudent[0]?.icon && <StudnetIcon>{processStudentIcon(data?.seeAllStudent[0]?.icon)}</StudnetIcon>}
      <StudentName>{data?.seeAllStudent[0]?.studentName}</StudentName>
      {data?.seeAllStudent[0]?.studentNumber && <StudentNumber>{data?.seeAllStudent[0]?.studentNumber}번</StudentNumber>}
    </StudentInfo>
    <StudentAttend onClick={onClickStudentAttend}>
      {item.type}
    </StudentAttend>
  </Container>);
}

export default AttendSectionItem;